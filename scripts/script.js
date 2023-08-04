const form = document.getElementById('book-form');

const submitBtn = document.getElementById('submit');

let myLibrary = [];


function Book(name, author, tpages, rpages, status){
    this.name = name;
    this.author = author;
    this.tpages = tpages;
    this.rpages = rpages;
    this.status = status;
}


function addBookToLibrary(){
    const name = document.getElementById('bname').value;
    const author = document.getElementById('author').value;
    const tpages = parseInt(document.getElementById('tpages').value);
    const rpages = parseInt(document.getElementById('rpages').value);
    const status = document.getElementById('status').value;

    const newBook = new Book(name, author, tpages, rpages, status);

    myLibrary.push(newBook);

    console.log('Book Added :)');
}



form.addEventListener("submit", function(e){
    e.preventDefault();
    
    addBookToLibrary();
    form.reset();
})

