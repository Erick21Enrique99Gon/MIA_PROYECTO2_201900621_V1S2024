const {Router} = require('express');
const router = Router();
const {check} = require('express-validator');
const validate = require('../middlewares/middleware');
const recepcionController = require('../controllers/recepcion.controllers');
const { route } = require('./admin.routes');

router.get('/',(req,res)=>{
    res.status(200).json({
        msg:'Hola recepcion'
    })
});

router.get('/reservas',recepcionController.obtenerReservas);
router.post('/aceptar',recepcionController.aceptarReserva);
router.post('/rechazar',recepcionController.rechazarReserva);

module.exports = router;