const { insertData, findData } = require("../config/db.mongo");
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const registroViajes = async (req,res)=>{
    const {usuario,nombre_agencia,ciudad_origen,ciudad_destino,dias_vuelo,precio_vuelo}=req.body;
    console.log(req.body);
    const estado = false;
    console.log(usuario,nombre_agencia,ciudad_origen,ciudad_destino,dias_vuelo,precio_vuelo);

    const collection = usuario+'ViajesUsuarios';

    const result= await insertData(collection,{
        nombre_agencia,
        ciudad_origen,
        ciudad_destino,
        dias_vuelo,
        precio_vuelo,
        estado
    });

    if(result instanceof Error){
        return res.status(500).json({
            status: false,
            msg: "Error",
            data: result
        });
    }

    res.status(200).json({
        status: true,
        msg: "Viaje reservado con exito",
        data: result
    });
};

const registroAutos = async (req,res)=>{
    const {usuario,nombre_agencia,marca,modelo,precio}=req.body;
    console.log(req.body);
    estado = false;
    console.log(usuario,nombre_agencia,marca,modelo,precio);

    const collection =usuario+ 'AutosUsuarios';

    const result= await insertData(collection,{
        nombre_agencia,
        marca,
        modelo,
        precio,
        estado
    });

    if(result instanceof Error){
        return res.status(500).json({
            status: false,
            msg: "Error",
            data: result
        });
    }

    res.status(200).json({
        status: true,
        msg: "Auto reservado con exito",
        data: result
    });
};

module.exports = {
    registroViajes,
    registroAutos
};