const addButton = document.querySelector("#addBook");

//Event Listeners
addButton.addEventListener("click", () => createDiv());


const myLibrary = [];

class Book {
  constructor(title, pages, description) {
    this.title = title;
    this.pages = pages;
    this.description = description;
  }

  addBookToLibrary(title, pages, description) {}
}

function createDiv() {
  const main = document.querySelector("main");
  const card = document.createElement("div");
  card.setAttribute("class", "bookCard");
  main.appendChild(card);

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "x";
  card.appendChild(closeBtn);
  closeBtn.addEventListener("click", () => card.parentNode.removeChild(card));


}
