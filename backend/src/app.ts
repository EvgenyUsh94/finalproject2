import "dotenv/config";
import env from "./util/validateEnv";
import express, { Request, Response, NextFunction } from 'express';
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import MongoStore from "connect-mongo";
import notesRoutes from "./routes/notes";
import userRoutes from "./routes/users";
import { requiresAuth } from "./middleware/auth";
import cors from 'cors';

if (!env.SESSION_SECRET || !env.MONGO_CONNECTION_STRING) {
    console.error("Critical environment variables are missing.");
    process.exit(1);
}

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3030',
    credentials: true,
}));


app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STRING
    }),
}));




app.use("/api/users", userRoutes);
app.use("/api/notes", requiresAuth, notesRoutes);


app.use((req: Request, res: Response, next: NextFunction) => {
    next(createHttpError(404, "Page not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    const statusCode = isHttpError(error) ? error.status : 500;
    const errorMessage = isHttpError(error) ? error.message : "An unknown error occurred";
    res.status(statusCode).json({ error: errorMessage });
});

export default app;