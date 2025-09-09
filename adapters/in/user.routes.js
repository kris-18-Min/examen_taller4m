const express = require('express');
const router = express.Router();
const registerUser = require('../../infraestructure/use-cases/register-user.use');
const loginUser = require('../../infraestructure/use-cases/login-user.use');

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;