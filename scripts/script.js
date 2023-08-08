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





const openformBtn = document.querySelectorAll('[data-form-target]');
const closeformBtn = document.querySelectorAll('[data-close-button]');

const overlay = document.querySelector('.overlay');

openformBtn.forEach(button => {
    button.addEventListener('click', () => {
        const form = document.querySelector(button.dataset.formTarget);
        openForm(form);
    })
})

closeformBtn.forEach(button => {
    button.addEventListener('click', () => {
        const form = button.closest('.popup-form')
        closeForm(form);
    })
})


function openForm(form){
    if(form == null) return;
    form.classList.add('active');
    overlay.classList.add('active');
}


function closeForm(form){
    if(form == null) return;
    form.classList.remove('active');
    overlay.classList.remove('active');
}