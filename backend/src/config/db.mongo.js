const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const { 
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_HOST,
    MONGO_PORT,
    MONGO_DATABASE
} = process.env;

const uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}`;

const insertData = async (collection,data) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const database = client.db(MONGO_DATABASE);
        const col = database.collection(collection);
        const result = await col.insertOne(data);
        return result;
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
};

const findData = async (collection,query) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const database = client.db(MONGO_DATABASE);
        const col = database.collection(collection);
        const result = await col.find(query).toArray();
        return result;
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

const getFullCollection = async (collection,query,options) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const database = client.db(MONGO_DATABASE);
        const col = database.collection(collection);
        const result = await col.find(query,options).toArray();
        return result;
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}
const deleteData = async (collection,query)=>{
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const database = client.db(MONGO_DATABASE);
        const col = database.collection(collection);
        const result = await col.deleteOne(query);
        return result;
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

const dropTable = async (collection) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const database = client.db(MONGO_DATABASE);
        const col = database.collection(collection);
        const result = await col.drop();
        return result;
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

const updateData = async (collection,query,newData) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const database = client.db(MONGO_DATABASE);
        const col = database.collection(collection);
        const result = await col.updateOne(query,newData);
        return result;
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

module.exports = {
    insertData,
    findData,
    getFullCollection,
    deleteData,
    dropTable,
    updateData
};