import { useEffect, useState } from "react";
import styles from '../styles/Workspace.module.css';
import Nav from "../components/nav/Nav";
import { createWorkspace, getWorkspaces } from "../services/WorkspaceService";
import { useRouter } from "next/router";

export default function Workspace() {

    const [workspaces, setWorkspaces] = useState([]);
    const [workspaceCreation, setWorkspaceCreation] = useState(false);
    const [workspaceName, setWorkspaceName] = useState("");
    const router = useRouter();

    const fetchData = () => {
        getWorkspaces().then((response) => {
            setWorkspaces(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleClick = (index) => {
        localStorage.setItem("workspace", JSON.stringify(workspaces[index]));
        router.push("/");
    }

    const handleWorkspaceCreation = () => {
        createWorkspace({
            name: workspaceName
        }).then(() => {
            fetchData();
            setWorkspaceCreation(false);
        });
    }

    return (
        <div className="App">
            <div className={styles.workspace}>
                {
                    workspaceCreation ?
                        <h1>Create a workspace</h1>
                        : <h1>Select a workspace</h1>
                }
                {
                    workspaceCreation ?
                        <div className={styles.workspaceCreation}>
                            <input type="text" placeholder="Workspace name" value={workspaceName} onChange={(e) => setWorkspaceName(e.target.value)}></input>
                            <button onClick={handleWorkspaceCreation}>Create</button>
                        </div>
                        :
                        < div className={styles.workspaceList}>
                            {workspaces.map((workspace, index) => {
                                return (
                                    <div key={index} className={styles.workspaceItem} onClick={() => handleClick(index)}>
                                        <h2>{workspace.name}</h2>
                                    </div>
                                )
                            })}
                            <button onClick={() => setWorkspaceCreation(true)} className={styles.workspaceItem}>+</button>
                        </div>
                }

            </div>
        </div >
    )
}