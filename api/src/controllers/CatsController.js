const express = require('express');
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
            let cats = [];
            newCats.forEach(cat => {
                let c = {
                    name: cat.name,
                    description: cat.description,
                    temperament: cat.temperament,
                    image: cat.image.url
                };

                cats.push(c);
            });
            res.status(200).json(cats);
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

}

module.exports = new CatsController();