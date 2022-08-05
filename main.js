let myLibrary = [];

class Book {
  constructor(title, author, pagesNumber, isRead) {
    // the constructor...
    this.title = title;
    this.author = author;
    this.pagesNumber = pagesNumber;
    this.isRead = isRead;
  }
  status() {
    return this.isRead ? "READ" : "NOT READ";
  }
  get textInputs() {
    return ["title", "author", "pagesNumber"];
  }
}

const theHobbit = new Book("the Hobbit", "ziom", 123, true);
const Legenda = new Book("Legenda", "ziom", 123, true);
myLibrary.push(theHobbit);
myLibrary.push(Legenda);

function openModal() {
  const button = document.querySelector("[data-modal-target]");
  const overlay = document.querySelector("#overlay");
  button.addEventListener("click", (event) => {
    const modal = document.querySelector(button.dataset.modalTarget);
    modal.classList.add("active");
    overlay.classList.add("active");
  });
}

function closeOnOverlay() {
  const overlay = document.querySelector("#overlay");
  const modal = document.querySelector(".modal-form");
  overlay.addEventListener("click", () => {
    modal.classList.remove("active");
    overlay.classList.remove("active");
  });
}

function closeModal() {
  const overlay = document.querySelector("#overlay");
  const modal = document.querySelector(".modal-form");
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

openModal();
closeOnOverlay();

const submitButton = document.querySelector(".submit-button");

submitButton.addEventListener("click", () => {
  if (isFilled()) {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const isRead = document.querySelector("#read").checked;
    const newBook = new Book(title, author, pages, isRead);
    addBookToLibrary(newBook);
    displayBooks(myLibrary);
    resetInputs();
    stopDisplayError();
    closeModal();
  } else {
    startDisplayError();
  }
});

function isFilled() {
  const allInputs = document.querySelectorAll('[type="text"], [type="number"]');
  // check for empty:
  for (let input of allInputs) {
    if (input.value == "") {
      return false;
    }
  }
  // if not found:
  return true;
}

function resetInputs() {
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#pages").value = "";
  document.querySelector("#read").checked = false;
}

function startDisplayError() {
  const error = document.querySelector(".error");
  error.innerText = "Please fill out all the fields";
}

function stopDisplayError() {
  const error = document.querySelector(".error");
  error.innerText = "";
}

function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
}

function displayBooks(myLibrary) {
  resetTable();
  let table = document.querySelector("table");
  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
    let row = document.createElement("tr");
    // add data-row-index so it is easy to delete and select:
    row.dataset.rowIndex = i;
    // add info about the book to the cells:
    book.textInputs.forEach((element) => {
      const newCell = document.createElement("td");
      newCell.innerText = book[element];
      row.appendChild(newCell);
    });
    // add status button:
    const newCell = document.createElement("td");
    const statusButton = document.createElement("button");
    statusButton.innerText = book.status();
    statusButton.dataset.boolean = book.isRead;
    newCell.appendChild(statusButton);
    row.appendChild(newCell);
    statusButton.addEventListener("click", () => {
      book.isRead = !book.isRead;
      statusButton.dataset.boolean = book.isRead;
      statusButton.innerText = book.status();
    });

    // add delete button:
    const deleteButton = document.createElement("button");
    // add index so it is easy to delete rows:
    deleteButton.dataset.deleteIndex = i;
    deleteButton.innerText = "Delete";
    row.appendChild(deleteButton);
    // add created row to the table to show:
    table.appendChild(row);
  }
  activateDeleteButtons(myLibrary);
}

function activateDeleteButtons(myLibrary) {
  const deleteButtons = document.querySelectorAll("[data-delete-index]");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      myLibrary.splice(button.dataset.deleteIndex, 1);
      displayBooks(myLibrary);
    });
  });
}

function resetTable() {
  // all newly created rows have data-row-index attribute
  const allRows = document.querySelectorAll("[data-row-index]");
  allRows.forEach((row) => {
    row.remove();
  });
}

isFilled();
displayBooks(myLibrary);
