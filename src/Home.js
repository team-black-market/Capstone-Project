import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import Login from "./Login";

const Home = ()=> {
    const login = async(credentials)=> {
        await api.login({ credentials, setAuth });
    }

    return(
    <>
        <header>
            <nav>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </nav>
        </header>
        <div id="logoDiv">
            <img id="logo" src="/assets/img/logo.svg" alt="Black market logo. No place like 127.0.01"/>
        </div> 
    </>
    )
}

export default Home;