const token = localStorage.getItem('token');

const titleDiv = document.getElementById('page-title');
titleDiv.innerHTML = titleDiv.innerHTML.replace('${title}', 'AGENDAS');

let index = 0;
let page = 1;
let limit = 6;
let totalAgendas = 0;
let totalPages = 0;
let agendas = [];

async function fetchAgenda() {
  index = 0;
  page = 1;
  totalAgendas = 0;
  totalPages = 0;

  try {
    const response = await fetch('/api/v1/agendas', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar dados');
    }

    const data = await response.json();
    agendas = data.data;
    totalAgendas = data.results;
    totalPages = Math.ceil(totalAgendas / limit);

    const myDiv = document.getElementById('pagination');
    myDiv.innerHTML = myDiv.innerHTML.replace('${last page}', totalPages);

    loadContent(agendas);
  } catch (error) {
    console.error(error);
    setTimeout(() => {
      window.location.href = '/login';
    }, 2000);
  }
}

const loadContent = (data) => {
  document.getElementById('current-page').innerHTML = page;

  let text = '';
  console.log(data);

  for (let aux = index; aux < limit * page && aux < totalAgendas; aux++) {
    const createdAt = data[aux].created_at.split('T');
    const createdTime = createdAt[1].split(':');

    text += `
        <div id="agenda" class="agenda">
          <div class="agenda-buttons">
            <button id="delete-agenda" class="agenda-button delete" agenda-id="${data[aux].id}"><svg width="2rem" height="2rem" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"/></svg></button>
            <button id="edit-agenda" class="agenda-button edit" agenda-id="${data[aux].id}"><svg width="2rem" height="2rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40974 4.40973 4.7157 4.21799 5.09202C4 5.51985 4 6.0799 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.0799 20 7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V12.5M15.5 5.5L18.3284 8.32843M10.7627 10.2373L17.411 3.58902C18.192 2.80797 19.4584 2.80797 20.2394 3.58902C21.0205 4.37007 21.0205 5.6364 20.2394 6.41745L13.3774 13.2794C12.6158 14.0411 12.235 14.4219 11.8012 14.7247C11.4162 14.9936 11.0009 15.2162 10.564 15.3882C10.0717 15.582 9.54378 15.6885 8.48793 15.9016L8 16L8.04745 15.6678C8.21536 14.4925 8.29932 13.9048 8.49029 13.3561C8.65975 12.8692 8.89125 12.4063 9.17906 11.9786C9.50341 11.4966 9.92319 11.0768 10.7627 10.2373Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <div id="agenda-content" class="agenda-content">
            <div id="agenda-header" class="agenda-header">
              <div id="title" class="title">${data[aux].title}</div>
              <div id="date" class="date">Agenda para a data ${data[aux].year}-${data[aux].month}-${data[aux].day}</div>
            </div>

            <div id="description" class="description">${data[aux].description}</div>

            <div id="agenda-footer" class="agenda-footer">Criado na data ${createdAt[0]} às ${createdTime[0]}:${createdTime[1]}</div>
          </div>
        </div>
        `;
  }
  document.getElementById('content').innerHTML = text;
};

document.getElementById('agendas').addEventListener('click', async (e) => {
  fetchAgenda();
});

document.getElementById('pagination').addEventListener('click', function (e) {
  if (e.target.closest('#previous-page')) {
    if (page > 1) {
      index -= limit;
      page--;
      loadContent(agendas);
      // console.log('Botão previous-page clicado');
    }
  } else if (e.target.closest('#next-page')) {
    if (page < totalPages) {
      index += limit;
      page++;
      loadContent(agendas);
      // console.log('Botão next-page clicado');
    }
  }
});

document.addEventListener('DOMContentLoaded', function () {
  fetchAgenda();
});
