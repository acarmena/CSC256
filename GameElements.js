const form = document.querySelector('#player-form');
const card = document.querySelector('#player-card');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const name = data.get('username').trim();
  const health = Number(data.get('health'));
  const initials = name.split(/\s+/).map(word => word[0]).join('').slice(0, 2).toUpperCase();

  document.querySelector('#out-name').textContent = name;
  document.querySelector('#out-weapon').textContent = data.get('weapon');
  document.querySelector('#out-health').textContent = health;
  document.querySelector('#out-points').textContent = Number(data.get('points')).toLocaleString();
  document.querySelector('#avatar').textContent = initials;
  document.querySelector('#health-meter').style.width = `${health}%`;
  document.querySelector('#card-number').textContent = `#${String(Date.now()).slice(-6)}`;

  card.hidden = false;
  card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});
