const addButton = document.querySelector("#addBook");
const dialog = document.querySelector("dialog");
const confirmButton = dialog.querySelector("#submit");
const inputArray = dialog.querySelectorAll("input");
const toggleButton = document.getElementById("readStatus");
const readStatus = toggleButton.querySelector("span");

//Event Listeners
//toggle Button in the dialog
toggleButton.addEventListener("click", function () {
  this.classList.toggle("active");
});

// "Show the dialog" button opens the dialog modally
addButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
confirmButton.addEventListener("click", (event) => {
  event.preventDefault();

  //create the card div after the dialog close
  createCard(
    inputArray[0].value, //Title
    inputArray[1].value, //Author
    inputArray[2].value, //Pages
    inputArray[3].value, //Description
    getComputedStyle(readStatus, '::before').getPropertyValue('content'), //Read Status
    addBookToLibrary(
      inputArray[0].value,
      inputArray[1].value,
      inputArray[2].value,
      inputArray[3].value
    )
  );

  //initialise the input
  inputArray[0].value = "";
  inputArray[1].value = "";
  inputArray[2].value = "";
  inputArray[3].value = "";
  dialog.close();
});

const myLibrary = [];

class Book {
  constructor(title, author, pages, remark, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.remark = remark;
    this.read = read;
  }
}

function addBookToLibrary(title, author, pages, remark, read) {
  const newBook = new Book(title, author, pages, remark, read);
  return myLibrary.push(newBook) - 1;
}

// function displayBooks() {
//   let i = 0;
//   for (const book of myLibrary) {
//     createCard(book.title, book.author, book.pages, book.remark, i);
//     i++;
//   }
// }

function removeBookFromLibrary(index) {
  myLibrary.splice(index);
}

function createCard(title, author, pages, remark, read, index) {
  //create Book Card
  const main = document.querySelector("main");
  const card = document.createElement("div");
  card.setAttribute("class", "bookCard");
  main.appendChild(card);

  //close button
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "Remove";
  closeBtn.setAttribute("class", "close");
  closeBtn.setAttribute("data-index", index);
  card.appendChild(closeBtn);
  closeBtn.addEventListener("click", () => {
    card.parentNode.removeChild(card);
    removeBookFromLibrary(index);
  });

  //Content
  displayInfo("Title", title, card);
  displayInfo("Author", author, card);
  displayInfo("Pages", pages, card);
  displayInfo("Remark", remark, card);
}

function displayInfo(Name, value, division) {
  const containerDiv = document.createElement("div");
  const label = document.createElement("p");
  label.textContent = `${Name}:`;
  const dispValue = document.createElement("input");
  dispValue.value = `${value}`;
  dispValue.readOnly = true;
  containerDiv.appendChild(label);
  containerDiv.appendChild(dispValue);
  division.appendChild(containerDiv);
}
