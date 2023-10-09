import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = ({ login })=> {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const _login = async(ev)=> {
    ev.preventDefault();
    try {
      await login({ username, password });
    }
    catch(ex){
      console.log(ex.response.data);
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
            <form onSubmit={ _login }>
              <h2 id='loginText'>Login</h2>
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
              <div className='remember'>
                <label>
                  <input type='checkbox' name="rememberMe"/> Remember me?
                </label>
                <Link to="/recover">Forgot password?</Link>
              </div>
              <button disabled={!username || !password}>Login</button>
              <div className='signUp'>
                  <p>Don't have an account? <Link to='/register' className=''>Sign up!</Link></p>
              </div>
              </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
