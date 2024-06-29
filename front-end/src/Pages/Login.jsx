import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import style from './Login.module.css';
import cylcleLogo from '../assets/CYCLE-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Import specific icons

export let loggedInUser=false;

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    async function login(event) {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/v1/registration/login", {
                email: email,
                password: password,
            }).then((res) => {
                console.log(res.data);

                if (res.data.message === "Email does not exits") {
                    alert("Not a registered user. Email not found");
                } else if (res.data.message === "Login Success") {
                    loggedInUser=true;
                    navigate('/');
                } else {
                    alert("Login Failed! Password does not match!");
                }
            }, fail => {
                console.error(fail); // Error!
            });
        } catch (err) {
            alert(err);
        }
    }

    return (
        <div className={style["LoginCard"]}>
            <div className="container">
                <img src={cylcleLogo} alt="Cycle Logo" className={style["CycleLogo"]} />
                <div className="row">
                    <div className="col-sm-6">
                        <form>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <div className={style["input-group"]}>
                                    <input type={showPassword ? "text" : "password"}
                                        className="form-control"
                                        id="password"
                                        placeholder="Enter Password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                    />
                                    <div className={style["input-group-append"]}>
                                        <span className={style["input-group-text"]} onClick={togglePasswordVisibility}>
                                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary" onClick={login}>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
