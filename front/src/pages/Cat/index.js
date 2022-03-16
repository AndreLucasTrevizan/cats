import {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';

import api from '../../services/api';

import './style.css';

export default function Cat() {
    const {id} = useParams();
    const history = useHistory();


    const [cat, setCat] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadCat() {
            let response = await api.get(`/cats/${id}`);
            let catApi = response.data;
            
            if(!catApi) {
                history.replace('/');
                return;
            }

            setCat(catApi);
            setLoading(false);
        }
    
        loadCat();    
    }, [history, id]);

    function setFavCat() {
        let token = JSON.parse(localStorage.getItem('token'));
        if(!token) {
            history.replace('/sign_in');
            return;
        }
    }

    if(loading) {
        return(
            <div className="cat-info">
                <h1>Carregando dados...</h1>
            </div>
        );
    }
    
    return (
        <div className="container">
            <h2>{cat.name}</h2>
            <div className="cat-info">
                <div className="image-cat">
                    <figure>
                        <img src={cat.image} alt={cat.name} />
                    </figure>
                </div>
                <div className="details">
                    <p>{cat.description}</p>
                    <span>Comportamento: </span>{cat.temperament}
                    <div className="buttons-cat">
                        <span onClick={() => setFavCat()}>
                            <i className="material-icons">add</i>
                            Favoritar
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}