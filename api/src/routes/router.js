const express = require('express');
const router = express.Router();
const isAdmin = require('../middlewares/isAdmin');

const UserController = require('../controllers/UserController');

router.get('/', (req, res) => {
    res.status(200).json({message: 'Running...'});
});

router.post('/sign_in', UserController.sign_in);
router.post('/users', UserController.create);
router.get('/users', isAdmin, UserController.getAllUsers);

module.exports = router;