import axios from "axios";
import Toast from "../src/Toast";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const getStatus = () => {
    return axios.get(apiURL+"/api/note/status");
}

export const getNotes = () => {
    return axios.get(apiURL+"/api/note").catch(() => {
        Toast.error("Error while fetching notes")
    })
}

export const getNoteById = (id) => {
    return axios.get(apiURL+"/api/note/" + id);
}

export const createNote = (note) => {
    return axios.post(apiURL+"/api/note", note).then((response) => {
        if (response.status >= 200 && response.status < 300) {
            Toast.success("Note created");
        }
    })
    .catch(() => {
        Toast.error("Error while creating note")
    })
}

export const saveNote = (note) => {
    return axios.put(apiURL+"/api/note", note).then((response) => {
        if (response.status >= 200 && response.status < 300) {
            Toast.success("Note saved");
        }
    })
    .catch(() => {
        Toast.error("Error while saving note")
    })
}

export const deleteNote = (noteId) => {
    return axios.delete(apiURL+"/api/note/"+noteId).then((response) => {
        if (response.status >= 200 && response.status < 300) {
            Toast.success("Note deleted");
        }
    })
    .catch(() => {
        Toast.error("Error while deleting note")
    })
}