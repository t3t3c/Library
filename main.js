let myLibrary = [];

function Book(title, author, pagesNumber, isRead) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pagesNumber = pagesNumber;
  this.isRead = isRead;
}

Book.prototype.listOfKeys = ["title", "author", "pagesNumber", "isRead"];

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
//   // create a new row:
//   let table = document.querySelector("table");
//   let row = document.createElement("tr");
//   newBook.listOfKeys.forEach((element) => {
//     newCell = document.createElement("td");
//     newCell.innerText = newBook[element];
//     row.appendChild(newCell);
//   });
//   // add delete button:
//   const deleteButton = document.createElement("button");
//   deleteButton.classList.add("delete");
//   deleteButton.innerText = "Delete";
//   row.appendChild(deleteButton);
//   table.appendChild(row);
// }

function displayBooks(myLibrary) {
  resetTable();
  let table = document.querySelector("table");
  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
    let row = document.createElement("tr");
    // added class so it is easy to delete later:
    row.classList.add("new-row");
    // add info about the book to the cells:
    book.listOfKeys.forEach((element) => {
      newCell = document.createElement("td");
      newCell.innerText = book[element];
      row.appendChild(newCell);
    });
    // add delete button:
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.innerText = "Delete";
    row.appendChild(deleteButton);
    // add created row to the table to show:
    table.appendChild(row);
  }
}

function resetTable() {
  const allRows = document.querySelectorAll(".new-row");
  allRows.forEach((row) => {
    row.remove();
  });
}

isFilled();
displayBooks(myLibrary);
