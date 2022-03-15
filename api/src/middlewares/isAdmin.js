const express = require('express');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const bearerToken = req.headers['authorization'];
    if(bearerToken) {
        const bearer = bearerToken.split(' ');
        const token = bearer[1];
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if(err) res.status(406).json({msg: 'Invalid Token'});

            if(decoded.payload.role == 1) {
                next();
            } else {
                res.status(406).json({msg: 'You are not allowed to access this. Please contact the administrator.'});
            }
        });
    } else {
        res.status(406).json({msg: 'Token not provided'});
    }
}