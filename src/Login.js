import React, { useEffect } from "react";
import "./Login.css";
import axios from "axios";
import { useState } from "react";
function Login() {

    const googleAuth = () => {
        window.open(
            `${process.env.REACT_APP_API_URL}/auth/google`,
            "_self"
        )
    }

    return (
        <div className="login">
            <h1>Login/SignUp Form</h1>
            <h2>ID:</h2>
            <input type="text" placeholder="Enter ID" />
            <h2>Password:</h2>
            <input type="text" placeholder="Enter Password" />
            <button className="sign">Sign-In</button>

            <button onClick={googleAuth}>Sign-In with Google</button>
        </div>
    )
}
export default Login;
