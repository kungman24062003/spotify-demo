import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import songRouter from './src/routes/SongRoute.js';
import connectDB from './src/conf/mongodb.js';
import connectCloudinary from './src/conf/cloudinary.js';
import albumRouter from './src/routes/albumRoute.js';


//app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

//initializing routes
app.use("/api/song",songRouter)
app.use("/api/album",albumRouter)

app.get('/',(req,res)=> res.send("API working"))

app.listen(port,()=>console.log(`Server started on ${port}`))