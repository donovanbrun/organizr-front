import React from "react";
import './NoteEditor.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getNotes, saveNote, createNote, deleteNote } from "../../services/NoteService";

class NoteEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            note: null,
            editMode : false
        };
    }

    getNotes = () => {
        getNotes().then(notes => {
            this.setState({
                notes: notes.data
            }, this.forceUpdate);
        });
    }

    componentDidMount() {
        this.getNotes();
    }

    handleChange = (event) => {
        this.setState({
            note: {
                ...this.state.note,
                content: event.target.value
            }
        })
    }

    handleNameChange = (event) => {
        this.setState({
            note: {
                ...this.state.note,
                name: event.target.value
            }
        })
    }

    newNote = () => {
        this.setState({
            note: {
                id: null,
                name: "",
                content: "",
                username: "Donovan"
            }
        })
    }

    saveNote = () => {
        if (this.state.name !== "") {
            if (this.state.note.id !== null) {
                saveNote(this.state.note).then(this.getNotes);
            }
            else {
                createNote(this.state.note).then(this.getNotes);
            }
        }
        this.getNotes();
    }

    deleteNote = () => {
        if (this.state.note.id !== null) {
            deleteNote(this.state.note.id).then(this.getNotes);
        }
        this.newNote();
    }

    changeMode = () => {
        this.setState({
            editMode: !this.state.editMode
        })
    }

    changeNote = (note) => {
        this.setState({
            note: note
        })
    }

    render() {

        const name = this.state.note?.name;
        const content = this.state.note?.content;

        const listNotes = this.state.notes.map(note => {
            return (<a className="NoteInList" onClick={() => this.changeNote(note)}>{note.name}</a>)
        })

        return (
            <div className="NoteEditor">
                <h1 className="title">Notebook</h1>

                <div className="EditArea">
                    
                    <div className="EditorHeader">
                        <div className="ButtonsNote">
                            <button onClick={this.newNote} className="Button">New note</button>
                            <button onClick={this.saveNote} className="Button">Save note</button>
                            <button onClick={this.deleteNote} className="Button">Delete note</button>
                        </div>
                        <div className="ButtonsNote">
                            <button onClick={this.changeMode} className="Button">Preview/Edit mode</button>
                        </div>

                        <div className="ListNotes">
                            {listNotes}
                        </div>

                        <input placeholder="Name" value={name} onChange={this.handleNameChange} className="inputName"/>
                    </div>

                    {
                        this.state.editMode ?
                        <div id="editor">
                            <textarea placeholder="Write here..." value={content} onChange={this.handleChange} className="textArea"></textarea>
                        </div>
                        :
                        <div id="preview">
                            <ReactMarkdown children={content} remarkPlugins={[remarkGfm]}></ReactMarkdown>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default NoteEditor;