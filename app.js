console.log("Hello World!\n==========\n");

// PROJECT Section
console.log("PROJECT:\n==========\n");

class Book {
    id;
    title;
    author;
    isRead;
    
    constructor (title, author, read){

        this.title = title;
        this.author = author;
        this.isRead = read;
    }
}

class Library {
    bookCount;
    books;
    

    constructor(count, array){
        this.bookCount = count;
        this.books = array;

    }
    
    markRead(checkbox, id){
       this.books.forEach((book) => {
            if (book.id == id){
                book.isRead = true;
                checkbox.checked = true;
                checkbox.disabled = true;
            }
       }) 
    }

    addBook(){
        //Selections
        const getTitle = document.querySelector("#input-title");
        const getAuthor = document.querySelector("#input-author");
        const getReadBook = document.querySelector("#input-readBook");
        const getTableBody = document.querySelector("#booksList");

        const book = new Book(getTitle.value, getAuthor.value, getReadBook.checked);
        this.books.push(book);

        //Created Elements
        const tRow = document.createElement("tr");
        tRow.setAttribute("bookId", this.bookCount);
        const tableRow = document.createElement("tr");
        const tableTitle = document.createElement("td");
        tableTitle.textContent = book.title;
        const tableAuthor = document.createElement("td");
        tableAuthor.textContent = book.author;
        const tableIsRead = document.createElement("td");
        tableIsRead.textContent = book.isRead;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove Button";
        const removeButtonAbortController = new AbortController();
        removeButton.addEventListener("click", (event) => {
            this.removeBook(event.target.parentElement);
            removeButtonAbortController.abort();
        }, {signal: removeButtonAbortController.signal}); 


        const inputIsRead = document.createElement("input");
        inputIsRead.type = "checkbox";
        inputIsRead.checked = book.isRead;
        inputIsRead.disabled = true;

        //Added Elements
        tableIsRead.append(inputIsRead);
        tableRow.append(tableTitle);
        tableRow.append(tableAuthor);
        tableRow.append(tableIsRead);
        tableRow.append(removeButton);
        getTableBody.append(tableRow);

        this.bookCount++;

        getTitle.value = "";
        getAuthor.value = "";
        getReadBook.checked = false;
    }

    removeBook(tRow) {
        const bookId = tRow.getAttribute("bookId");
        tRow.remove();
        this.books.splice(bookId, 1);
    }
}

const addToLibrary = new Library(1, [new Book("Name of the Wind", "Patrick Rothfuss", true)]);

const addBookBtn = document.querySelector("#addBookBtn");
addBookBtn.addEventListener("submit", (event) => {
    event.preventDefault();
    addToLibrary.addBook();
})







