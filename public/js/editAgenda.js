const editModal = document.getElementById('editModal');
const closeEditModalButton = document.querySelector('.close');
const cancelEditButton = document.getElementById('canceledit');
const saveButton2 = document.getElementById('saveedit');

let agendaId2;

const editAgenda = async (event, id) => {
  console.log(event);
  agendaId2 = id;
  console.log(agendaId2);

  try {
    const response = await fetch(`/api/v1/agendas/${agendaId2}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const result = await response.json();
    const oldAgenda = result.data;

    document.getElementById('editTitle').value = oldAgenda.title;
    document.getElementById('editContent').value = oldAgenda.description || '';
    document.getElementById('editYear').value = oldAgenda.year;
    document.getElementById('editMonth').value = oldAgenda.month;
    document.getElementById('editDay').value = oldAgenda.day;
  } catch (error) {}

  editModal.style.display = 'block';
};

// Função para fechar o modal
const closeEditModal = () => {
  editModal.style.display = 'none';
};

// Adicionando event listeners
closeEditModalButton.addEventListener('click', closeEditModal);
cancelEditButton.addEventListener('click', closeEditModal);

// Suponha que você tenha uma função para salvar as edições
saveButton2.addEventListener('click', async (event) => {
  event.preventDefault(); // Impede o comportamento padrão do formulário
  const updatedAgenda = {
    title: document.getElementById('editTitle').value,
    description: document.getElementById('editContent').value,
    year: document.getElementById('editYear').value,
    month: document.getElementById('editMonth').value,
    day: document.getElementById('editDay').value,
  };

  console.log('Dados atualizados:', updatedAgenda);

  try {
    const response = await fetch(`/api/v1/agendas/${agendaId2}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(updatedAgenda),
    });

    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      throw new Error('Erro ao atualizar agenda');
    }
  } catch (err) {
    console.log('erro: ' + err.message);
  }

  window.location.href = '/dashboard';

  closeEditModal();
});
