const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'users.json');

function readUsers() {
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function writeUsers(users) {
  fs.writeFileSync(file, JSON.stringify(users, null, 2));
}

module.exports = {
  getAll: readUsers,
  findByEmail: (email) => readUsers().find(u => u.email === email),
  create: (user) => {
    const users = readUsers();
    users.push(user);
    writeUsers(users);
    return user;
  }
};