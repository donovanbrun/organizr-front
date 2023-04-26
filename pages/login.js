import styles from '../styles/Login.module.css';
import { useState } from 'react';
import { login as loginApi } from '../services/LoginService';
import { useRouter } from 'next/router';

export default function Login() {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const router = useRouter();

    let login = () => {
        loginApi(username, password).then(router.push('/'))
    }

    return (
        <div className={styles.Login}>
            <h1 className="title">Login</h1>
            <input className='Input' type="text" placeholder='Username' value={username} onChange={e => setUsername(e.target.value)}></input>
            <input className='Input' type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}></input>
            <button className='Button' onClick={login}>Login</button>
        </div>
    )
}