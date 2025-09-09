require('dotenv').config();
const express = require('express');
const path = require('path');
const userRoutes = require('./adapters/in/user.routes.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/public', express.static(path.join(__dirname, 'ui/public')));
app.use('/views', express.static(path.join(__dirname, 'ui/views')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'ui/views/login.html'));
});

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));