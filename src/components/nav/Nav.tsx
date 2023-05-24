import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/Nav.module.css';
import { getUserId, getUsername, logout } from '../../services/LoginService';
import { DARKMODE, LIGHTMODE } from '../../constants';
import { MdOutlineDarkMode, MdOutlineWbSunny } from 'react-icons/md';
import { Toaster } from 'react-hot-toast';
import { AxiosResponse } from 'axios';

export default function Nav() {

    const [username, setUsername] = useState(null);
    const [darkmode, setDarkmode] = useState(true);
    const router = useRouter();

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

    const userId = getUserId();

    if (userId !== null && username === null) {
        if (process.env.NEXT_PUBLIC_OFFLINE_MODE !== "true") {
            getUsername().then((response: AxiosResponse) => {
                setUsername(response.data)
            });
        }
    }

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
                        username !== null ? "Connected as " + username : "Not connected";

    return (
        <div className={styles.Nav}>
            <Toaster />
            <a href='/' className={styles.NavTitle}>Organizr</a>
            <div className={styles.NavLinks}>
                <Link href="/" className={styles.NavLink}>HOME</Link>
                <Link href="/todo" className={styles.NavLink}>TASK</Link>
                <Link href="/notebook" className={styles.NavLink}>NOTE</Link>
                <p className="TextColor">{usernameText}</p>
                {
                    username !== null
                        ? <Link href="/login" onClick={handleLogout} className={styles.NavLink}>LOGOUT</Link>
                        : <Link href="/login" className={styles.NavLink}>LOGIN</Link>
                }
                <button className={styles.DarkmodeButton} onClick={changeMode} >
                    {
                        darkmode ?
                            <MdOutlineWbSunny />
                            : <MdOutlineDarkMode />
                    }
                </button>
            </div>
        </div>
    );
}