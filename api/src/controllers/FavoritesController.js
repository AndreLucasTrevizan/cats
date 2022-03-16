const express = require('express');
const models = require('../../models');
const model = models.sequelize.models.favorites;
const dotenv = require('dotenv').config();

class FavoritesController {

    async addFav(req, res) {
        try {
            const {id_user, id_cat} = req.body;
            await model.create({
                user_id: id_user,
                cat_id: id_cat
            });
            res.status(201).json({msg: 'Cat added'});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async getFavFromUser(req, res) {
        try {
            let favorites = await model.findAll({include: [{
                    model: models.sequelize.models.cats, as: 'cat_favorite'
                }], where: {user_id: req.params.id_user}});
            res.status(200).json(favorites);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async deleteFav(req, res) {
        try {
            await model.destroy({where: {cat_id: req.params.id_cat}});
            res.status(200).json({msg: 'Cat Deleted'});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

}

module.exports = new FavoritesController();