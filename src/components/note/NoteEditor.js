import React from "react";
import './NoteEditor.css';
import EditArea from "./EditArea";
import ListArea from "./ListArea";
import { getNotes } from "../../services/NoteService";

class NoteEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            selectedNoteId: 1 // tmp, replace with null after testing
        };
    }

    getNotes = () => {
        getNotes().then(notes => {
            this.setState({
                notes: notes.data
            });
        });
    }

    componentDidMount() {
        this.getNotes();
    }

    updateNotes = () => {
        this.getNotes();
        this.forceUpdate();
    }

    handleNoteChange = (id) => {
        this.setState({
            selectedNoteId: id
        });
    }

    getSelectedNoteId = () => {
        return this.state.selectedNoteId;
    }

    render() {
        //<ListArea id="test" notes={this.state.notes} handleNoteChange={this.handleNoteChange}/>
        return (
            <div className="NoteEditor">
                <h1 className="title">Notebook</h1>
                <EditArea updateNotes={this.updateNotes} noteId={this.state.selectedNoteId} getSelectedNoteId={this.getSelectedNoteId}/>
            </div>
        );
    }
}

export default NoteEditor;