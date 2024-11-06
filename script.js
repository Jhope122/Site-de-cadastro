let funcionarios = [];

function salvarNoLocalStorage() {
  localStorage.setItem("funcionarios", JSON.stringify(funcionarios));
}

function carregarDoLocalStorage() {
  const dadosSalvos = localStorage.getItem("funcionarios");
  if (dadosSalvos) {
    funcionarios = JSON.parse(dadosSalvos);
    listarFuncionarios();
  }
}

function listarFuncionarios() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";
  funcionarios.forEach((funcionario, index) => {
    const item = document.createElement("li");
    item.innerHTML = `
      <strong>Nome:</strong> ${funcionario.nome} | 
      <strong>Data de Admissão:</strong> ${funcionario.dataAdmissao} | 
      <strong>Idade:</strong> ${funcionario.idade} | 
      <strong>Nacionalidade:</strong> ${funcionario.nacionalidade} | 
      <strong>Data de Nascimento:</strong> ${funcionario.dataNascimento} | 
      <strong>Setor:</strong> ${funcionario.setor} | 
      <strong>Email:</strong> ${funcionario.email} 
      <button onclick="editarFuncionario(${index})">Editar</button>
      <button onclick="excluirFuncionario(${index})">Excluir</button>
    `;
    lista.appendChild(item);
  });
}

function adicionarOuAtualizarFuncionario(event) {
  event.preventDefault();
  const formulario = document.getElementById("admissao");
  const funcionario = {
    nome: formulario.nome.value,
    dataAdmissao: formulario.dataAdmissao.value,
    idade: formulario.idade.value,
    nacionalidade: formulario.nacionalidade.value,
    dataNascimento: formulario.dataNascimento.value,
    setor: formulario.setor.value,
    email: formulario.email.value,
  };

  const index = formulario.dataset.index;

  if (index) {
    funcionarios[index] = funcionario;
    formulario.removeAttribute("data-index");
  } else {
    funcionarios.push(funcionario);
  }

  listarFuncionarios();
  salvarNoLocalStorage();
  formulario.reset();
}

function editarFuncionario(index) {
  const formulario = document.getElementById("admissao");
  const funcionario = funcionarios[index];
  formulario.nome.value = funcionario.nome;
  formulario.dataAdmissao.value = funcionario.dataAdmissao;
  formulario.idade.value = funcionario.idade;
  formulario.nacionalidade.value = funcionario.nacionalidade;
  formulario.dataNascimento.value = funcionario.dataNascimento;
  formulario.setor.value = funcionario.setor;
  formulario.email.value = funcionario.email;
  formulario.dataset.index = index;
}

function excluirFuncionario(index) {
  funcionarios.splice(index, 1);
  listarFuncionarios();
  salvarNoLocalStorage();
}

carregarDoLocalStorage();

document.getElementById("admissao").addEventListener("submit", adicionarOuAtualizarFuncionario);
