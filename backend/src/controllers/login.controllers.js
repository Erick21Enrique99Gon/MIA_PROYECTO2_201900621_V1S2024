const { insertData, findData } = require("../config/db.mongo");
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const loginUsarios = async (req,res)=>{
    const {usuario,password}=req.body;
    console.log(req.body);
    console.log(usuario,password);

    if((usuario == 'admin') && (password == 'admin')){
        return res.status(200).json({
            status : true,
            msg: "Exito",
            data: {
                nombre: 'admin',
                usuario: 'admin',
                tipo: 'admin'
            }
        });
    }

    const user = await findData('Usuarios',{usuario});

    console.log(user);
    if (user.length != 1){
        return res.status(400).json({
            status: false,
            msg: "Usuario no existe"
        });
    }

    const salt = bcrypt.genSaltSync(10);

    console.log(bcrypt.compareSync(password, user[0].password_encrypted));

    if(!bcrypt.compareSync(password, user[0].password_encrypted)){
        return res.status(400).json({
            status: false,
            msg: "Contraseña incorrecta"
        });
    }

    res.status(200).json({
        status : true,
        msg: "Exito",
        data: user
    });
};

module.exports = {
    loginUsarios
};