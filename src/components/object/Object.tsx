import { useState, useEffect } from 'react';
import { getTasks } from '../../services/offline/TaskOfflineService';
import { getNotes } from "../../services/offline/NoteOfflineService";
import { AxiosResponse } from 'axios';
import Task from '../../models/task';
import Note from '../../models/note';

export default function ObjectComponent() {

    const [tasks, setTasks] = useState([]);
    const [notes, setNotes] = useState([]);
    const [objects, setObjects] = useState([]);

    let fetchData = () => {

        setObjects([])

        getTasks([]).then((tasksData: AxiosResponse) => {
            let taskslist = tasksData.data;
            setTasks(taskslist);

            taskslist.forEach((task: Task) => {
                let tmp = {
                    id: task.id,
                    name: task.name,
                    type: "task",
                    updateDate: task.creationDate
                }

                setObjects(a => [...a, tmp]);
            })
        });

        getNotes().then((notes: AxiosResponse) => {
            let noteslist = notes.data;
            setNotes(noteslist);

            noteslist.forEach((note: Note) => {
                let tmp = {
                    id: note.id,
                    name: note.name,
                    type: "note",
                    updateDate: note.updateDate
                }

                setObjects(a => [...a, tmp]);
            })
        });
    }

    useEffect(() => {
        fetchData()
    }, [])

    var a = objects.map(object => {
        return (
            <tr>
                <td>{object.id}</td>
                <td>{object.name}</td>
                <td>{object.type}</td>
                <td>{object.updateDate}</td>
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
                        <th>updateDate</th>
                    </tr>
                </thead>
                <tbody>
                    {a}
                </tbody>
            </table>
        </div>
    )
}