const userStore = require('../../infraestructure/config/db/userStore');

module.exports = {
  findByEmail: userStore.findByEmail,
  create: userStore.create
};