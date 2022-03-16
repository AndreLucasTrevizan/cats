import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import api from '../../services/api';

import './style.css';

export default function Home() {
    const [cats, setCats] = useState([]);

    useEffect(() => {
        async function loadCats() {
            let response = await api.get('/breeds');
            let cats = response.data;
            setCats(cats);
        }

        loadCats();
    }, []);

    return(
        <div className="container">
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
                                    <Link to={`/cat/${cat.id}`}>
                                        <i className="material-icons">info</i>
                                        Ver mais
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