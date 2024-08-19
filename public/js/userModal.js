document.addEventListener('DOMContentLoaded', () => {
  const userModal = document.getElementById('user-modal');
  const closeModalButton = document.querySelector('.close-modal');
  const createUserButton = document.getElementById('create-user');
  const deleteUserButton = document.getElementById('delete-user');
  const myAccount = document.getElementById('myAccount');

  // Função para abrir o modal
  const openModal = async () => {
    //const response = await fetch('/');
    // if (userData) {
    //   document.getElementById('userId').value = userData.id || '';
    //   document.getElementById('userName').value = userData.name || '';
    //   document.getElementById('userEmail').value = userData.email || '';
    //   document.getElementById('userPassword').value = '';
    // }
    userModal.style.display = 'block';
    console.log('lol');
  };

  const closeModal = async () => {
    userModal.style.display = 'none';
  };

  const createUser = async () => {
    const userData = {
      name: document.getElementById('userName').value,
      email: document.getElementById('userEmail').value,
      password: document.getElementById('userPassword').value,
    };

    try {
      const response = await fetch('/user/createAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      console.log('usuario criado com sucesso');
    } catch (err) {
      console.log(err.message);
    }

    console.log('Criar usuário:', userData);
    closeModal();
  };

  const deleteUser = async () => {
    try {
      const response = await fetch('/user/deleteAccount', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      console.log('usuario excluido com sucesso');
    } catch (err) {
      console.log(err.message);
    }

    localStorage.removeItem('token');
    window.location.href = '/login';
    closeModal();
  };

  closeModalButton.addEventListener('click', closeModal);
  createUserButton.addEventListener('click', createUser);
  deleteUserButton.addEventListener('click', deleteUser);
  myAccount.addEventListener('click', openModal);

  // Exemplo de abertura do modal com dados do usuário
  // openModal({ id: 1, name: 'John Doe', email: 'john.doe@example.com' });
});
