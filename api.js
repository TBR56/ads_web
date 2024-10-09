// backend/routes/api.js
const express = require('express');
const User = require('../models/User');
const Ad = require('../models/Ad');
const bcrypt = require('bcrypt');
const router = express.Router();

// Registro de usuarios
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).send('Usuario registrado');
});

// Inicio de sesión
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
        res.json({ balance: user.balance });
    } else {
        res.status(401).send('Credenciales incorrectas');
    }
});

// Cargar anuncios
router.get('/ads', async (req, res) => {
    const ads = await Ad.find();
    res.json(ads);
});

// Registrar vista de anuncio
router.post('/ad/view/:id', async (req, res) => {
    const adId = req.params.id;
    await Ad.findByIdAndUpdate(adId, { $inc: { views: 1 } });
    res.send('Vista registrada');
});

module.exports = router;
