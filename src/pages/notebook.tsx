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
import ReactModal from 'react-modal';
import Note from "../models/note";

export default function NoteEditor() {

    const [notes, setNotes]: [Note[], any] = useState([]);
    const [note, setNote]: [Note, any] = useState(new Note(uuidv4(), getUserId(), "", "", new Date()));
    const [editMode, setEditMode] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchData()
    }, [])

    let fetchData = () => {
        getNotes().then((notes: AxiosResponse) => {
            let sortedNotes: Note[] = notes.data.sort((a: Note, b: Note) => {
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

    let handleOpenModal = () => {
        setShowModal(true);
    }

    let handleCloseModal = () => {
        setShowModal(false);
        fetchData();
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
        setNote(new Note(uuidv4(), getUserId(), "", "", new Date()));
    }

    let handleSaveNote = () => {
        if (note.name.trim().length > 0) {
            saveNote(note).then(fetchData);
        }
    }

    let handleDeleteNote = (n: Note) => {
        if (n) deleteNote(n.id).then(fetchData);
        else deleteNote(note.id).then(fetchData);
        newNote();
    }

    return (
        <div className="App">
            <Nav></Nav>
            <div className={styles.NoteEditor}>
                <h1 className="title">Notebook</h1>

                <div className={styles.NoteArea}>

                    <ReactModal isOpen={showModal} className={styles.Modal}>
                        <NotesListModal notes={notes} setNote={setNote} closeModal={handleCloseModal} deleteNote={handleDeleteNote} />
                    </ReactModal>

                    <div className={styles.EditorArea}>
                        <div className={styles.EditorHeader}>
                            <div className={styles.EditorGroup}>
                                <button className="Button" onClick={handleOpenModal}>Notes</button>
                                <button onClick={newNote} className="Button">New note</button>
                                <input placeholder="Name" value={note?.name} onChange={handleNameChange} className={styles.InputName} />
                            </div>
                            <div className={styles.EditorGroup}>
                                <button onClick={handleSaveNote} className="Button">Save note</button>
                                <button onClick={() => handleDeleteNote(null)} className="Button">Delete note</button>
                                <button onClick={() => setEditMode(!editMode)} className="Button">{editMode ? "Preview mode" : "Edit mode"}</button>
                            </div>
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

function NotesListModal({ notes, setNote, closeModal, deleteNote }) {

    const [search, setSearch] = useState("");

    const listNotes = notes
        .sort((a: Note, b: Note) => {
            if (new Date(a.updateDate) < new Date(b.updateDate)) {
                return 1;
            }
            if (new Date(a.updateDate) > new Date(b.updateDate)) {
                return -1;
            }
            return 0;
        }).map((n: Note) => {
            if (search === "" || n.name.toLowerCase().includes(search.toString().trim().toLowerCase())) {
                return (
                    <div className={styles.NoteInList}>
                        <p className={styles.NoteNameInList} onClick={() => { setNote(n); closeModal() }}>{n.name} - {new Date(n.updateDate).toLocaleString()}</p>
                        <button className="Button" onClick={() => { setNote(n); deleteNote(n) }}>X</button>
                    </div>
                )
            }
            return null;
        })

    return (
        <div className={styles.ListNotesModal}>
            <h1 className="subtitle">Notes</h1>
            <input placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} className="Input" />
            <div className={styles.ListNotes}>
                {listNotes}
            </div>
            <button className='Button' onClick={closeModal}>Close</button>
        </div>
    );
}