const sideMenu = document.getElementById('side-menu');
const menuToggle = document.getElementById('menu-toggle');

// Alternar visibilidade do menu ao clicar no botão de alternância
menuToggle.addEventListener('click', () => {
  sideMenu.classList.toggle('active');
});

// Fechar o menu ao clicar fora dele, mas não no botão de alternância
window.addEventListener('click', (event) => {
  if (!sideMenu.contains(event.target) && !menuToggle.contains(event.target)) {
    sideMenu.classList.remove('active');
  }
});
