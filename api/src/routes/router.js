const express = require('express');
const router = express.Router();
const isAdmin = require('../middlewares/isAdmin');

const UserController = require('../controllers/UserController');
const CatsController = require('../controllers/CatsController');
const FavoritesController = require('../controllers/FavoritesController');

router.get('/', (req, res) => {
    res.status(200).json({message: 'Running...'});
});

router.post('/sign_in', UserController.sign_in);
router.post('/users', UserController.create);
router.get('/users', isAdmin, UserController.getAllUsers);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);

router.get('/cats', CatsController.getAllCatsFromApi);
router.get('/cats/:id', CatsController.getInfoFromCat);
router.get('/breeds', CatsController.breeds);

router.get('/favorites/:id_user', FavoritesController.getFavFromUser);
router.post('/favorites', FavoritesController.addFav);
router.delete('/favorites/:id_cat', FavoritesController.deleteFav);

module.exports = router;