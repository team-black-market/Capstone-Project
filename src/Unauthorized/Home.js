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
        <div className='emberContainer'>
            <div className='ember'>
                <div id='space'></div>
                <span style={{"--duration": `${(Math.random() * (60 - 25) + 25)}`}}></span>
                <div id='space'></div>
                <span style={{"--duration": `${(Math.random() * (60 - 25) + 25)}`}}></span>
                <div id='space'></div>
                <span style={{"--duration": `${(Math.random() * (60 - 25) + 25)}`}}></span>
                <div id='space'></div>
                <span style={{"--duration": `${(Math.random() * (60 - 25) + 25)}`}}></span>
                <div id='space'></div>
                <span style={{"--duration": `${(Math.random() * (60 - 25) + 25)}`}}></span>
                <div id='space'></div>
                <span style={{"--duration": `${(Math.random() * (60 - 25) + 25)}`}}></span>
                <div id='space'></div>
                <span style={{"--duration": `${(Math.random() * (60 - 25) + 25)}`}}></span>
                <div id='spacer'></div>
                <span style={{"--duration": `${(Math.random() * (60 - 25) + 25)}`}}></span>
                <div id='space'></div>
                <span style={{"--duration": `${(Math.random() * (60 - 25) + 25)}`}}></span>
                <div id='space'></div>
                <span style={{"--duration": `${(Math.random() * (60 - 25) + 25)}`}}></span>
                <div id='space'></div>
                <span style={{"--duration": `${(Math.random() * (60 - 25) + 25)}`}}></span>
                <div id='space'></div>
                <span style={{"--duration": `${(Math.random() * (60 - 25) + 25)}`}}></span>
                <div id='space'></div>
                <span style={{"--duration": `${(Math.random() * (60 - 25) + 25)}`}}></span>
                <div id='space'></div>
                <span style={{"--duration": `${(Math.random() * (60 - 25) + 25)}`}}></span>
                <div id='space'></div>
            </div>
        </div>
    </>
    )
}

export default Home;