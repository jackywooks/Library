const addButton = document.querySelector("#addBook");
const dialog = document.querySelector("dialog");
const confirmButton = dialog.querySelector("#submit");
const inputArray = dialog.querySelectorAll("input");
const toggleButtons = document.querySelectorAll(".readStatus");
const readStatus = document.getElementById("readStatus");
let isToggled = false;

//Event Listeners
//toggle Button in the dialog
toggleButtons.forEach((toggleButton) => {
  toggleButton.addEventListener("click", function () {
    isToggled = !isToggled;
    this.innerText = isToggled ? "Read" : "Unread";
    this.classList.toggle("active");
    this.setAttribute("aria-pressed", isToggled);
  });
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
    isToggled, //Read Status
    addBookToLibrary(
      //create the book and return the index of the book in the same go
      inputArray[0].value,
      inputArray[1].value,
      inputArray[2].value,
      inputArray[3].value,
      isToggled
    )
  );

  //initialise the input
  inputArray[0].value = "";
  inputArray[1].value = "";
  inputArray[2].value = "";
  inputArray[3].value = "";
  isToggled = false;
  readStatus.classList.remove("active");
  readStatus.innerText = "Unread";
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

function removeBookFromLibrary(index) {
  myLibrary.splice(index);
}

function toggleReadStatus(index) {
  let i = 0;
  let readValue;
  myLibrary.forEach((book) => {
    if (i == index) {
      book.read = !book.read;
      readValue = book.read;
      return;
    }
    i++;
  });
  return readValue;
}

function createCard(title, author, pages, remark, isRead, index) {
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
    removeBookFromLibrary(closeBtn.getAttribute("data-index"));
  });

  //Content
  displayInfo("Title", title, card);
  displayInfo("Author", author, card);
  displayInfo("Pages", pages, card);
  displayInfo("Remark", remark, card);
  displayButton(isRead, card, index);
}

function displayInfo(Name, value, parentNode) {
  const containerDiv = document.createElement("div");
  const label = document.createElement("p");
  label.textContent = `${Name}:`;
  const dispValue = document.createElement("input");
  dispValue.value = `${value}`;
  dispValue.readOnly = true;
  containerDiv.appendChild(label);
  containerDiv.appendChild(dispValue);
  parentNode.appendChild(containerDiv);
}

function displayButton(isRead, parentNode, index) {
  const containerDiv = document.createElement("div");
  const readButton = document.createElement("button");
  readButton.innerText = isRead ? "Read" : "Unread";
  readButton.setAttribute("class", "readStatus");
  readButton.setAttribute("data-index", index);
  if (isRead) {
    readButton.classList.add("active");
  }
  readButton.addEventListener("click", function () {
    isRead = toggleReadStatus(readButton.getAttribute("data-index"));
    this.innerText = isRead ? "Read" : "Unread";
    this.classList.toggle("active");
    this.setAttribute("aria-pressed", isRead);
  });
  containerDiv.appendChild(readButton);
  parentNode.appendChild(containerDiv);
}
