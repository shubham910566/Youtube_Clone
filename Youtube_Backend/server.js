import express from "express";
import connectDB  from "./db/conn.js"; 
import cookieParser from 'cookie-parser';
import userRoutes from './routes/users.js';
import useVideoRoutes from './routes/video.js'
import useCommentRoutes from './routes/comments.js'
import channelRoute from './routes/channelRoute.js'
import cors from "cors"

const app = express();
const port = 8000;
connectDB();

app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))
app.use(express.json());
app.use(cookieParser());

app.use('/auth', userRoutes);
app.use('/api', useVideoRoutes)
app.use('/apiComments', useCommentRoutes)
app.use('/channel', channelRoute)

app.listen(port, () => {
    console.log(`App is running on ${port}`);
});