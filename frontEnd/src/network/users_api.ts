
import { User } from './../models/user';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';


const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
console.log('Backend URL:', backendURL)
axios.defaults.baseURL = backendURL;
axios.defaults.withCredentials = true;




export async function getLoggedInUser(): Promise<User> {
    try {
        const response = await axios.get<User>("/api/users", {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Axios error:", error);
        throw new Error("Failed to fetch logged in user: " + error);
    }
}


export interface SignupCredentials {
    username: string,
    email: string,
    password: string
}

export async function signUp(credentials: SignupCredentials): Promise<User> {
    try {
        const response = await axios.post<User>("/api/users/signup", credentials, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Axios error:", error);
        throw new Error("Failed to sign up user: " + error);
    }
}

export interface LoginCredentials {
    username: string,
    password: string
}

export async function login(credentials: LoginCredentials): Promise<User> {
    try {
        const response = await axios.post<User>("/api/users/login", credentials, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Axios error:", error);
        throw new Error("Failed to login user: " + error);
    }
}

export async function logout() {
    try {
        await axios.post("/api/users/logout", {}, {
            withCredentials: true
        });
    } catch (error) {
        console.error("Axios error:", error);
        throw new Error("Failed to logout user: " + error);
    }
}