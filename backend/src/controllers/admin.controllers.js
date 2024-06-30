const { insertData, findData , getFullCollection , deleteData,dropTable} = require("../config/db.mongo");
const { uploadFile,deleteFile } = require("../config/bucket");
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const { options, path } = require("../app");
dotenv.config();


const ciclo_for = async (req,res)=>{
    const {numero}=req.params;
    let respuesta = '';
    for(let i = 0;i<numero;i++){
        respuesta += `Iteracion ${i}\n`;
    }
    res.status(200).json({
        msg: respuesta
    });
};

const registro = async (req,res)=>{
    const {nombre,apellido,usuario,correo,password,tipo,imagen}=req.body;
    
    console.log(nombre,apellido,usuario,correo,password,tipo);

    const path = `usuarios/${usuario}`;

    const user = await findData('Usuarios',{usuario});

    console.log(user);
    if (user.length > 0){
        return res.status(500).json({
            status: false,
            msg: "Usuario ya existe",
            data: user
        });
    }

    const result_bucket = await uploadFile({body:{path,imagen}});

    console.log(result_bucket);

    console.log("result bucket",result_bucket); 

    if(result_bucket instanceof Error){
        return res.status(500).json({
            status: false,
            msg: "Error",
            data: result_bucket
        });
    }

    const salt = bcrypt.genSaltSync(10);

    const password_encrypted = await bcrypt.hash(password,salt);
    console.log(bcrypt.compareSync(password, password_encrypted));
    
    const result= await insertData('Usuarios',{
        nombre,
        apellido,
        usuario,
        correo,
        password_encrypted,
        tipo,
        imagen: result_bucket.Location
    });

    if(result instanceof Error){
        const result_delte = await deleteFile({body:{path: result_bucket.Key}});
        console.log("result delete bucket",result_delte);
        return res.status(500).json({
            status: false,
            msg: "Error",
            data: result
        });
    }

    

    res.status(200).json({
        status : true,
        msg: "Usuario registrado exitosamente",
        data: result
    });
};

const registroViajes = async (req,res)=>{
    const {nombre_agencia,ciudad_origen,ciudad_destino,dias_vuelo,precio_vuelo}=req.body;
    console.log(req.body);
    console.log(nombre_agencia,ciudad_origen,ciudad_destino,dias_vuelo,precio_vuelo);

    const viaje = await findData('Viajes',{nombre_agencia,ciudad_origen,ciudad_destino,dias_vuelo,precio_vuelo});

    if (viaje.length > 0){
        return res.status(500).json({
            status: false,
            msg: "Viaje ya existe",
            data: viaje
        });
    }

    const result= await insertData('Viajes',{
        nombre_agencia,
        ciudad_origen,
        ciudad_destino,
        dias_vuelo,
        precio_vuelo
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
        msg: "Viaje registrado exitosamente"
    });
};

const registroAutos = async (req,res)=>{
    const {nombre_agencia,marca,placa,modelo,precio,ciudad}=req.body;
    console.log(req.body);
    console.log(nombre_agencia,marca,placa,modelo,precio,ciudad);

    const auto = await findData('Autos',{nombre_agencia,marca,placa,modelo,precio,ciudad});

    if (auto.length > 0){
        return res.status(500).json({
            status: false,
            msg: "Auto ya existe",
            data: auto
        });
    }

    const result= await insertData('Autos',{
        nombre_agencia,
        marca,
        placa,
        modelo,
        precio,
        ciudad
    });

    if(result instanceof Error){
        return res.status(500).json({
            status: false,
            msg: "Error",
            data: result
        });
    }

    res.status(200).json({
        status : true,
        msg: "Auto registrado exitosamente",
    });
};

const obtenerUsuarios = async (req,res)=>{
    const Options = {
        projection: {
            _id: 0,
            nombre: 1,
            apellido: 1,
            usuario: 1,
            correo: 1,
            password_encrypted: 1,
            tipo:1,
            imagen: 1
        }
    };
    const usuarios = await getFullCollection('Usuarios',{tipo:'usuario'},Options);

    if(usuarios.length === 0){
        return res.status(500).json({
            status: false,
            msg: "No hay usuarios registrados"
        });
    }

    res.status(200).json({
        status: true,
        data: usuarios
    });
};

const obtenerRecepcionistas = async (req,res)=>{
    const Options = {
        projection: {
            _id: 0,
            nombre: 1,
            apellido: 1,
            usuario: 1,
            correo: 1,
            password_encrypted: 1,
            tipo:1,
            imagen: 1
        }
    };
    const usuarios = await getFullCollection('Usuarios',{tipo:'recepcionista'},Options);
    if(usuarios.length === 0){
        return res.status(500).json({
            status: false,
            msg: "No hay recepcionistas registrados"
        });
    }
    res.status(200).json({
        status: true,
        data: usuarios
    });
}

const obtenerViajes = async (req,res)=>{
    const Options = {
        projection: {
            _id: 0,
            nombre_agencia: 1,
            ciudad_origen: 1,
            ciudad_destino: 1,
            dias_vuelo: 1,
            precio_vuelo: 1
        }
    };
    const viajes = await getFullCollection('Viajes',{},Options);
    if(viajes.length === 0){
        return res.status(500).json({
            status: false,
            msg: "No hay viajes registrados"
        });
    }
    res.status(200).json({
        status: true,
        data: viajes
    });
}

const obtenerAutos = async (req,res)=>{
    const Options = {
        projection: {
            _id: 0,
            nombre_agencia: 1,
            marca: 1,
            placa: 1,
            modelo: 1,
            precio: 1,
            ciudad: 1
        }
    };
    const autos = await getFullCollection('Autos',{},Options);
    if(autos.length === 0){
        return res.status(500).json({
            status: false,
            msg: "No hay autos registrados"
        });
    }
    res.status(200).json({
        status: true,
        data: autos
    });
}

const eliminarViaje = async (req,res)=>{
    console.log("req.body",req.body);
    const {nombre_agencia,ciudad_origen,ciudad_destino,dias_vuelo,precio_vuelo}=req.body;
    const result = await deleteData('Viajes',{nombre_agencia,ciudad_origen,ciudad_destino,dias_vuelo,precio_vuelo});
    if(result instanceof Error){
        return res.status(500).json({
            status: false,
            msg: "Error",
            data: result
        });
    }
    res.status(200).json({
        status: true,
        msg: "Viaje eliminado exitosamente"
    });
}

const eliminarAuto = async (req,res)=>{
    console.log("req.body",req.body);
    const {nombre_agencia,marca,placa,modelo,precio,ciudad}=req.body;
    const result = await deleteData('Autos',{nombre_agencia,marca,placa,modelo,precio,ciudad});
    if(result instanceof Error){
        return res.status(500).json({
            status: false,
            msg: "Error",
            data: result
        });
    }
    res.status(200).json({
        status: true,
        msg: "Auto eliminado exitosamente"
    });
}

const eliminarUsuario = async(req,res)=>{
    console.log("req.body",req.body);
    const {nombre,apellido,usuario,correo,password_encrypted,tipo,imagen}=req.body;
    const result = await deleteData('Usuarios',{nombre,apellido,usuario,correo,password_encrypted,tipo,imagen});
    var path = `usuarios/${usuario}`;
    result_bucket = await deleteFile({body:{path}}); //{body:{path: result_bucket.Key}}

    result_Table = await dropTable(usuario+'ViajesUsuarios');
    if(result instanceof Error){
        return res.status(500).json({
            status: false,
            msg: "Error",
            data: result
        });
    }
    res.status(200).json({
        status: true,
        msg: "Usuario eliminado exitosamente"
    });
}

const eliminarRecepcionista = async(req,res)=>{
    console.log("req.body",req.body);
    const {nombre,apellido,usuario,correo,password_encrypted,tipo,imagen}=req.body;
    const result = await deleteData('Usuarios',{nombre,apellido,usuario,correo,password_encrypted,tipo,imagen});
    var path = `usuarios/${usuario}`;
    result_bucket = await deleteFile({body:{path}}); 
    if(result instanceof Error){
        return res.status(500).json({
            status: false,
            msg: "Error",
            data: result
        });
    }
    res.status(200).json({
        status: true,
        msg: "Recepcionista eliminado exitosamente"
    });
}

module.exports = {
    ciclo_for,
    registro,
    registroViajes,
    registroAutos,
    obtenerUsuarios,
    obtenerRecepcionistas,
    obtenerViajes,
    obtenerAutos,
    eliminarViaje,
    eliminarAuto,
    eliminarUsuario,
    eliminarRecepcionista
};