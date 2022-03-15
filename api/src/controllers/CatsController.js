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
            let cats = await model.findAll();
            if(cats.length === 0) {
                newCats.forEach(async cat => {
                    await model.create({
                        name: cat.name,
                        description: cat.description,
                        temperament: cat.temperament,
                        image: cat.image.url
                    });
                });
                
                res.status(200).json({msg: 'Cats registered'});
            } else {
                res.status(200).json(cats);
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async verifyDb() {
        try {
            let catsInDb = await model.findAll();
            return (catsInDb.length !== 0) ? catsInDb : false; 
        } catch (error) {
            throw new Error(error.message);    
        }
    }

}

module.exports = new CatsController();