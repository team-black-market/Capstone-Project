import React from "react";
import { useState, useEffect } from "react";
import api from "../api";

const Settings = ({ auth, attemptLoginWithToken })=> {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameMessage, setUsernameMessage] = useState('')
    const [passwordMessage, setPasswordMessage] = useState('')

    const updateUsername = async(userInfo)=> {
        await api.updateUser(userInfo)
    }

    const updatePassword= async(userInfo)=> {
        await api.updatePass(userInfo)
    }

    const updateUser = async(ev)=> {
        ev.preventDefault();
        const credentials = { id: auth.id, username: username }
        try {
            await updateUsername({credentials: credentials, setUsernameMessage: setUsernameMessage});
            attemptLoginWithToken()
        } 
        catch(ex){
            console.log(ex)
        }
    }

    const updatePass = async(ev)=> {
        ev.preventDefault();
        const credentials = { id: auth.id, password: password }
        try {
            await updatePassword({credentials: credentials, setPasswordMessage: setPasswordMessage})
        } catch (ex) {
            console.log(ex)
        }
    }

    return(
        <div>
            <h1>Welcome to your settings page {`${auth.username}`}!</h1>
            <div>
                <h2>Update username?</h2>
                <p>Only you can see your username!</p>
                    {usernameMessage.status === 200 ?
                        <div>
                            <img src="../assets/img/success.svg"/>
                            &nbsp;
                            <p>Username updated!</p>
                        </div>
                    : null}
                <form onSubmit={ updateUser }>
                    <input placeholder='Username' name='username' type='username' value={ username } onChange={ ev => setUsername(ev.target.value)} required/>
                    <button>Update</button>
                </form>
            </div>
            <div>
                <h2>Update Password?</h2>
                <p>A secure password helps protect your Black Market account!</p>
                {passwordMessage.status === 200 ?
                    <div>
                        <img src="../assets/img/success.svg"/>
                        &nbsp;
                        <p>Password updated!</p>
                    </div>
                : null}
                <form onSubmit={ updatePass }>
                    <input placeholder='Password' name='password' type='password' value={ password } onChange={ ev => setPassword(ev.target.value)} required/>
                    <button>Update</button>
                </form>
            </div>
        </div>
        
    )
}

export default Settings