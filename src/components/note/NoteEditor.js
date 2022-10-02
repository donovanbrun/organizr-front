import React, { useState, useEffect } from "react";
import './NoteEditor.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getNotes, saveNote, createNote, deleteNote } from "../../services/NoteService";

export default function NoteEditor() {

    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState(null);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        fetchData()
    }, [])

    let fetchData = () => {
        getNotes().then(notes => {
            setNotes(notes.data);
        });
    }

    let handleChange = (event) => {
        setNote({
            ...note,
            content: event.target.value
        })
    }

    let handleNameChange = (event) => {
        setNote({
            ...note,
            name: event.target.value
        })
    }

    let newNote = () => {
        setNote({
            id: null,
            name: "",
            content: "",
            username: "Donovan"
        })
    }

    let handleSaveNote = () => {
        if (note.name !== "") {
            if (note.id !== null) {
                saveNote(note).then(fetchData);
            }
            else {
                createNote(note).then(fetchData);
            }
        }
    }

    let handleDeleteNote = () => {
        if (note.id !== null) {
            deleteNote(note.id).then(fetchData);
        }
        newNote();
    }

    const listNotes = notes.map(note => {
        return (<p className="NoteInList" onClick={() => setNote(note)}>{note.name}</p>)
    })

    return (
        <div className="NoteEditor">
            <h1 className="title">Notebook</h1>

            <div className="EditArea">
                <div className="EditorHeader">
                    <div className="ButtonsNote">
                        <button onClick={newNote} className="Button">New note</button>
                        <button onClick={handleSaveNote} className="Button">Save note</button>
                        <button onClick={handleDeleteNote} className="Button">Delete note</button>
                    </div>
                    <div className="ButtonsNote">
                        <button onClick={() => setEditMode(!editMode)} className="Button">Preview/Edit mode</button>
                    </div>

                    <div className="ListNotes">
                        {listNotes}
                    </div>

                    <input placeholder="Name" value={note?.name} onChange={handleNameChange} className="inputName"/>
                </div>

                {
                    editMode ?
                    <div id="editor">
                        <textarea placeholder="Write here..." value={note?.content} onChange={handleChange} className="textArea"></textarea>
                    </div>
                    :
                    <div id="preview">
                        <ReactMarkdown children={note?.content} remarkPlugins={[remarkGfm]}></ReactMarkdown>
                    </div>
                }
            </div>
        </div>
    )
}