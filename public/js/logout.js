document.getElementById('logout').addEventListener('click', () => {
  localStorage.clear('token');
  window.location.reload();
});
