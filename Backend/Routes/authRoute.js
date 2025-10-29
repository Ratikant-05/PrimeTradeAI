import express from 'express'
import { loginController, signupController, logoutController, getCurrentUser } from '../Controllers/authController.js'

const router = express.Router()

router.post('/signup', signupController)
router.post('/login', loginController)
router.post('/logout', logoutController)
router.get('/me', getCurrentUser)

export default router