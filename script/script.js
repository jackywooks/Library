const addButton = document.querySelector("#addBook");
const dialog = document.querySelector("dialog");
const confirmButton = dialog.querySelector("#submit");
const inputArray = dialog.querySelectorAll("input");

//Event Listeners
// "Show the dialog" button opens the dialog modally
addButton.addEventListener("click", () => {
  dialog.showModal();
});


// "Close" button closes the dialog
confirmButton.addEventListener("click", (event) => {
  event.preventDefault();
  addBookToLibrary(inputArray[0].value,inputArray[1].value,inputArray[2].value,inputArray[3].value)
  displayBooks();
  dialog.close();
});

const myLibrary = [];

class Book {
  constructor(title, author, pages, remark) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.remark = remark;
  }
}

function addBookToLibrary(title, author, pages, remark) {
  const newBook = new Book(title, author, pages, remark);
  myLibrary.push(newBook);
}

function displayBooks() {
  for (const book of myLibrary) {
    createCard(book.title, book.author, book.pages, book.remark);
  }
}

function popUpForm() {
}

function createCard(title, author, pages, remark) {
  //create Book Card
  const main = document.querySelector("main");
  const card = document.createElement("div");
  card.setAttribute("class", "bookCard");
  main.appendChild(card);

  //close button
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "x";
  card.appendChild(closeBtn);
  closeBtn.addEventListener("click", () => card.parentNode.removeChild(card));

  //Content
  const bookTitle = document.createElement("p");
  bookTitle.textContent = `Title: ${title}`;
  card.appendChild(bookTitle);
  const bookAuthor = document.createElement("p");
  bookAuthor.textContent = `Author: ${author}`;
  card.appendChild(bookAuthor);
  const bookPages = document.createElement("p");
  bookPages.textContent = `Pages: ${pages}`;
  card.appendChild(bookPages);
  const bookRemark = document.createElement("p");
  bookRemark.textContent = `Remark: ${remark}`;
  card.appendChild(bookRemark);
}
