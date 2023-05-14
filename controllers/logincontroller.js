const User = require('../models/user');

async function login(email, password) {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            // El usuario no existe
            return { success: false, message: 'Credenciales inválidas' };
        }

        if (user.password !== password) {
            // La contraseña no coincide
            return { success: false, message: 'Credenciales inválidas' };
        }

        // Las credenciales son válidas
        return { success: true, message: 'Inicio de sesión exitoso', user };
    } catch (error) {
        // Ocurrió un error durante la búsqueda del usuario
        console.error('Error de inicio de sesión:', error);
        return { success: false, message: 'Error de inicio de sesión' };
    }
}

module.exports = { login };
