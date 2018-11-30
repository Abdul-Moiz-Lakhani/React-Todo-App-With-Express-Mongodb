const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://amlakhani:' + process.env.MONGO_ATLAS_PW + '@test-cluster-shard-00-00-q1wsd.mongodb.net:27017,test-cluster-shard-00-01-q1wsd.mongodb.net:27017,test-cluster-shard-00-02-q1wsd.mongodb.net:27017/test?ssl=true&replicaSet=test-cluster-shard-0&authSource=admin&retryWrites=true', {
    useNewUrlParser: true
})

const registerRoute = require('./routes/registerRoute');
const signinRoute = require('./routes/signinRoute');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/register', registerRoute);
app.use('/signin', signinRoute);

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods',
        'PUT, POST, GET, PATCH, DELETE')
        return res.status(200).json({});
    }
    next();
});

app.use((req, res, next)=>{
    const error = new Error('Page Not Found!');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({ error: { message: error.message } });
});

module.exports = app;
