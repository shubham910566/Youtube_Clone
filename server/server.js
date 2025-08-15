import express from "express";
import connectDB  from "./db/conn.js"; 
import cookieParser from 'cookie-parser';
import videoRoutes from  './routes/video.Route.js'
import channelRoutes from './routes/channel.Route.js'
import cors from "cors"
import commentRouter from "./routes/comments.Route.js";
import userRouter from './routes/users.Route.js'
import { PORT } from "./config.js";




const app = express();
const port = PORT || 8080;
connectDB();

app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))
app.use(express.json());
app.use(cookieParser());


videoRoutes(app)
commentRouter(app);
userRouter(app);
channelRoutes(app)

app.listen(port, () => {
    console.log(`App is running on ${port}`);
});