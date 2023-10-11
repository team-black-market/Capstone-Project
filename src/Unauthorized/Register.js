import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = ({ registerUser })=> {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('')
    const [count, setCount] = useState(5)

    const navigate = useNavigate()
  
    const _register = async(ev)=> {
      const credentials = {username: username, password: password}
      ev.preventDefault();
      try {
        await registerUser({credentials, setMessage})
      }
      catch(ex){
        setMessage(ex.response.data);
      }
    }

    let _count = count
    const countDown = ()=> {
        if(_count === 0){
          navigate('/login')
          clearInterval(countDown)
        }
        setCount(_count--)
    }

    useEffect(()=> {
      if(message.status === 200){
        setCount(_count--)
        setInterval(countDown, 1000)
      }
    }, [message])

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
                { message ? 
                  <>
                    {message.error ?
                      <div className="errorWrap">
                        <img src="../assets/img/error.svg"/>
                        &nbsp;
                        <p>Username taken! Please try again!</p>
                      </div> 
                    : null}
                    {message.status === 200 ? 
                      <div className="successWrap">
                        <img src="../assets/img/success.svg"/>
                        &nbsp;
                        <p>Account created! You'll be redirected to the login page in: {count}</p> 
                      </div>
                    : null}
                  </>
                  : null}
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