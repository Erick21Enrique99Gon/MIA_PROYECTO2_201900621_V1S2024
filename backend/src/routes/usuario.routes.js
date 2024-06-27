const {Router} = require('express');
const router = Router();
const {check} = require('express-validator');
const validate = require('../middlewares/middleware');
const usuarioController = require('../controllers/usuario.controllers');

router.get('/',(req,res)=>{
    res.status(200).json({
        msg:'Hola usuario'
    })
});

router.post('/registroViajes', [
    check('usuario','El usuario es obligatorio').notEmpty(),
    check('nombre_agencia','El nombre de la agencia es obligatorio').notEmpty(),
    check('ciudad_origen','La ciudad de origen es obligatoria').notEmpty(),
    check('ciudad_destino','La ciudad de destino es obligatoria').notEmpty(),
    check('dias_vuelo','Los dias de vuelo son obligatorios').notEmpty(),
    check('precio_vuelo','El precio de vuelo es obligatorio').notEmpty(),
    validate
] ,usuarioController.registroViajes);
router.post('/registroAutos', [
    check('usuario','El usuario es obligatorio').notEmpty(),
    check('nombre_agencia','El nombre de la agencia es obligatorio').notEmpty(),
    check('marca','La marca es obligatoria').notEmpty(),
    check('modelo','El modelo es obligatorio').notEmpty(),
    check('precio','El precio es obligatorio').notEmpty(),
    validate
] ,usuarioController.registroAutos);

module.exports = router;