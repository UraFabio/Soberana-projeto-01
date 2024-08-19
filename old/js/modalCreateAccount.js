// Obter elementos
const modal = document.getElementById('account-modal');
const openModalBtn = document.getElementById('create-account');
const closeModalBtn = document.querySelector('.close');
const cancelBtn = document.getElementById('cancel-btn');
const saveBtn = document.getElementById('save-btn');

openModalBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

cancelBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

saveBtn.addEventListener('click', async (e) => {
  e.preventDefault();

  const name = document.getElementById('modal-name').value;
  const email = document.getElementById('modal-email').value;
  const password = document.getElementById('modal-password').value;

  try {
    const response = await fetch('/createAccount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      document.getElementById('error-message').textContent = errorData.message;
      return;
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    window.location.href = '/dashboard';
  } catch (error) {
    console.error('Erro:', error);
    document.getElementById('error-message').textContent =
      'Erro ao criar conta. Tente novamente.';
  }

  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
});
