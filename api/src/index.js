const express = require('express');
const app = express();
const dotenv = require('dotenv').config();

const cors = require('cors');

app.use(cors());

app.use(express.json());

const router = require('./routes/router');

app.use('/api', router);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Running at port ${port}`);
});
