document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.btn-detalhes').forEach((botao) => {
    botao.addEventListener('click', () => {
      const jsonStr = botao.getAttribute('data-objeto');
      
      let objeto;
      try {
        objeto = JSON.parse(jsonStr);
      } catch (err) {
        console.error('Erro ao fazer parse do JSON:', err);
        return;
      }

      document.getElementById('detalhesDescricao').innerHTML = `
        <strong>Nome:</strong> ${objeto.name}<br>
        <strong>Descrição:</strong> ${objeto.description}<br>
        <strong>Categoria:</strong> ${objeto.category}<br>
        <strong>Local da perda:</strong> ${objeto.location_of_loss}<br>
        <strong>Data da perda:</strong> ${formatarData(objeto.date_of_loss)}<br>

        <h4 class='fs-4 mb-2 mt-3'>Informações do proprietário:</h4>

        <strong>Nome:</strong> ${objeto.User?.firstName ?? 'N/A'} ${objeto.User?.lastName ?? ''}<br>
        <strong>Email:</strong> ${objeto.User?.email ?? 'N/A'}<br>
        <strong>Telefone:</strong> ${objeto.User?.contactNumber ?? 'N/A'}
      `;

      const imagensContainer = document.getElementById('detalhesImagens');
      imagensContainer.innerHTML = '';

      (objeto.Pictures || []).forEach((pic) => {
        imagensContainer.innerHTML += `
          <img src="/public/${pic.img}" 
               alt="${objeto.name}" 
               style="height: 120px; object-fit: cover;" 
               class="rounded shadow-sm" />
        `;
      });
    });
  });
});

function formatarData(dataISO) {
  if (!dataISO) return 'N/A';
  const [ano, mes, dia] = dataISO.split('T')[0].split('-');
  return `${dia}/${mes}/${ano}`;
}
