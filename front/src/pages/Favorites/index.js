import React, {useState, useEffect} from 'react';
import {useParams, useHistory, Link} from 'react-router-dom';

import api from '../../services/api';

import './style.css';

export default function Favorites() {
    const params = useParams();
    const history = useHistory();

    const [favs, setFavs] = useState([]);

    useEffect(() => {
        async function load() {
            let responseAPI = await api.get(`/favorites/${params.id_user}`);
            let favsOfUser = responseAPI.data;

            if(!favsOfUser.length > 0) {
                history.push('/');
                return;
            }
            
            setFavs(responseAPI.data);
        }

        load();
    }, [history, params]);

    return(
        <div className="container">
            <div className="grid-cats">
                {favs.map(cat => (
                    <div className='cat-card' key={cat.cat_favorite.id}>
                        <div className="cat-image">
                            <figure><img src={cat.cat_favorite.image} alt={cat.cat_favorite.name} /></figure>
                        </div>
                        <div className="cat-card-info">
                            <span>{cat.cat_favorite.name}</span>
                            <div className="button-card">
                                <Link to={`/cats/${cat.cat_favorite.id}`}>
                                    <i className="material-icons">info</i>
                                    Ver mais
                                </Link>
                                <a className="delete-btn">
                                    <i className="material-icons">delete</i>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}