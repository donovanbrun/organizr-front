import React, { useState, useEffect } from "react";
import Nav from '../components/nav/Nav';
import styles from '../styles/NoteEditor.module.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
// import { getNotes, saveNote, deleteNote } from "../services/NoteService";
import { getNotes, saveNote, deleteNote } from "../services/offline/NoteOfflineService";
import { v4 as uuidv4 } from 'uuid';
import { getUserId } from '../services/LoginService';
import { AxiosResponse } from "axios";

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
        getNotes().then((notes: AxiosResponse) => {
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
            console.log(note)
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
                return (<p className={styles.NoteInListSelected} onClick={() => setNote(n)}>{n.name}</p>)
            }
            return (<p className={styles.NoteInList} onClick={() => setNote(n)}>{n.name}</p>)
        }
        return null;
    })

    return (
        <div className="App">
            <Nav></Nav>
            <div className={styles.NoteEditor}>
                <h1 className="title">Notebook</h1>

                <div className={styles.NoteArea}>

                    <div className={styles.ListNotes}>
                        <h1 className="subtitle">Notes</h1>
                        <input placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} className="Input" />
                        {listNotes}
                    </div>

                    <div className={styles.EditorArea}>
                        <div className={styles.EditorHeader}>
                            <button onClick={newNote} className="Button">New note</button>
                            <input placeholder="Name" value={note?.name} onChange={handleNameChange} className="Input" />
                            <button onClick={handleSaveNote} className="Button">Save note</button>
                            <button onClick={handleDeleteNote} className="Button">Delete note</button>
                            <button onClick={() => setEditMode(!editMode)} className="Button">{editMode ? "Preview mode" : "Edit mode"}</button>
                        </div>

                        {
                            editMode ?
                                <div id={styles.Editor}>
                                    <textarea placeholder="Write here..." rows={note?.content?.split(/\r\n|\r|\n/)?.length} value={note?.content} onChange={handleChange} className={styles.TextArea} spellCheck="false" />
                                </div>
                                :
                                <div id={styles.Preview}>
                                    <ReactMarkdown children={note?.content} remarkPlugins={[remarkGfm]}></ReactMarkdown>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}