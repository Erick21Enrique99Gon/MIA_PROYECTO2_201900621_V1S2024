const aws = require('aws-sdk');
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
    const {path,image} = req.body;
    const buffer = new Buffer.from(path,'base64');
    const params = {
        Bucket: BUCKET_NAME,
        Key: path,
        Body: image,
        ACL: 'public-read',
    };
    s3.upload(params,(error,data) => {
        if(error){
            console.error(error);
            return res.status(500
            ).send('Error al subir la imagen');
        }
        console.log(data);
        return res.status(200).send('Imagen subida correctamente');
    }
    );
};

module.exports = {
    uploadFile
};