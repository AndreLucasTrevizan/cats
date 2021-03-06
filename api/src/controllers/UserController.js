const models = require('../../models');
const model = models.sequelize.models.users;
const dotenv = require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

class UserController {

    async sign_in(req, res) {
        try {
            const {email, password} = req.body;
            let user = await model.findOne({where: {email: email}});
            if(user) {
                let isValidHash = bcryptjs.compareSync(password, user.password);

                let payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role_id
                };

                if(isValidHash) {
                    const token = jwt.sign({payload}, process.env.SECRET, {expiresIn: '24h'});
                    res.status(200).json({user: payload, token: token});
                } else {
                    res.status(403).json({msg: 'Email or password is invalid'});
                }   
            } else {
                res.status(403).json({msg: 'Email or password is invalid'});
            }            
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    }

    async getAllUsers(req, res) {
        try {
            let users = await model.findAll({
                include: {
                    model: models.sequelize.models.roles, as: 'Role',
                },
                attributes: {exclude: ['password']}
            });

            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    }

    async create(req, res) {
        try {
            let errors = [];
            const {name, lastname, email, password, role_id} = req.body;
            if(name == undefined || name == '') {
                errors.push('Name cannot be empty!');
            }

            if(lastname == undefined || lastname == '') {
                errors.push('Lastname cannot be null!');
            }

            if(email == undefined || email == '') {
                errors.push('Email cannot be empty!');
            }

            if(password == undefined || password == '') {
                errors.push('Password cannot be empty!');
            }

            if(errors.length > 0) {
                res.status(403).json({errors});
            } else {
                let hash = bcryptjs.hashSync(password, 15);
                let user = await model.findOne({where: {email: email}});
                if(!user) {
                    await model.create({
                        name: name,
                        lastname: lastname,
                        email: email,
                        password: hash,
                        role_id: (role_id !== undefined || role_id === '') ? role_id : 2
                    });

                    res.status(201).json({msg: 'User Created'});
                } else {
                    res.status(403).json({msg: 'Email is already in use'});
                }
            }
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    }

    async update(req, res) {
        try {
            const {name, lastname, email} = req.body;
            await model.update({
                name: name,
                lastname,
                email: email
            }, {
                where: {id: req.params.id}
            });
            res.status(200).json({msg: 'User Updated'});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            let user = await model.destroy({where: {id: id}});
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    }

}

module.exports = new UserController();