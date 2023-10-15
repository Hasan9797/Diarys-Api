const router = require('express').Router();

const { regester, login, logout } = require('../controllers/auth');

router.post('/register', regester);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;
