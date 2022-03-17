import {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';

import api from '../../services/api';

import './style.css';

export default function Cat() {
    const {id} = useParams();
    const history = useHistory();


    const [cat, setCat] = useState([]);
    const [loading, setLoading] = useState(true);
    const [idUser, setIdUser] = useState('');

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
        console.log('ok, entrei');
        let token = JSON.parse(localStorage.getItem('token'));
        let user = JSON.parse(localStorage.getItem('user'));
        if(!token) {
            history.replace('/sign_in');
            return;
        }

        setIdUser(user.id);

        let data = {
            id_user: idUser,
            id_cat: id
        }
        let favs = JSON.parse(localStorage.getItem('favs'));
        
        console.log(favs);
        if(favs) {
            let isValid = favs.find(cat => cat.id_cat == id);
            if(isValid) {
                alert('Você já adicionou esse gato a sua lista!');
                return;
            }

            api.post('/favorites', data).then(res => {
                if(res.status == 201) {
                    if(favs) {
                        favs.push(data);
                    } else {
                        localStorage.setItem('favs', JSON.stringify(data));
                    }
                }
            });
        } else {
            console.log('Ook, não tinha gatos e adicionei um');
            api.post('/favorites', data).then(res => {
                if(res.status == 201) {
                    if(favs) {
                        let favorites = [];
                        favorites.push(data);
                        localStorage.setItem('favs', JSON.stringify(favorites));
                    }
                }
            });
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