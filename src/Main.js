import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Route, Routes, Router } from "react-router-dom";
import App from "./App";
import Login from "./Login";
import axios from "axios";
import { Navigate } from "react-router-dom";

function Main() {
    const [user, setUser] = useState(null);
    const getUser = async () => {
        try {
            const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
            const { data } = await axios.get(url, { withCredentials: true });
            setUser(data.user._json);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <div>
            <Routes>
                <Route
                    exact
                    path="/"
                    element={user ? <App user={user} /> : <Login />}
                />
                <Route
                    exact
                    path="./Login"
                    element={user ? <Navigate to="/" /> : <Login />}
                />
                {/* <Route
                    path="/signup"
                    element={user ? <Navigate to="/" /> : <Signup />}
                /> */}
            </Routes>
        </div>
    )
}

export default Main;