import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL;

export const getStatus = () => {
    return axios.get(apiURL+"/api/note/status");
}

export const getNotes = () => {
    return axios.get(apiURL+"/api/note/user/Donovan");
}

export const getNoteById = (id) => {
    return axios.get(apiURL+"/api/note/" + id);
}

export const createNote = (note) => {
    return axios.post(apiURL+"/api/note", note);
}

export const saveNote = (note) => {
    console.log(note)
    return axios.put(apiURL+"/api/note", note);
}

export const deleteNote = (noteId) => {
    return axios.delete(apiURL+"/api/note/"+noteId);
}