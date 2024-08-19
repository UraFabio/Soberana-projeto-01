const modal = document.getElementById('myModal');
const openModalButton = document.getElementById('add-agenda');
const closeModalButton = document.querySelector('.close');
const saveButton = document.getElementById('saveNote');
const cancelButton = document.getElementById('cancelNote');

openModalButton.addEventListener('click', function () {
  modal.style.display = 'block';
});

closeModalButton.addEventListener('click', function () {
  modal.style.display = 'none';
});

cancelButton.addEventListener('click', function () {
  modal.style.display = 'none';
});

saveButton.addEventListener('click', async function () {
  const title = document.getElementById('noteTitle').value;
  const description = document.getElementById('noteContent').value;
  const year = document.getElementById('noteYear').value;
  const month = document.getElementById('noteMonth').value;
  const day = document.getElementById('noteDay').value;

  if (title && year && month && day) {
    try {
      const response = await fetch('/api/v1/agendas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ title, description, year, month, day }),
      });

      console.log(response);
      if (!response.ok) {
        alert('Erro ao salvar agenda');
        return;
      }

      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Erro:', error);
    }

    modal.style.display = 'none';
  } else {
    alert('Por favor, preencha todos os campos.');
  }
});
