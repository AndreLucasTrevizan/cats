import {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';

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

        let data = {
            id_user: user.id,
            id_cat: id
        }
        console.log(data);
        api.post('/favorites', data).then(res => {
            if(res.status === 201) {
                toast.success('Cat Favorited');
           }
        }).catch(err => {
            toast.error(err.response.data.msg);
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