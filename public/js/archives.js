function downloadFile(filePath) {
  // Crie um link temporário para o arquivo
  const link = document.createElement('a');
  link.href = filePath;
  link.download = filePath.split('/').pop(); // Define o nome do arquivo com base no caminho

  // Simule um clique no link para iniciar o download
  document.body.appendChild(link);
  link.click();

  // Remova o link do DOM após o clique
  document.body.removeChild(link);
}

document.addEventListener('DOMContentLoaded', () => {
  const archivesElement = document.getElementById('archives');

  if (archivesElement) {
    archivesElement.addEventListener('click', async () => {
      let archives = [];
      try {
        const response = await fetch('/upload/archives', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Falha ao buscar arquivos');
        }

        const data = await response.json();
        archives = data.data;
      } catch (err) {
        console.log(err.message);
      }

      let content = '';
      for (let i = 0; i < archives.length; i++) {
        content += `
          <div class="file-card">
            <p class="file-path">${archives[i].path}</p>
            <button class="download-button" onclick="downloadFile('${archives[i].path}')">Baixar</button>
          </div>
        `;
      }

      document.getElementById('main-content').innerHTML =
        `
        <div class="teste">
          <div id="menu-toggle-archives" class="menu-toggle-archives">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <h1 class="archivePageTitle">Arquivos</h1>
        </div>
        
        <form id="uploadFormArchive" enctype="multipart/form-data">
          <label for="fileInput">Selecione um arquivo:</label>
          <input type="file" id="fileInput" name="file" required>

          <div class="archive-form-buttons">
            <button type="submit" class="upload-button-archive">Enviar</button>
          </div>
        </form>
        <h2>Arquivos Disponíveis</h2>
      ` +
        content +
        `
      <script src="./js/archives.js" defer></script>
      <script src="./js/upload.js" defer></script>
      <script src="./js/logout.js" defer></script>
      <script defer>
        const sideMenu = document.getElementById('side-menu');
        const menuToggle = document.getElementById('menu-toggle-archives');

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
      </script>
      `;

      document
        .getElementById('uploadFormArchive')
        .addEventListener('submit', async (event) => {
          event.preventDefault();

          const formData = new FormData(event.target); // Cria um objeto FormData com os dados do formulário

          try {
            const response = await fetch('/upload', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
              body: formData,
            });

            if (!response.ok) {
              throw new Error('Erro ao enviar o arquivo');
            }

            const result = await response.json();
            console.log('Arquivo enviado com sucesso:', result);

            // Recarregar o conteúdo ao enviar o arquivo
            archivesElement.click();
          } catch (error) {
            console.error('Erro ao enviar o arquivo:', error);
          }
        });
    });
  }
});
