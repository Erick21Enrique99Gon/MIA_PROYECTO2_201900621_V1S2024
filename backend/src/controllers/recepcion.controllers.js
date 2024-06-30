const { insertData, findData , getFullCollection , deleteData,dropTable,updateData} = require("../config/db.mongo");
const { uploadFile,deleteFile } = require("../config/bucket");
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const { options, path } = require("../app");
dotenv.config();

const obtenerReservas = async(req,res)=>{
    const Options = {
        projection: {
            _id: 0,
            // nombre: 1,
            // apellido: 1,
            usuario: 1
            // ,
            // correo: 1,
            // password_encrypted: 1,
            // tipo:1,
            // imagen: 1
        }
    };
    const usuarios = await getFullCollection('Usuarios',{tipo:'usuario'},Options);

    if(usuarios.length === 0){
        return res.status(500).json({
            status: false,
            msg: "No hay usuarios registrados"
        });
    }

    reservas=[];

    for(let usuario of usuarios){
        const OptionsViaje = {
            projection: {
                _id: 0,
                nombre_agencia: 1,
                ciudad_origen: 1,
                ciudad_destino: 1,
                dias_vuelo: 1,
                precio_vuelo: 1,
                estado: 1
            }
        };
        const collectionViaje = usuario.usuario+'ViajesUsuarios';
        const usuarioViajes =  await getFullCollection(collectionViaje,{},OptionsViaje);
        if(usuarioViajes instanceof Error){
            return res.status(500).json({
                status: false,
                msg: "Error",
                data: usuarioViajes
            });
        }
        const OptionsAuto = {
            projection: {
                _id: 0,
                nombre_agencia: 1,
                marca: 1,
                placa: 1,
                modelo: 1,
                precio: 1,
                estado: 1
            }
        };
        const collectionAuto = usuario.usuario+'AutosUsuarios';
        const usuarioAutos =  await getFullCollection(collectionAuto,{},OptionsAuto);
        if(usuarioAutos instanceof Error){
            return res.status(500).json({
                status: false,
                msg: "Error",
                data: usuarioAutos
            });
        }
        reservas.push({
            usuario: usuario.usuario,
            usuarioViajes,
            usuarioAutos
        });
    }
    res.status(200).json({
        status: true,
        data: reservas
    });
}

const aceptarReserva = async(req,res)=>{
    const {usuario, tipo} = req.body;
    const collection = usuario+tipo+'Usuarios';

    if(tipo === 'Viajes'){
        console.log(req.body);
        const {nombre_agencia,ciudad_origen,ciudad_destino,dias_vuelo,precio_vuelo}=req.body.aceptando;
        
        const updateDocument = {
            $set: {
                estado : "Aprobado",
            },
        };
        console.log(collection,{nombre_agencia,ciudad_origen,ciudad_destino,dias_vuelo,precio_vuelo},updateDocument);
        const result = await updateData(collection,{nombre_agencia,ciudad_origen,ciudad_destino,dias_vuelo,precio_vuelo},updateDocument);
        console.log(result);
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
    }else{
        const {nombre_agencia,marca,modelo,precio}=req.body.aceptando;

        const updateDocument = {
            $set: {
                estado : "Aprobado",
            },
        };

        const result = await updateData(collection,{nombre_agencia,marca,modelo,precio},updateDocument);

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
    }
}

const rechazarReserva = async(req,res)=>{
    const {usuario, tipo} = req.body;
    const collection = usuario+tipo+'Usuarios';

    if(tipo === 'Viajes'){
        console.log(req.body);
        const {nombre_agencia,ciudad_origen,ciudad_destino,dias_vuelo,precio_vuelo}=req.body.aceptando;
        
        const updateDocument = {
            $set: {
                estado : "Rechazado",
            },
        };
        console.log(collection,{nombre_agencia,ciudad_origen,ciudad_destino,dias_vuelo,precio_vuelo},updateDocument);
        const result = await updateData(collection,{nombre_agencia,ciudad_origen,ciudad_destino,dias_vuelo,precio_vuelo},updateDocument);
        console.log(result);
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
    }else{
        const {nombre_agencia,marca,modelo,precio}=req.body.aceptando;

        const updateDocument = {
            $set: {
                estado : "Rechazado",
            },
        };

        const result = await updateData(collection,{nombre_agencia,marca,modelo,precio},updateDocument);

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
    }
}

module.exports = {
    obtenerReservas,
    aceptarReserva,
    rechazarReserva
};