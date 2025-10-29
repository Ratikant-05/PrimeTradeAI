import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import authRoute from './Routes/authRoute.js'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()
const port = process.env.PORT

app.use(cors({
  origin:["http://localhost:5173", "https://primetradeai-20gz.onrender.com"],
  credentials:true
}))
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/auth', authRoute)

app.listen(port,()=>{
  console.log(`Listening to port ${port}`)
  connectDB();
})