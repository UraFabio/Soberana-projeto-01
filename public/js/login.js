document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      document.getElementById('error-message').textContent = errorData.message;
      return;
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);

    await fetch('/auth/authenticate', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((response) => {
      if (response.ok) {
        window.location.href = '/dashboard';
      } else {
        document.getElementById('error-message').textContent =
          'Falha ao autenticar';
        return;
      }
    });
  } catch (error) {
    console.error('Erro:', error);
    document.getElementById('error-message').textContent =
      'Erro ao fazer login. Tente novamente.';
  }
});
