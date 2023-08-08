// const form = document.getElementById('book-form');

// const submitBtn = document.getElementById('submit');

// let myLibrary = [];


// function Book(name, author, tpages, rpages, status){
//     this.name = name;
//     this.author = author;
//     this.tpages = tpages;
//     this.rpages = rpages;
//     this.status = status;
// }


// function addBookToLibrary(){
//     const name = document.getElementById('bname').value;
//     const author = document.getElementById('author').value;
//     const tpages = parseInt(document.getElementById('tpages').value);
//     const rpages = parseInt(document.getElementById('rpages').value);
//     const status = document.getElementById('status').value;

//     const newBook = new Book(name, author, tpages, rpages, status);

//     myLibrary.push(newBook);

//     console.log('Book Added :)');
// }


//BOOK ADDING FORM
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
    clearForm(addForm);
}

function clearForm(form){
    bname.value = '';
    author.value = '';
    tpages.value = '';
    cpages.value = '';
}


//LIBRARYDATA
const addForm = document.getElementById("addForm");
const addFormSubmit = document.getElementById('addform-sub');
const error = document.querySelector('.error');


const bookHolder = document.getElementsByClassName('books'); //bookgrid div

let library = [];

function Book(name, author, tpages, cpages){
    this.name = name;
    this.author = author;
    this.tpages = tpages;
    this.cpages = cpages;
}


function addBookToLibrary(){
    const name = document.getElementById('bname').value;
    const author = document.getElementById('author').value;
    const tpages = document.getElementById('tpages').value;
    const cpages = document.getElementById('cpages').value;

    const newBook = new Book(name, author, tpages, cpages);

    library.push(newBook);
    console.log(library);
    createBook(newBook);
}

function createBook(book){
    
}

addForm.addEventListener('submit', (e) => {
    let messages = [];
    if(bname.value === '' || bname.value === null){
        messages.push('Enter Name');
    }

    if(author.value === '' || author.value === null){
        messages.push('Enter Author');
    }

    if(tpages.value === '' || tpages.value === null){
        messages.push('Enter Total Pages')
    }

    if(cpages.value === '' || tpages.value === null){
        messages.push('Enter Completed Pages')
    }

    if(parseInt(cpages.value) > parseInt(tpages.value)){
        console.log(tpages.value);
        console.log(cpages.value);

        messages.push('Total Pages can\'t be smaller than Completed Pages');
    }

    if(messages.length > 0){
        e.preventDefault();
        error.innerText = messages.join(', ');
    }

    if(messages.length == 0)
    {
        e.preventDefault();
        addBookToLibrary();
        clearForm(addForm);
    }
})