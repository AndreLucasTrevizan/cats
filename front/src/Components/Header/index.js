import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import './style.css';

export default function Header() {

    const[signedIn, setSignedIn] = useState(false);

    useEffect(() => {
        function loadToken() {
            let token = JSON.parse(localStorage.getItem('token'));
            if(token) {
                setSignedIn(true);
            }
        }

        loadToken();
    }, []);

    return (
        <header>
            <div>
                <Link to='/'><h1>Cats</h1></Link>
                {signedIn && 
                    <Link className='logo'>Favoritos</Link>
                }
            </div>
        </header>
    );
}