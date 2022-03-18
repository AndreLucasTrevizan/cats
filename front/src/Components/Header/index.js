import React from 'react';
import { Link} from 'react-router-dom';

import './style.css';

export default function Header() {
    return (
        <header>
            <div>
                <Link to='/'><h1>Cats</h1></Link>
            </div>
        </header>
    );
}