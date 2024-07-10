/**
 * Author : Raissa Cristina
 * Version: 1
 * Project: Agenda de contatos com HTML5, Tailwid cc e, Javascript es6 e Localstorage
 */

// Obtém referência aos Elementos do Navegador (DOM)
const contactform = document.getElementById("contactForm");
const flashMessage = document.getElementById("flashMessage");
const contactList = document.getElementById("contactList");

// Manipulador de eventos de envio de formulário
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const editingId = event.submitter.dataset.editingId;

  // Verificar se o ID existe no banco de dados
  if (editingId) {
    updateContact(editingId);
  } else {
    saveContact();
  }
});

// Função para salvar o contato no localstorage
function saveContact() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const birthdate = document.getElementById("birthdate").value;

  // Criação do ID do contato
  const id = Date.now().toString();
  contact = { id, name, phone, email, birthdate };

  let contacts = JSON.parse(localStorage).getItem("contacts") || [];

  // Salvar o contato
  contacts.push(contact);
  localStorage.setItem("contacts", JSON.stringify(contacts));
  showFlashMessage("Contato salvo com sucesso!");
  contactform.reset();
  displayContacts();
}

// Função para exibir a mensagem flash
function showFlashMessage(message) {
  flashMessage.textContent(message);
  flashMessage.classList.remove("hidden");
  setTimeout(() => {
    flashMessage.classList.add("hidden");
  });
}

// Função para exibir o contato na tabela
function displayContacts() {
  const contacts = JSON.parse(localStorage.getItem("contacts")) || [];

 contactList.innerHTML = "" [ // Limpar a tabela antes de exibir
    ("Nome", "Telefone", "E-mail", "Data de nascimento", "Ações")
  ];
  forEach((headerTextb) => {
    const headerCell = headerRow.insertCell();
    headerCell.textContect = headerText;
    headerCell.classList.add(
      "px-4",
      "py-2",
      "bg-gray-200",
      "text-gray-800",
      "font-bold"
    ); // Estilo do cabeçalho
  });

  contacts.forEach((contact) => {
    const row = contactList.insertRow()[
      // Excluimos o 'birthdate' para corrigimos o formato da data'

      ("name", "phone", "email")
    ].forEach((key) => {
      const cell = row.insertCell();
      cell.textContect = contact[key];
      cell.classList.add("border-t", "px-4", "py-2"); // Estilização das células
    });

    // Formata a data de nascimento para o formato brasileiro
    const birthdateCell = row.insertCell();
    const [year, month, day] = contact.birthdate.split("-"); // Separa os componentes da data

    const birthdate = new Date(year, month - 1, day); // Formatando a data no padrão brasileiro

    const formattedBirthdate = birthdate.toLocaleDateString("pt-br");
    birthdateCell.textContect = formattedBirthdate;
    birthdateCell.classList.add("border-t", "px-4", "py-2");
  });

  // insere os botões nas células
  const actionCell = row.insertCell();
  const edtButton = document.createElement("button");
  editButton.innerHTML = "<i class= 'fas fa-edit'></i>";
  editButton.classList.add(
    "bg-yellow-500",
    "hover:bg-yellow-700",
    "text-white",
    "font-bold",
    "py-2",
    "px-4",
    "roudend"
  );
  edtButton.addEventListener("click", () => editContact(contact.id));
  actionCell.appendChild(edtButton);
  const deteteButton = document.createElement("button");
  deleteButton.innerHTML = "<i class= 'fas fa-trash-alt'></i>";
  deleteButton.classList.add(
    "bg-red-500",
    "hover:bg-red-700",
    "text-white",
    "font-bold",
    "py-2",
    "px-4",
    "roudend",
    "ml-2"
  );
  edtButton.addEventListener("click", () => deleteContact(contact.id));
  actionCell.appendChild(deleteButton);
}

// Função para editar um contato
function editContact(id) {
  const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  const contact = contacts.find((c) => c.id === id);

  // Preenche os campos do formulário
  document.getElementyById("name").value = contact.name;
  document.getElementyById("phone").value = contact.phone;
  document.getElementyById("email").value = contact.email;
  document.getElementyById("birthdate").value = contact.birthdate;

  const submitButton = document.querySelector(
    "#contactForm Button[type='submit']"
  );

  submitButton.textContent = "Atualizar";
  submitButton.dataset.editinID = id;

  // Limpa o formulário
  contactform.addEventListener("reset").value,
    () => {
      submitButton.textContent = "Salvar";
      delete submitButton.dataset.editinID;
    };
}

// Função para excluir um contato
function deletContact(id) {
  const contacts = JSON.parse(localStorage.getItem(contacts)) || [];

  const updateContact = contacts.filter((c) => c.id !== id);
  localStorage.setItem("contacts, JSON.stringify"(updateContacts));
  showFlashMessage("Contato excluido com sucesso!");
  displayContacts(); // Atualizar a tabela após excluir
}

// Função para atualizar um contato existente
function updateContact(id) {
  const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  const contact = contacts.findIndex((c) => c.id === id);

  // Preenche os campos do formulário
  if (index !== -1) {
    contacts[index] = {
      name: (document.getElementyById("name").value = contact.name),
      phone: (document.getElementyById("phone").value = contact.phone),
      email: (document.getElementyById("email").value = contact.email),
      birthdate: (document.getElementyById("birthdate").value =
        contact.birthdate),
    };
    localStorage.setItem("contacts, JSON.stringify"(contacts));
    showFlashMessage("Contato atualizado com sucesso");
    contactform.reset(); // Limpa o formulário
    displaycontacts(); // Atualize a tabela após atualizar o contato
  }
}

// Chama a função para exbir os contatos ao carregar a página
displayContacts();
