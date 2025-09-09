//validation.js
document.getElementById('registerForm').onsubmit = async function(e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(this));
  const res = await fetch('/api/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const msg = await res.json();
  document.getElementById('registerMsg').innerText = msg.message || msg.error;
};

document.getElementById('loginForm').onsubmit = async function(e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(this));
  const res = await fetch('/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const msg = await res.json();
  document.getElementById('loginMsg').innerText = msg.message || msg.error;
  if (msg.token) {
    localStorage.setItem('token', msg.token);
    window.location.href = '/'; // Redirige a home
  }
};