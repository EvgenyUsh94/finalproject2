import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";

export const getAuthUser: RequestHandler = async (req, res, next) => {


    try {


        const user = await UserModel.findById(req.session.userId).select("+email").exec()
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

interface SignUpBody {
    username?: string;
    email?: string;
    password?: string;
}

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const passwordRaw = req.body.password;

    try {
        if (!username || !email || !passwordRaw) {
            throw createHttpError(400, "Parameters missing");
        }

        const existingUsername = await UserModel.findOne({ username: username }).exec();

        if (existingUsername) {
            throw createHttpError(409, "Username taken, please choose another");
        }

        const existingEmail = await UserModel.findOne({ email: email }).exec();

        if (existingEmail) {
            throw createHttpError(409, "Email already taken, please choose another");
        }

        const passwordHashed = await bcrypt.hash(passwordRaw, 10);

        const newUser = await UserModel.create({
            username: username,
            email: email,
            password: passwordHashed
        });

        req.session.userId = newUser._id


        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

interface LoginBody {
    username?: string,
    password?: string
}
export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            throw createHttpError(400, "parameters missing");
        }

        const user = await UserModel.findOne({ username }).select("+password +email").exec();
        if (!user) {
            throw createHttpError(401, "invalid credentials");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw createHttpError(401, "invalid credentials");
        }


        req.session.userId = user._id;


        req.session.save(err => {
            if (err) {

                return next(createHttpError(500, 'Session save error: ' + err.message));
            }


            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...userWithoutPassword } = user.toObject();
            res.status(201).json(userWithoutPassword);
        });

    } catch (error) {

        next(error);
    }
};

export const logout: RequestHandler = (req, res, next) => {
    req.session.destroy(error => {
        if (error) {
            next(error)
        } else {
            res.sendStatus(200)
        }
    })
}