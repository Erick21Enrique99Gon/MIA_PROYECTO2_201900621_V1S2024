const aws = require('aws-sdk');
const { promisify } = require('util');
const dotenv = require('dotenv');
dotenv.config();

const {
    BUCKET_USER_ID,
    BUCKET_USER_SECRET,
    BUCKET_NAME,
    BUCKET_REGION
} = process.env;



const uploadFile = async (req,res) => {
    const s3 = new aws.S3({
        accessKeyId: BUCKET_USER_ID,
        secretAccessKey: BUCKET_USER_SECRET,
        region: BUCKET_REGION
    });
    const {path,imagen} = req.body;

    var contentype = imagen.substring(0,imagen.indexOf(';'));
    contentype = contentype.substring(contentype.indexOf('/')+1);
    var newpath = path+'.'+contentype;
    contentype = 'image/'+contentype;
    console.log(contentype);
    var imagenSub = imagen.substring(imagen.indexOf(',')+1);
    imagenSub = Buffer.from(imagenSub,'base64');
    const params = {
        Bucket: BUCKET_NAME,
        Key: newpath,
        Body: imagenSub,
        ContentType: contentype
    };

    const upload = promisify(s3.upload.bind(s3));

    try {
        const data = await upload(params);
        return data;
    } catch (error) {
        return error;
    }

};


module.exports = {
    uploadFile
};