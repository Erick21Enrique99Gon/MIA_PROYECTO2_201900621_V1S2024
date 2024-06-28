const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const admin_routes = require('./routes/admin.routes');
const usuario_routes = require('./routes/usuario.routes');
const recepcion_routes = require('./routes/recepcion.routes');
const login_routes = require('./routes/login.routes');
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb' ,extended:true}));

app.get('/',(req,res)=>{
    res.status(200).json({mensaje:'Hola mundo'});
})

app.use('/login',login_routes);
app.use('/admin',admin_routes);
app.use('/usuario',usuario_routes);
app.use('/recepcion',recepcion_routes);
module.exports = app;