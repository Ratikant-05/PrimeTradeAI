import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const response = await axios.post(
          "https://primetradeai-20gz.onrender.com/auth/logout",
          {},
          { withCredentials: true } 
        );

        console.log(response.data);

        localStorage.removeItem("token");

        navigate("/");
      } catch (error) {
        console.error("Logout failed:", error.response?.data || error.message);
      }
    };

    logoutUser();
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
