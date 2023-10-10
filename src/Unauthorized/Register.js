import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ register })=> {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const _register = async(ev)=> {
      ev.preventDefault();
      try {
        await register({username, password})
      }
      catch(ex){
        // console.log(ex.response.data);
      }
    }

    return (
        <>
        <nav id="loginNav">
            <Link to="/">
                <img src="../assets/img/icon.svg"/>
            </Link>
        </nav>
        <div className='centerWrapper'>
          <div className='wrapper'>
            <div className='form-wrapper'>
              <form onSubmit={ _register }>
                <h2 id='loginText'>Register!</h2>
                <div className='input-group'>
                  <input
                  placeholder='Username'
                    name='userName'
                    autoComplete='username'
                    type='text'
                    value={ username }
                    onChange={ ev => setUsername(ev.target.value)}
                    required
                  />
                </div>
                <div className='input-group'>
                    <input
                      placeholder='Password'
                      name='password'
                      autoComplete='current-password'
                      type='password'
                      value={ password }
                      onChange={ ev => setPassword(ev.target.value)}
                      required
                    />
                </div>
                <button disabled={!username || !password}>Create Account!</button>
                <div className='signUp'>
                  <p>Have an account? <Link to='/login' className=''>Login!</Link></p>
              </div>
                </form>
            </div>
          </div>
        </div>
      </>
    )
}

export default Register