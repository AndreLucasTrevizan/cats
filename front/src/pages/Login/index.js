import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

import api from '../../services/api';

import './style.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    function sendData() {
        let data = {
            email: email,
            password: password
        };

        api.post('/sign_in', data).then(res => {
            if(res.status === 200) {
                localStorage.setItem('token', JSON.stringify(res.data.token));
                localStorage.setItem('user', JSON.stringify(res.data.user));
                history.push('/');
                return;
            }
        }).catch(err => {
            console.log(err.message);
        });
    }

    return (
        <div className="form-display">
            <div className="form">
                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="example@email.com"
                        onChange={e => {setEmail(e.target.value)}}
                    />
                </div>
                <div className="form-group">
                    <label>Senha</label>
                    <input 
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="*****************"
                        onChange={e => {setPassword(e.target.value)}}
                    />
                </div>
                <div className="form-group">
                    <button onClick={sendData}>Entrar</button>
                </div>
            </div>
        </div>
    );
}