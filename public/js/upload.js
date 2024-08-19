document
  .getElementById('uploadForm')
  .addEventListener('submit', async function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const formData = new FormData(this); // Cria um objeto FormData com os dados do formulário

    try {
      const response = await fetch('/upload', {
        // Altere para a URL da sua rota de upload
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar o arquivo');
      }

      const result = await response.json(); // Parseia a resposta JSON
      console.log('Sucesso:', result);
      // Aqui você pode adicionar código para manipular a resposta de sucesso
    } catch (error) {
      console.error('Erro:', error.message);
      // Aqui você pode adicionar código para manipular o erro
    }
  });
