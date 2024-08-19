const modal2 = document.getElementById('confirmation-modal');
const closeModalButton2 = document.querySelector('.close-modal');
const confirmButton2 = document.getElementById('confirm-btn');
const cancelButton2 = document.getElementById('cancel-btn');

let agendaId;

const confirmDelete = () => {
  agendaId = document.getElementById('delete-agenda').getAttribute('agenda-id');

  modal2.style.display = 'block';
};

function closeModal() {
  modal2.style.display = 'none';
}

closeModalButton2.addEventListener('click', closeModal);

cancelButton2.addEventListener('click', closeModal);

confirmButton2.addEventListener('click', async () => {
  await fetch(`/api/v1/agendas/${agendaId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }).then((response) => {
    if (response.ok) {
      window.location.href = '/dashboard';
    } else {
      console.log('Falha ao excluir agenda');
    }
  });
  closeModal();
});
