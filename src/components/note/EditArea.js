import React from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './EditorArea.css';
import { saveNote, getNoteById, createNote, deleteNote } from "../../services/NoteService";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';

class EditArea extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            note: {
                id: null,
                name: "",
                content: "",
                username: "Donovan"
            }
        };
    }

    getNote = (id) => {
        getNoteById(id).then(note => {
            this.setState({
                note: note.data
            });
        });
        this.forceUpdate();
    }

    componentDidMount() {

        const id = this.props.noteId;
        if (id) {
            this.getNote(id);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.noteId !== prevProps.noteId) {
            this.getNote(this.props.noteId);
        }
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
                saveNote(this.state.note);
            }
            else {
                createNote(this.state.note);
            }
        }
        this.props.updateNotes();
    }

    deleteNote = () => {
        if (this.state.note.id !== null) {
            deleteNote(this.state.note.id);
        }
        this.newNote();
        this.props.updateNotes();
    }

    render() {
        const name = this.state.note?.name;
        const content = this.state.note?.content;

        return (
            <div className="EditArea">
                
                <div className="EditorHeader">
                    <InputText placeholder="Name" value={name} onChange={this.handleNameChange} className="inputName"/>
                </div>
 
                <div id="container">
                    <div id="editor">
                        <textarea placeholder="Write here..." value={content} onChange={this.handleChange} className="textarea"></textarea>
                    </div>
                    <div id="preview">
                        <ReactMarkdown children={content} remarkPlugins={[remarkGfm]}></ReactMarkdown>
                    </div>
                </div>
                
                <div className="ButtonsNote">
                <Button label="New note" onClick={this.newNote} className="buttonNewNote"/>
                    <Button label="Save note" onClick={this.saveNote} className="buttonSaveNote"/>
                    <Button label="Delete note" onClick={this.deleteNote} className="buttonDeleteNote"/>
                </div>
            </div>
        );
    }
}

export default EditArea;