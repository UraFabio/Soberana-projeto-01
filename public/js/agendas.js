const titleDiv = document.getElementById('page-title');
titleDiv.innerHTML = titleDiv.innerHTML.replace('${title}', 'AGENDAS');

let index = 0;
let limit = 6;
let currentPage = 1;
let totalAgendas = 0;
let totalPages = 0;
let agendas = [];

const state = {
  orderBy: 'created_at',
  order: 'asc',
};

const fetchData = async () => {
  document.getElementById('loader').style.display = 'block';
  try {
    const response = await fetch('/api/v1/agendas', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar agendas');
    }

    const result = await response.json();
    totalAgendas = result.results;
    totalPages = Math.ceil(totalAgendas / limit);
    agendas = result.data;
    const myDiv = document.getElementById('pagination');
    myDiv.innerHTML = myDiv.innerHTML.replace('${last page}', totalPages);
  } catch (err) {
    console.log(err.message);
  }
};

const loadAgendas = () => {
  document.getElementById('loader').style.display = 'block';
  document.getElementById('current-page').innerHTML = currentPage;

  let content = '';
  for (
    let aux = index;
    aux < limit * currentPage && aux < totalAgendas;
    aux++
  ) {
    const createdAt = agendas[aux].created_at.split('T');
    const createdTime = createdAt[1].split(':');

    content += `
    <div id="agenda" class="agenda">
      <div id="agenda-content" class="agenda-content">
        <div id="agenda-header" class="agenda-header">
          <div id="agenda-id" style="display:none;">${agendas[aux].id}</div>
          <div id="title" class="title">${agendas[aux].title}</div>
          <div id="date" class="date">Agenda para ${agendas[aux].year}-${agendas[aux].month}-${agendas[aux].day}</div>
        </div>

        <div id="description" class="description">${agendas[aux].description}</div>

        <div id="agenda-footer" class="agenda-footer">Criado em ${createdAt[0]} às ${createdTime[0]}:${createdTime[1]}</div>
      </div>

      <div class="agenda-buttons">
        <button id="delete-agenda" class="agenda-button delete" agenda-id="${agendas[aux].id}" title="excluir agenda" onclick="confirmDelete(this, ${agendas[aux].id})">
          <svg width="76px" height="76px" viewBox="-102.4 -102.4 1228.80 1228.80" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000000" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="2.048"></g><g id="SVGRepo_iconCarrier"><path fill="#000000" d="M352 192V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64H96a32 32 0 0 1 0-64h256zm64 0h192v-64H416v64zM192 960a32 32 0 0 1-32-32V256h704v672a32 32 0 0 1-32 32H192zm224-192a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32zm192 0a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32z"></path></g></svg>
        </button>
        <button id="edit-agenda" class="agenda-button edit" agenda-id="${agendas[aux].id}" title="editar agenda" onclick="editAgenda(this, ${agendas[aux].id})">
          <svg width="2rem" height="2rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40974 4.40973 4.7157 4.21799 5.09202C4 5.51985 4 6.0799 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.0799 20 7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V12.5M15.5 5.5L18.3284 8.32843M10.7627 10.2373L17.411 3.58902C18.192 2.80797 19.4584 2.80797 20.2394 3.58902C21.0205 4.37007 21.0205 5.6364 20.2394 6.41745L13.3774 13.2794C12.6158 14.0411 12.235 14.4219 11.8012 14.7247C11.4162 14.9936 11.0009 15.2162 10.564 15.3882C10.0717 15.582 9.54378 15.6885 8.48793 15.9016L8 16L8.04745 15.6678C8.21536 14.4925 8.29932 13.9048 8.49029 13.3561C8.65975 12.8692 8.89125 12.4063 9.17906 11.9786C9.50341 11.4966 9.92319 11.0768 10.7627 10.2373Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
    `;
  }
  setTimeout(() => {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('content').innerHTML = content;
  }, 2000);
};

document.addEventListener('DOMContentLoaded', async () => {
  console.log('data');
  await fetchData();
  loadAgendas();
});

document.getElementById('pagination').addEventListener('click', function (e) {
  if (e.target.closest('#previous-page')) {
    if (currentPage > 1) {
      index -= limit;
      currentPage--;
      loadAgendas(agendas);
    }
  } else if (e.target.closest('#next-page')) {
    if (currentPage < totalPages) {
      index += limit;
      currentPage++;
      loadAgendas(agendas);
    }
  }
});

function sortList(property, order) {
  agendas = [...agendas].sort((a, b) => {
    if (property === 'created_at') {
      const dateA = new Date(a[property]);
      const dateB = new Date(b[property]);
      return order === 'asc' ? dateA - dateB : dateB - dateA;
    } else {
      return order === 'asc'
        ? a[property] - b[property]
        : b[property] - a[property];
    }
  });
  loadAgendas();
}

function toggleSort(property) {
  state.orderBy = property;
  state.order = state.order === 'asc' ? 'desc' : 'asc';
  sortList(state.orderBy, state.order);
}

document
  .getElementById('toggle-created-at')
  .addEventListener('click', () => toggleSort('created_at'));
document
  .getElementById('toggle-year')
  .addEventListener('click', () => toggleSort('year'));
document
  .getElementById('toggle-month')
  .addEventListener('click', () => toggleSort('month'));
document
  .getElementById('toggle-day')
  .addEventListener('click', () => toggleSort('day'));
