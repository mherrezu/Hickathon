const express = require('express');
const router = express.Router();
const { login } = require('../controllers/logincontroller');

// Ruta de inicio de sesión
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    const result = await login(email, password);

    if (result.success) {
        // Inicio de sesión exitoso
        res.status(200).json({ success: true, message: result.message, user: result.user });
    } else {
        // Inicio de sesión fallido
        res.status(401).json({ success: false, message: result.message });
    }
});

module.exports = router;