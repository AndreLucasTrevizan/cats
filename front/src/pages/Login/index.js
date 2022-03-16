import React from 'react';

import './style.css';

export default function Login() {
    return (
        <div className="container">
            <div className="form">
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" placeholder="example@email.com" />
                </div>
                <div className="form-group">
                    <label>Senha</label>
                    <input type="password" name="password" className="form-control" placeholder="*****************" />
                </div>
                <div className="form-group">
                    <button>Entrar</button>
                </div>
            </div>
        </div>
    );
}