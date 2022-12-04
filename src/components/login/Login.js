import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../../services/LoginService';

export default function Login() {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const navigate = useNavigate();

    let login = () => {
        loginApi(username, password).then(navigate("/"))
    }

    return (
        <div className='Login'>
            <h1 className="title">Login</h1>
            <input className='Input' type="text" placeholder='Username' value={username} onChange={e => setUsername(e.target.value)}></input>
            <input className='Input' type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}></input>
            <button className='Button' onClick={login}>Login</button>
        </div>
    )
}