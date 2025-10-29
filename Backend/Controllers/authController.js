import User from "../Models/userModel.js"
import bcrypt from 'bcrypt'

const generateUserTokens = async (user_id)=>{

    const user = await User.findById(user_id)
    const refreshToken = await user.generateRefreshToken();
    const accessToken = await user.generateAccessToken();
    user.refreshToken = refreshToken

    await user.save()

    return {refreshToken,accessToken};

}

export const signupController = async (req, res) => {
  try {
    const { name, email, password, isAdmin} = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "User Details Missing" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ msg: "User Already Exists" });
    }

    const newUser = await User.create({
      name: name,
      email: email,
      isAdmin: isAdmin || false,
      password: password,
    });

    res.status(200).json({
      msg: "Signup Successful",
      newUser,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const loginController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!((name || email) && password)) {
      res.status(400).json({
        msg: "User details missing",
      });
    }

    const existingUser = await User.findOne({
      $or: [
        { name }, 
        { email }
      ],
    });

    if (!existingUser) {
      return res
        .status(400).json({ 
          error: "User does not exist. Please Signup" 
        });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      res.status(400).json({
        msg: "Either Username or password not correct",
      });
    }

    const { accessToken, refreshToken } = await generateUserTokens(
      existingUser._id
    );
    const options = {
      httpOnly: true,
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        existingUser : {
          _id: existingUser._id,
          name: existingUser.name,
          email:existingUser.email,
          isAdmin:existingUser.isAdmin
        },
        message: `successfully logged in ${existingUser.name}`,
        accessToken,
        refreshToken,
      });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

export const logoutController = async (req, res) => {
  try {
    // Get token from cookies or request body
    const token = req.cookies?.refreshToken || req.body?.token;

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    };

    if (!token) {
      res.clearCookie("refreshToken", cookieOptions);
      return res.status(200).json({ message: "User logged out successfully" });
    }
    const user = await User.findOne({ refreshToken: token });

    if (!user) {
      res.clearCookie("refreshToken", cookieOptions);
      return res.status(200).json({ message: "User logged out successfully" });
    }

    user.refreshToken = null;
    await user.save();

    res.clearCookie("refreshToken", cookieOptions);

    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};