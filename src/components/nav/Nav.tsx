'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/Nav.module.css';
import { getUser, logout } from '../../services/LoginService';
import { DARKMODE, LIGHTMODE } from '../../constants';
import { MdOutlineDarkMode, MdOutlineWbSunny } from 'react-icons/md';
import { Toaster } from 'react-hot-toast';

export default function Nav() {

    const [user, setUser] = useState(null);
    const [workspace, setWorkspace] = useState(null);
    const [darkmode, setDarkmode] = useState(true);
    const [title, setTitle] = useState("Organizr");
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (darkmode) {
                document.documentElement.style.setProperty('--primary-color', DARKMODE.primary);
                document.documentElement.style.setProperty('--secondary-color', DARKMODE.secondary);
                document.documentElement.style.setProperty('--accent-color', DARKMODE.accent);
                document.documentElement.style.setProperty('--accent2-color', DARKMODE.accent2);
                document.documentElement.style.setProperty('--color', DARKMODE.color);
                document.documentElement.style.setProperty('--background', DARKMODE.background);
                document.documentElement.style.setProperty('--title', DARKMODE.title);
                document.documentElement.style.setProperty('--subtitle', DARKMODE.subtitle);
            }
            else {
                document.documentElement.style.setProperty('--primary-color', LIGHTMODE.primary);
                document.documentElement.style.setProperty('--secondary-color', LIGHTMODE.secondary);
                document.documentElement.style.setProperty('--accent-color', LIGHTMODE.accent);
                document.documentElement.style.setProperty('--accent2-color', LIGHTMODE.accent2);
                document.documentElement.style.setProperty('--color', DARKMODE.color);
                document.documentElement.style.setProperty('--background', LIGHTMODE.background);
                document.documentElement.style.setProperty('--title', LIGHTMODE.title);
                document.documentElement.style.setProperty('--subtitle', LIGHTMODE.subtitle);
            }
        }

        if (typeof window !== "undefined") {
            //setDarkmode(localStorage.getItem("darkmode") === "true")
        }

        if (workspace === null) {
            if (typeof window !== "undefined") {
                if (localStorage.getItem("workspace") === null) {
                    router.push("/workspace")
                }
                else {
                    setWorkspace(JSON.parse(localStorage.getItem("workspace")))
                    setTitle(JSON.parse(localStorage.getItem("workspace")).name)
                }
            }
        }

        if (user === null) {
            if (process.env.NEXT_PUBLIC_OFFLINE_MODE !== "true") {
                getUser().then(user => {
                    setUser(user);
                });
            }
        }
    }, [darkmode, workspace, user])

    let handleLogout = () => {
        logout()
        router.push("/login")
    }

    let changeMode = () => {
        let d = !darkmode
        setDarkmode(d)
        if (typeof window !== "undefined") localStorage.setItem("darkmode", d.valueOf().toString())
    }

    const usernameText = process.env.NEXT_PUBLIC_OFFLINE_MODE === "true" ? "Offline mode" :
        user !== null ? "Connected as " + user.username : "Not connected";

    return (
        <div className={styles.Nav}>
            <Toaster />
            <Link href='/workspace' className={styles.NavTitle}>{title}</Link>
            <div className={styles.NavGroups}>
                <div className={styles.NavLinks}>
                    <Link href="/" className={styles.NavLink}>Home</Link>
                    <Link href="/board" className={styles.NavLink}>Board</Link>
                    <Link href="/list" className={styles.NavLink}>List</Link>
                    {/* <Link href="/notebook" className={styles.NavLink}>Note</Link> */}
                </div>
                <div className={styles.NavLinks}>
                    <p className="TextColor">{usernameText}</p>
                    {
                        process.env.NEXT_PUBLIC_OFFLINE_MODE === "false" ?
                            user !== null
                                ? <Link href="/login" onClick={handleLogout} className={styles.NavLink}>Logout</Link>
                                : <Link href="/login" className={styles.NavLink}>Login</Link>
                            : ''
                    }
                    {/* <button className={styles.DarkmodeButton} onClick={changeMode} title='Darkmode' aria-label="Darkmode">
                        {
                            darkmode ?
                                <MdOutlineWbSunny />
                                : <MdOutlineDarkMode />
                        }
                    </button> */}
                    <Link href="/settings" className={styles.NavLink}>Settings</Link>
                </div>
            </div>
        </div>
    );
}