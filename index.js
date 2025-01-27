import express from 'express';
import "dotenv/config"
import connectDB from './utils/db.js';
import cors from 'cors'
import userRouter from './routes/user.routes.js';

const app= express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const corsOptions = {
    origin: 'https://social-media-task-3w.netlify.app',
    credentials: true,
}
app.use(cors(corsOptions))

app.use('/api/users',userRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    connectDB()
    console.log('server is running on port:', PORT)
})
