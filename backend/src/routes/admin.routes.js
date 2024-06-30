const {Router} = require('express');
const router = Router();
const {check} = require('express-validator');
const validate = require('../middlewares/middleware');
const adminController = require('../controllers/admin.controllers');
const { route } = require('../app');

router.get('/',(req,res)=>{
    res.status(200).json({
        msg:'Hola admin'
    })
});

router.get('/ciclo_for/:numero',adminController.ciclo_for);
router.post('/registro', [
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('apellido','El apellido es obligatorio').notEmpty(),
    check('usuario','El usuario es obligatorio').notEmpty(),
    check('correo','El correo es obligatorio').notEmpty(),
    check('password','El password es obligatorio').notEmpty(),
    check('tipo','El tipo es obligatorio').notEmpty(),
    check('imagen','El imagen es obligatorio').notEmpty(),
    validate
] ,adminController.registro);
router.post('/registroViajes', [
    check('nombre_agencia','El nombre de la agencia es obligatorio').notEmpty(),
    check('ciudad_origen','La ciudad de origen es obligatoria').notEmpty(),
    check('ciudad_destino','La ciudad de destino es obligatoria').notEmpty(),
    check('dias_vuelo','Los dias de vuelo son obligatorios').notEmpty(),
    check('precio_vuelo','El precio de vuelo es obligatorio').notEmpty(),
    validate
] ,adminController.registroViajes);
router.post('/registroAutos', [
    check('nombre_agencia','El nombre de la agencia es obligatorio').notEmpty(),
    check('marca','La marca es obligatoria').notEmpty(),
    check('placa','La placa es obligatoria').notEmpty(),
    check('modelo','El modelo es obligatorio').notEmpty(),
    check('precio','El precio es obligatorio').notEmpty(),
    check('ciudad','La ciudad es obligatoria').notEmpty(),
    validate
] ,adminController.registroAutos);

router.get('/usuarios',adminController.obtenerUsuarios);
router.get('/recepcionistas',adminController.obtenerRecepcionistas);
router.get('/viajes',adminController.obtenerViajes);
router.get('/autos',adminController.obtenerAutos);

router.post('/viajesEliminar',adminController.eliminarViaje);
router.post('/autosEliminar',adminController.eliminarAuto);
router.post('/usuariosEliminar',adminController.eliminarUsuario);
router.post('/recepcionistasEliminar',adminController.eliminarRecepcionista);
router.get('/historial',adminController.obtenerHistorial);
module.exports = router;