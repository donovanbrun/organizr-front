import React, { useState, useEffect } from "react";
import './NoteEditor.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getNotes, saveNote, deleteNote } from "../../services/NoteService";
import { v4 as uuidv4 } from 'uuid';
import { getUserId } from '../../services/LoginService';

export default function NoteEditor() {

    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState({
        id: uuidv4(),
        name: "",
        content: "",
        userId: getUserId()
    });
    const [editMode, setEditMode] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchData()
    }, [])

    let fetchData = () => {
        getNotes().then(notes => {
            let sortedNotes = notes.data.sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name <= b.name) {
                    return -1;
                }
                return 0;
            });
            setNotes(sortedNotes);
        });
    }

    let handleChange = (event) => {
        setNote({
            ...note,
            content: event.target.value
        })

        var textarea = document.querySelector(".TextArea");
        textarea.addEventListener('input', autoResize, false);
      
        function autoResize() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        }
    }

    let handleNameChange = (event) => {
        setNote({
            ...note,
            name: event.target.value
        })
    }

    let newNote = () => {
        setNote({
            id: uuidv4(),
            name: "",
            content: "",
            userId: getUserId()
        })
    }

    let handleSaveNote = () => {
        if (note.name.trim().length > 0) {
            saveNote(note).then(fetchData);
        }
    }

    let handleDeleteNote = () => {
        deleteNote(note.id).then(fetchData);
        newNote();
    }

    const listNotes = notes.map(n => {
        if (search === "" || n.name.toLowerCase().includes(search.toString().trim().toLowerCase())) {
            if (n?.id === note?.id) {
                return (<p className="NoteInListSelected" onClick={() => setNote(n)}>{n.name}</p>)
            } 
            return (<p className="NoteInList" onClick={() => setNote(n)}>{n.name}</p>)
        }
        return null;
    })

    return (
        <div className="NoteEditor">
            <h1 className="title">Notebook</h1>

            <div className="NoteArea">

                <div className="ListNotes">
                    <h1 className="subtitle">Notes</h1>
                    <input placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} className="Input"/>
                    {listNotes}
                </div>

                <div className="EditorArea">
                    <div className="EditorHeader">
                        <button onClick={newNote} className="Button">New note</button>
                        <input placeholder="Name" value={note?.name} onChange={handleNameChange} className="Input"/>
                        <button onClick={handleSaveNote} className="Button">Save note</button>
                        <button onClick={handleDeleteNote} className="Button">Delete note</button>
                        <button onClick={() => setEditMode(!editMode)} className="Button">{editMode ? "Preview mode" : "Edit mode" }</button>
                    </div>
                
                    {
                        editMode ?
                        <div id="Editor">
                            <textarea placeholder="Write here..." value={note?.content} onChange={handleChange} className="TextArea"></textarea>
                        </div>
                        :
                        <div id="Preview">
                            <ReactMarkdown children={note?.content} remarkPlugins={[remarkGfm]}></ReactMarkdown>
                        </div>
                    }
                    </div>
            </div>
        </div>
    )
}