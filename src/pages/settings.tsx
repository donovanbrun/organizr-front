import { useEffect, useState } from "react";
import Nav from "../components/nav/Nav";
import { addUser, getWorkspaceUsers } from "../services/WorkspaceService";

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
                <h1>Settings</h1>
                <h2>Workspace</h2>
                <p>{users.length} users</p>
                <div>
                    {
                        users.map(u =>
                        (
                            <div key={u?.id}>
                                {u?.user.username} - {u?.role}
                            </div>
                        )
                        )
                    }
                </div>
                <div>
                    <input type="text" placeholder="User email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <label htmlFor="options-select">Role</label>
                    <select
                        id="options-select"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="select-input"
                    >
                        <option value="VIEWER">Viewer</option>
                        <option value="MEMBER">Member</option>
                        <option value="OWNER">Owner</option>
                    </select>
                    <button onClick={handleAddUser}>Invite</button>
                </div>
            </div>
        </div>
    )
}