import React, {useState, useEffect} from 'react';
import {useParams, useHistory, Link} from 'react-router-dom';
import {toast} from 'react-toastify';

import api from '../../services/api';

import './style.css';

export default function Favorites() {
    const params = useParams();
    const history = useHistory();

    const [favs, setFavs] = useState([]);

    useEffect(() => {
        async function load() {
            console.log(params);

            let responseAPI = await api.get(`/favorites/${params.id_user}`);
            setFavs(responseAPI.data);
        }

        load();
    }, [history, params]);

    function deleteCat(cat) {
        toast.info(
            (
            <div>
                <p>Are you sure to remove the {cat.name} of your favorites?</p>
                <div className="actions">
                    <span className="yes" onClick={() => deleting(cat.id)}>Yes</span>
                </div>
            </div>
        ), {
            closeButton: true,
        });
    };

    function deleting(id) {
        api.delete(`/favorites/${id}`);
    }

    return(
        <div className="container">
            {favs.length === 0 &&
                <span  className="nofavs">Você ainda não possui favoritos! :c</span>
            }
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
                                <a className="delete-btn" onClick={() => {deleteCat(cat.cat_favorite)}}>
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