import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({auth})=> {
   
    return(
    <>
        {
            !auth ? 
                <header>
                    <nav id='homeNav'>
                        <Link to='/login'>Login</Link>
                        <Link to='/register'>Register</Link>
                    </nav>
                </header> 
            : null
        }
        <div id='logoDiv'>
            <img id='logo' src='/assets/img/homeLogo.svg' alt='Black market logo. No place like 127.0.01'/>
        </div> 
    </>
    )
    
}

export default Home;