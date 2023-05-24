import { useState, useEffect } from 'react';
import { getTasks } from '../../services/TaskService';
import { getNotes } from "../../services/NoteService";
import { AxiosResponse } from 'axios';

export default function Object() {

    const [tasks, setTasks] = useState([]);
    const [notes, setNotes] = useState([]);
    const [objects, setObjects] = useState([]);

    let fetchData = ()  => {

        setObjects([])

        getTasks().then((tasksData: AxiosResponse) => {
            let taskslist = tasksData.data;
            setTasks(taskslist);
            
            taskslist.forEach(task => {
                let tmp = {
                    id: task.id,
                    name: task.name,
                    type: "task"
                }

                setObjects(a => [...a,tmp] );
            })
        });

        getNotes().then(notes => {
            let noteslist = notes.data;
            setNotes(noteslist);
            
            noteslist.forEach(note => {
                let tmp = {
                    id: note.id,
                    name: note.name,
                    type: "note"
                }

                setObjects(a => [...a,tmp] );
            })
        });
    }

    useEffect(() => {
        fetchData()
    }, [])

    console.log(objects)

    var a = objects.map(object => {
        return (
            <tr>
                <td>{object.id}</td>
                <td>{object.name}</td>
                <td>{object.type}</td>
            </tr>
        )
    })

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>type</th>
                    </tr>
                </thead>
                <tbody>
                    {a}
                </tbody>
            </table>
        </div>
    )
}