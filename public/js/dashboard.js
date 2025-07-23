function abrirModal(idModal) {

  // Abre o modal
  const editarModal = new bootstrap.Modal(document.getElementById(idModal));
  editarModal.show();

}



function criarObjeto() {

  abrirModal('criarModal')

}

function editarObjeto(btn){

  const id = btn.getAttribute('data-id');
  const name = btn.getAttribute('data-name');
  const description = btn.getAttribute('data-description');
  const category = btn.getAttribute('data-category');
  const location = btn.getAttribute('data-location');
  const date = btn.getAttribute('data-date');

  console.log(name)

  // Preenche os campos da modal
  document.getElementById('editarNome').value = name;
  document.getElementById('editarDescricao').value = description;
  document.getElementById('editarCategoria').value = category;
  document.getElementById('editarLocal').value = location;
  document.getElementById('editarData').value = date;

  // Altere a ação do form para enviar para o endpoint correto
  const form = document.querySelector('#editarModal form');
  form.action = `/object/updateObject/${id}`;

  abrirModal('editarModal')
  
}

function formatarData(dataISO) {
  const [ano, mes, dia] = dataISO.split('-');
  return `${dia}/${mes}/${ano}`;
}
