import { Note } from "../models/note";
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:5000';


export async function fetchNotes(): Promise<Note[]> {
    try {
        const response = await axios.get<Note[]>('/notes', {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch notes: ' + error);
    }
}

export interface NoteInput {
    title: string,
    text?: string,
}

export async function createNote(note: NoteInput): Promise<Note> {
    try {
        const response = await axios.post<Note>('/api/notes', note, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {

            console.error("Axios error status:", error.response.status);
            throw new Error("Failed to create note: " + (error.response.data?.message || error.message));
        } else {

            console.error("Error:", error);
            throw new Error("Failed to create note: " + error);
        }
    }
}

export async function updateNote(noteId: string, note: NoteInput): Promise<Note> {
    try {
        const response = await axios.patch(`/api/notes/${noteId}`, note, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Error updating note:", error);
        throw new Error("Failed to update note: " + error);
    }
}

export async function deleteNote(noteId: string) {
    try {
        await axios.delete(`/api/notes/${noteId}`, {
            withCredentials: true
        });

        console.log(`Note with ID ${noteId} deleted successfully.`);

    } catch (error) {
        console.error(`Error deleting note with ID ${noteId}:`, error);
        throw error;
    }
}

