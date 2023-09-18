import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import connectDB from './db/db.js';
import router from './routes/userRoutes.js';


const app =express();
app.use(express.json());
app.use(cors());

dotenv.config()
connectDB();

app.use('/api', router);

const port =process.env.PORT;

app.listen(port, console.log(`Server is running port ${port}`.yellow.bold.italic.underline));


