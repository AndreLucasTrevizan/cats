const axios = require('axios');

const api = axios.create({
    baseURL: 'https://api.thecatapi.com/v1'
});

module.exports = api;