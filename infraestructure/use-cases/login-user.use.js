const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../domain/models/user.model');

module.exports = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Datos incompletos.' });

  const usuario = await User.findByEmail(email);
  if (!usuario) return res.status(400).json({ error: 'Usuario o contraseña incorrectos.' });

  const validPass = await bcrypt.compare(password, usuario.password);
  if (!validPass) return res.status(400).json({ error: 'Usuario o contraseña incorrectos.' });

  const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ message: 'Login exitoso', token });
};