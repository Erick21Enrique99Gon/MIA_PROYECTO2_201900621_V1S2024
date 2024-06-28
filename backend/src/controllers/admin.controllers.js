const { insertData, findData } = require("../config/db.mongo");
const { uploadFile } = require("../config/bucket");
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
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



module.exports = {
    ciclo_for,
    registro,
    registroViajes,
    registroAutos
};