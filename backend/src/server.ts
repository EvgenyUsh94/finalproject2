import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";
import express from 'express';
import cors from 'cors';

const port = env.PORT;

const server = express();


app.use(cors({
    origin: process.env.NODE_ENV === "production" ? 'http://localhost:5000' : 'http://localhost:3030',
    credentials: true
}));


server.use(app);


mongoose.connect(env.MONGO_CONNECTION_STRING)
    .then(() => {
        console.log("MongoDB connected");

        server.listen(port, () => {
            console.log("Server is running on port: " + port);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });