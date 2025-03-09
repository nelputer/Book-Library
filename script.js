const myLibrary = [];

function Book(author, title, pages, read) {
  this.id = crypto.randomUUID();
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(author, title, pages, read) {
  const newBook = new Book(author, title, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

function displayBooks() {
  const booklist = document.getElementById('booklist');
  booklist.innerHTML = ""; 

  myLibrary.forEach((book, index) => {
    let childDiv = document.createElement("div");
    childDiv.classList.add("box");
    childDiv.innerHTML = `
      <strong><p>Author: ${book.author}</p></strong>
      <strong><p>Title: ${book.title}</p></strong>
      <strong><p>Number of Pages: ${book.pages}</p></strong>
      <strong><label for="read-${index}">I have read:</label>
      <select id="read-${index}" onchange="toggleRead(${index})">
        <option value="true" ${book.read ? "selected" : ""}>Yes</option>
        <option value="false" ${!book.read ? "selected" : ""}>No</option>
      </select>
      </strong>
      <button class="remove" onclick="removeBook('${book.id}')">Remove Book</button>
    `;
    booklist.appendChild(childDiv);
  });
}

function toggleRead(index) {
  const selectElement = document.getElementById(`read-${index}`);
  myLibrary[index].read = selectElement.value === "true"; 
  displayBooks(); 
}



function removeBook(id) {
  const index = myLibrary.findIndex(book => book.id === id);
  
  if (index !== -1) {
    myLibrary.splice(index, 1); 
    displayBooks(); 
  }
}





document.getElementById('bookform').addEventListener('submit', function(event) {
  event.preventDefault();

  const author = document.getElementById('author').value;
  const title = document.getElementById('title').value;
  const pages = document.getElementById('number').value;
  const read = document.getElementById('checkbox').checked;
  addBookToLibrary(author, title, pages, read);
  this.reset();
});

addBookToLibrary("George Orwell", "1984", 328, true);
addBookToLibrary("J.R.R. Tolkien", "The Hobbit", 310, false);
addBookToLibrary("Harper Lee", "To Kill a Mockingbird", 281, true);
