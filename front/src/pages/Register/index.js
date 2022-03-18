import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';

import './style.css';

export default function Register() {
    const history = useHistory();
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function sendData() {
        let data = {
            name: name,
            lastname: lastname,
            email: email,
            password: password
        };

        api.post('/users', data).then(res => {
            if(res.status === 201) {
                toast.success(res.data.msg);
                history.push('/sign_in');
            }            
        }).catch(err => {
            toast.error((err.response.data.errors));
        });
    }

    return(
        <div className="form-display">
            <div className="form">
                <div className="form-group">
                    <label>Name</label>
                    <input 
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Your Name Here"
                        onChange={e => {setName(e.target.value)}}
                    />
                </div>
                <div className="form-group">
                    <label>Lastname</label>
                    <input 
                        type="text"
                        name="lastname"
                        className="form-control"
                        placeholder="Your Lastname Here"
                        onChange={e => {setLastname(e.target.value)}}
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="youremail@example.com"
                        onChange={e => {setEmail(e.target.value)}}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="*************"
                        onChange={e => {setPassword(e.target.value)}}
                    />
                </div>
                <div className="form-group">
                    <button onClick={sendData}>Cadastrar</button>
                </div>
            </div>
        </div>
    );
}