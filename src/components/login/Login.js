import React from 'react';
import axios from "axios";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "username": null,
            "password": null
        }
    }

    onUsernameChange = (event) => {
        this.setState({
            "username": event.target.value
        })
    }

    onPasswordChange = (event) => {
        this.setState({
            "password": event.target.value
        })
    }

    login = () => {
        const loginFormData = new FormData();
        loginFormData.append("username", this.state.username);
        loginFormData.append("password", this.state.password);

        axios.post("http://localhost:8080/login", loginFormData, { "Content-Type": "multipart/form-data" });
    }

    render() {

        const username = this.state.username;
        const password = this.state.password;

        return (
            <div>
                <input type="text" value={username} onChange={this.onUsernameChange}></input>
                <input type="password" value={password} onChange={this.onPasswordChange}></input>
                <button onClick={this.login}>login</button>
            </div>
        )
    }
}

export default Login;