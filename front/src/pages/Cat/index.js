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

            setCat(cat);
            setLoading(false);
        }
    
        loadCat();    
    }, [history, id]);

    if(loading) {
        return(
            <div className="cat-info">
                <h1>Carregando dados...</h1>
            </div>
        );
    }
    
    return (
        <p>{cat.name}</p>
    );
}