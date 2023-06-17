// Get the modal
let operationTitle = document.getElementById('optitle');
let operationtype = document.getElementById('operationtype');
let modal = document.getElementById('myModal');
let formTitle = document.getElementById('title');
let formAuthor = document.getElementById('author');
let formPages = document.getElementById('pages');
let formRead = document.getElementById('read');

// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    operationTitle.innerHTML = "Add New Book";
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    clearForm()
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        clearForm();
    }
}

/**my book library code starts here */

let myLibrary = [];

/**
 * Constructor function for the book Objects
 * @param {The title of the book} title 
 * @param {The author of the book} author 
 * @param {How many pages book have} pages 
 * @param {If read or not} read 
 */
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

/** 
 * Adds a book to the library array
 * @param {Book objects} book
*/
function addBookToLibrary(book) {
  myLibrary.push(book);
}

/** 
 * Deletes book from the library array.
 * @param {The div element containing the book} element
 * @param {The index of the book in the array} index
*/
function deleteBook(element, index){
    putting.removeChild(element);
    myLibrary.splice(index, 1);
}

/** 
 * Edits already existing book
 * @param {The title of the book } bookTitle
 * @param {The author of the book} bookAuthor
 * @param {How many pages book have} bookPages
 * @param {If read or not} bookRead
 * @param {Index of book in array Library} bookId
*/
function editBook(bookTitle, bookAuthor, bookPages, bookRead, bookId) {
    operationTitle.innerHTML = `Edit ${bookTitle}`;
    modal.style.display = "block";

    formTitle.value = bookTitle;
    formAuthor.value = bookAuthor;
    formPages.value = bookPages;
    document.getElementById('bookId').value = bookId;
    operationtype.value = "Edit";

}

/**
 * Clears the form inputs
 */
function clearForm() {
    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('pages').value = "";
    document.getElementById('read').value = "";
    operationtype.value = "";
}

/**This part of my code gets the inputs from the user */
let myForm = document.getElementById('myForm');
let putting = document.getElementById('putting');

/**
 * Defines action on form submision
 * both on edits and adding.
 */
myForm.onsubmit = (e) => {

    e.preventDefault();
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.getElementById('read').value;
    let bookId = document.getElementById('bookId').value
    modal.style.display = "none";

    if(operationtype.value == 'Edit'){
        clearForm();
        myLibrary[bookId].title = title;
        myLibrary[bookId].author = author;
        myLibrary[bookId].pages = pages;
        myLibrary[bookId].read = read;
        showBooks();
    }
    else {
        if(title != "" && author != "" && pages != ""){
            clearForm()
            addBookToLibrary(new Book(title, author, pages, read));
            console.log(myLibrary);
            showBooks();
        }
    }
}

/**
 * Displays the different div cards for each of the books
 * The function loops over the library and displays the available books 
*/
function showBooks(){
    let putting = document.getElementById('putting');
    putting.innerHTML = "";

    myLibrary.forEach((item, index) => {

        let panel = document.createElement("div");
        let panelHeader = document.createElement("div");
        let panelBody = document.createElement("div");
        let panelFooter = document.createElement("div");

        let titleP = document.createElement("p");
        let authorP = document.createElement("p");
        let pagesP = document.createElement("p");
        let readP = document.createElement("p");

        let editBtn = document.createElement("button");
        let removeBtn = document.createElement("button");

        panel.setAttribute("class", "panel");
        panelHeader.setAttribute("class", "panel-header");
        panelBody.setAttribute("class", "panel-body");
        panelFooter.setAttribute("class", "panel-footer");

        editBtn.setAttribute("class", "myBtn");
        removeBtn.setAttribute("class", "myBtn removeBtn");


        titleP.innerHTML = item.title;
        authorP.innerHTML = item.author;
        pagesP.innerHTML = item.pages;
        readP.innerHTML = "Already Read";

        editBtn.innerHTML = "Edit";
        removeBtn.innerHTML = "Remove";

        panelFooter.appendChild(editBtn);
        panelFooter.appendChild(removeBtn);

        panelBody.appendChild(titleP);
        panelBody.appendChild(authorP);
        panelBody.appendChild(pagesP);
        panelBody.appendChild(readP);

        panelHeader.innerHTML = item.title;

        panel.appendChild(panelHeader);
        panel.appendChild(panelBody);
        panel.appendChild(panelFooter);

        removeBtn.onclick = () => {
            deleteBook(panel, index);
        }

        editBtn.onclick = () => {
            editBook(item.title, item.author, item.pages, item.read, index);
        }

        putting.appendChild(panel);

    });
}

