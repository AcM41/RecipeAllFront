import React, { useState,useContext } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import { AuthContext } from "../helpers/AuthContext";

    function Login() {
        let navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {setAuthState} = useContext(AuthContext)

    const login = () => {
        const data = { username: username, password: password };
        axios.post("https://recipe-all.onrender.com/auth/login", data).then((response) => {
        if(response.data.error){alert(response.data.error)} 
        else{
            localStorage.setItem("accessToken",response.data.token);
            console.log(response.data.username)
            setAuthState({
                username: response.data.username,
                id: response.data.id,
                status: true,
                });
            navigate('/')}
        
        });
    };
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                <h2>Login</h2>
                <form>
                    <div className="mb-3">
                    <label className="form-label">Username:</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={(event) => {
                        setUsername(event.target.value);
                        }}
                    />
                    </div>
                    <div className="mb-3">
                    <label className="form-label">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        onChange={(event) => {
                        setPassword(event.target.value);
                        }}
                    />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={login}>Login</button>
                </form>
                </div>
            </div>
            </div>
        );
    }
    
    export default Login;