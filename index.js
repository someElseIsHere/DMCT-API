require('dotenv').config();
const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');

const mClient = new MongoClient(process.env.DATABASE_URI,{
    serverApi : {
        version : ServerApiVersion.v1,
        strict : true,
        deprecationErrors : true
    }
});

mClient.connect();
const database = mClient.db('skinsDatabase');
const collection = database.collection('skins');
module.exports = { collection };

app.use(express.json());

const skinsRouter = require('./routes/skins');
app.use('/skins', skinsRouter);

app.listen(3000, () => console.log('Server Started'));
