import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.css';
import { getUserId, getUsername, logout } from '../../services/LoginService';
import {DARKMODE, LIGHTMODE} from '../../constants';
import { MdOutlineDarkMode, MdOutlineWbSunny } from 'react-icons/md';

export default function Nav() {

    const [username, setUsername] = useState(null);
    const [darkmode, setDarkmode] = useState(localStorage.getItem("darkmode") === "true");
    const navigate = useNavigate()

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

    if(getUserId()) {
        getUsername().then((response) => {
            setUsername(response.data)
        })
    }

    let handleLogout = () => {
        logout()
        navigate("/login")
    } 

    let changeMode = () => {
        let d = !darkmode
        setDarkmode(d)
        localStorage.setItem("darkmode", d)
    }

    return (
        <div className='Nav'>
            <a href='/' className='NavTitle'>Organizr</a>
            <div className='NavLinks'>
                <Link to="/" className='NavLink'>HOME</Link>
                <Link to="/todo" className='NavLink'>TASK</Link>
                <Link to="/notebook" className='NavLink'>NOTE</Link>
                <p className='TextColor'>{username !== null ? "Connected as " + username : "Not connected"}</p>
                { 
                    username !== null 
                    ? <Link to="/login" onClick={handleLogout} className='NavLink'>LOGOUT</Link>
                    : <Link to="/login" className='NavLink'>LOGIN</Link>
                }
                <button className='DarkmodeButton' onClick={changeMode} >
                    {
                        darkmode ?
                        <MdOutlineWbSunny/> 
                        : <MdOutlineDarkMode/>
                    }
                </button>
            </div>
        </div>
    );
}