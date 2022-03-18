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
        let token = JSON.parse(localStorage.getItem('token'));
        let user = JSON.parse(localStorage.getItem('user'));
        if(!token) {
            history.replace('/sign_in');
            return;
        }

        setIdUser(user.id);

        let data = {
            user_id: idUser,
            cat_id: id
        }

        let favs = [];
        let favsInLocal = JSON.parse(localStorage.getItem('favs'));

        if(favsInLocal != null) {
            let isThere = favsInLocal.find(el => el.id_cat === id);
            if(isThere) {
                alert('Gato já favoritado!');
                return;
            }
        }

        api.post('/favorites', data).then(res => {
            if(res.status == 201) {
                alert('Gato Favoritado!');
                favs.push(data);
                localStorage.setItem('favs', JSON.stringify(favs));
           } else if(res.status == 403) {
               alert(res.data.msg);
               return;
           }
        });


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