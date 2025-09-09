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
  if (msg.message) {
    setTimeout(() => {
      window.location.href = '/views/home.html';
    }, 1500);
  }
};