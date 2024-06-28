const {Router} = require('express');
const router = Router();
const {check} = require('express-validator');
const validate = require('../middlewares/middleware');
const loginController = require('../controllers/login.controllers');

router.post('/', [
    check('usuario','El usuario es obligatorio').notEmpty(),
    check('password','El password es obligatorio').notEmpty(),
    validate
] ,loginController.loginUsarios);

module.exports = router;