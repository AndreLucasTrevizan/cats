import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import './style.css';

export default function Header() {

    const [userId, setUserId] = useState('');

    useEffect(() => {
        function getUser() {
            let hasUserSigned = JSON.parse(localStorage.getItem('user'));
            if(hasUserSigned) {
                setUserId(hasUserSigned.id);
            }
        }

        getUser();
    });

    return (
        <header>
            <div>
                <Link to='/'><h1>Cats</h1></Link>
                <Link to={`/favorites/${userId}`} className='logo'>Favoritos</Link>
            </div>
        </header>
    );
}