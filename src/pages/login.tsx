import styles from '../styles/Login.module.css';
import { useState } from 'react';
import { login } from '../services/LoginService';
import { NextRouter, useRouter } from 'next/router';

export default function Login() {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const router: NextRouter = useRouter();

    let handleLogin = () => {
        login(username, password).then(() => router.push('/'))
    }

    return (
        <div className={styles.Login}>
            <h1 className="title">Login</h1>
            <input className='Input' type="text" placeholder='Username' value={username} onChange={e => setUsername(e.target.value)}></input>
            <input className='Input' type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}></input>
            <button className='Button' onClick={handleLogin}>Login</button>
        </div>
    )
}