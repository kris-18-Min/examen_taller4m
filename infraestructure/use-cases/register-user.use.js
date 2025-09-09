const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('../../domain/models/user.model.js');

module.exports = async (req, res) => {
  try {
    console.log('Datos recibidos:', req.body); // <-- Agrega este log

    const { nombre, email, password, telefono } = req.body;
    if (!nombre || !email || !password || !telefono) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const existe = await User.findByEmail(email);
    if (existe) {
      return res.status(400).json({ error: 'El correo ya está registrado.' });
    }

    const hash = await bcrypt.hash(password, 10);
    await User.create({ nombre, email, password: hash, telefono });

    // Enviar correo de bienvenida
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Soporte" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '¡Bienvenido!',
      text: `Hola ${nombre}, tu registro fue exitoso.`
    });

    res.status(201).json({ message: 'Usuario registrado correctamente.' });
  } catch (err) {
    console.error('Error en registro:', err); // <-- Agrega este log
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};