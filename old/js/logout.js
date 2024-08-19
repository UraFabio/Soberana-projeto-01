document.getElementById('logout').addEventListener('click', async (e) => {
  localStorage.clear();
  window.location.href = '/';
});
