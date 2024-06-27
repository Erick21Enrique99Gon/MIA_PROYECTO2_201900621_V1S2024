const {Router} = require('express');
const router = Router();
const {check} = require('express-validator');
const validate = require('../middlewares/middleware');
const recepcionController = require('../controllers/recepcion.controllers');

router.get('/',(req,res)=>{
    res.status(200).json({
        msg:'Hola recepcion'
    })
});



module.exports = router;