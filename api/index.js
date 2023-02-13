const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/UserModel');
const cors = require('cors');
const bcrypt = require('bcryptjs')
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { token } = require('morgan');

// Load environment variables from .env file
require("dotenv").config();




const salt = bcrypt.genSaltSync(10);
const secret = 'motdepass'

app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());


// Connect to MongoDB using environment variables
mongoose.set("strictQuery", false);
try {
    mongoose.connect(`mongodb://${process.env.DB_URL}/${process.env.DB_NAME}`, {
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    if (process.env.DB_URL === undefined) {
        throw new Error("DB_URL is undefined");
    } else if (process.env.DB_NAME === undefined) {
        throw new Error("DB_NAME is undefined");
    }
} catch (e) {
    console.log(e);
}

app.post('/register', async (req, res) => {
    const {username, password} = req.body;
    try{
        const userDoc = await User.create({
            username,
            password:bcrypt.hashSync(password,salt)
        });
        res.json(userDoc);
    } catch(e) {
        // console.log(e);
        res.status(400).json(e)
    }
})

app.post('/login', async (req, res) => {
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
    // res.json(userDoc);

    // Compare le password de la request au password de la DB
    const passOk = bcrypt.compareSync(password, userDoc.password);
    
    if(passOk) {
        // logged in 
        jwt.sign({username, id:userDoc._id}, secret, {}, (err, token) => {
            if(err) throw err;
            // res.json(token);
            res.cookie('token', token).json({
                id:userDoc._id,
                username,
            });
        })
    } else {
        res.status(400).json('Compte inconnu')
    }
});

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if(err) throw err;
        res.json(info);
    });
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
})

app.listen(4000);