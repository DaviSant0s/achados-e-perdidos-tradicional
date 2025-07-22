
function criarObjeto() {
  // Abre o modal
  const editarModal = new bootstrap.Modal(document.getElementById('criarModal'));
  editarModal.show();
}

async function editarObjeto(id){

  const obj = objetosCarregados.find(obj => obj.id === id);

  if (!obj) {
    alert("Objeto não encontrado");
    return;
  }

  // Preenche os campos do modal com os dados do objeto
  document.getElementById('editarObjetoId').value = obj.id;
  document.getElementById('editarNome').value = obj.name;
  document.getElementById('editarDescricao').value = obj.description;
  document.getElementById('editarCategoria').value = obj.category;
  document.getElementById('editarLocal').value = obj.location_of_loss;
  document.getElementById('editarData').value = obj.date_of_loss; // formato YYYY-MM-DD

  // Abre o modal
  const editarModal = new bootstrap.Modal(document.getElementById('editarModal'));
  editarModal.show();

  const form = document.getElementById('formEditarObjeto');

  form.onsubmit = async function (e) {
    e.preventDefault();

    const nome = document.getElementById('editarNome').value;
    const descricao = document.getElementById('editarDescricao').value;
    const categoria = document.getElementById('editarCategoria').value;
    const local = document.getElementById('editarLocal').value;
    const data = document.getElementById('editarData').value;
    const novasImagens = document.getElementById('editarNovasImagens').files;

    const formData = new FormData();
    formData.append("name", nome);
    formData.append("description", descricao);
    formData.append("category", categoria);
    formData.append("location_of_loss", local);
    formData.append("date_of_loss", data);

    for (let file of novasImagens) {
      formData.append("objectPicture", file);
    }

    try {
      const response = await fetch(`http://localhost:3000/api/object/updateObject/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) throw new Error("Erro ao atualizar o objeto.");

      alert("Objeto atualizado com sucesso!");

      editarModal.hide();

      carregarObjetos();

    } catch (error) {
      console.error(error);
      alert(error.message);
    }

  }
  
}

function formatarData(dataISO) {
  const [ano, mes, dia] = dataISO.split('-');
  return `${dia}/${mes}/${ano}`;
}
