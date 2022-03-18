import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import api from '../../services/api';

import './style.css';

export default function Home() {
    const [cats, setCats] = useState([]);
    const [logged, setLogged] = useState([]);
    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user'));
        if(user) {
            setLogged(user);
        }

        async function loadCats() {
            let response = await api.get('/breeds');
            let cats = response.data;
            setCats(cats);
        }

        loadCats();
    }, []);

    return(
        <div className="container">
            <div className="actions-users">
                <Link to={`/favorites/${logged.id}`} className='logo'>Favorites</Link>
            </div>
            <div className="grid-cats">
                {cats.length !== 0 &&
                    cats.map(cat => (
                        <div className='cat-card' key={cat.id}>
                            <div className="cat-image">
                                <figure><img src={cat.image} alt={cat.name} /></figure>
                            </div>
                            <div className="cat-card-info">
                                <span>{cat.name}</span>
                                <div className="button-card">
                                    <Link to={`/cats/${cat.id}`}>
                                        <i className="material-icons">info</i>
                                        More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}