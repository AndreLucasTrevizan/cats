const express = require('express');
const models = require('../../models');
const model = models.sequelize.models.cats;
const dotenv = require('dotenv').config();
const api = require('../common/api');

class CatsController {

    async getAllCatsFromApi(req, res) {
        try {
            let req = {
                headers: {
                    'x-api-key': process.env.API_KEY
                }
            }

            let responseApi = await api.get('/breeds', req);
            let newCats = responseApi.data.filter(cat => {return cat.reference_image_id !== undefined});

            newCats.forEach(async cat => {
                await model.create({
                    name: cat.name,
                    description: cat.description,
                    temperament: cat.temperament,
                    image: (cat.image.url !== undefined) ? cat.image.url : process.env.CAT_IMG
                });
            });        
                
            res.status(200).json({msg: 'Cats registered'});
            
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async breeds(req, res) {
        try {
            let cats = await model.findAll();
            res.status(200).json(cats);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async getInfoFromCat(req, res) {
        try {
            let cat = await model.findOne({where: {id: req.params.id}});
            res.status(200).json(cat);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

}

module.exports = new CatsController();