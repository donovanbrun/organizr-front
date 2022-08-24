import React from "react";
import './ListArea.css';
import { Button } from 'primereact/button';

class ListArea extends React.Component {

    handleNoteChange = (id) => {
        this.props.handleNoteChange(id);
    }

    componentDidUpdate(prevProps) {
        if (this.props.notes !== prevProps.notes) {
            this.forceUpdate();
            console.log("changemement")
            console.log(prevProps.notes)
            console.log(this.props.notes)
        }
    }

    render() {
        
        const list = this.props?.notes;
        const notes = list?.map(note => {
            return (
                <div key={note.id}>
                    <Button label={note.name} className="NoteLink" onClick={(id) => {this.handleNoteChange(note.id)}}/>
                </div>
            )
        });

        return (
            <div className="ListArea">
                {notes}
            </div>
        );
    }
}

export default ListArea;