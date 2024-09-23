import { useEffect, useState } from "react";
import Nav from "../components/nav/Nav";
import { addUser, getWorkspaceUsers } from "../services/WorkspaceService";
import styles from "../styles/Settings.module.css";

export default function Settings() {

    const [workspace, setWorkspace] = useState(null);
    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("VIEWER");

    const fetchUsers = () => {
        getWorkspaceUsers(workspace.id).then((response) => {
            setUsers(response?.data);
        })
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            setWorkspace(JSON.parse(localStorage.getItem("workspace")))
        }
    }, [])

    useEffect(() => {
        if (workspace) {
            fetchUsers();
        }
    }, [workspace])

    const handleAddUser = () => {
        addUser(workspace.id, email.trim(), role).then(() => {
            fetchUsers();
        })
    }

    return (
        <div className="App">
            <Nav></Nav>
            <div>
                <h1 className="title">Settings</h1>
                <h2 className="subtitle">Workspace</h2>
                <p className="TextColor">{users.length} users</p>
                <div className={styles.users}>
                    {
                        users.map(u =>
                        (
                            <div key={u?.id} className="TextColor">
                                {u?.user.username} - {u?.role}
                            </div>
                        )
                        )
                    }
                </div>
                <div className={styles.addUser}>
                    <input className="Input" type="text" placeholder="User email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <label htmlFor="options-select" className="TextColor">Role</label>
                    <select
                        id="options-select"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="Input"
                    >
                        <option value="VIEWER">Viewer</option>
                        <option value="MEMBER">Member</option>
                        <option value="OWNER">Owner</option>
                    </select>
                    <button onClick={handleAddUser} className="Button">Invite</button>
                </div>
            </div>
        </div>
    )
}