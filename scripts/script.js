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


const bookHolder = document.querySelector('.books'); //bookgrid div

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

function createBook(books){
    //book
    let book = document.createElement('div');   //book layout - contains all below ele
    book.classList.add('book'); 


    //top-title, author
    let top = document.createElement('div');    //title and author contains title and author
    top.classList.add('top');
    
    let title = document.createElement('h1');   //title
    title.innerText = books.name;
    console.log(title);

    let author = document.createElement('div');     //author
    author.innerText = `- ${books.author}`;
    author.classList.add('author');
    console.log(author);

    top.appendChild(title);
    top.appendChild(author);



    //read-totalpages, readpages
    let read = document.createElement('div');   //contains tp and rp
    read.classList.add('read');

    let tp = document.createElement('div');     //contains total pages
    tp.classList.add('tp');

    let totalPages = document.createElement('h2'); //Total Pages
    totalPages.innerText = 'Total Pages';
    console.log(totalPages);

    let tpages = document.createElement('p');   //total pages value
    tpages.innerText= books.tpages;
    console.log(tpages);

    tp.appendChild(totalPages);
    tp.appendChild(tpages);



    let rp = document.createElement('div');    //contains read pages
    rp.classList.add('rp');

    let completedPages = document.createElement('h2'); // Pages Read
    completedPages.innerText = 'Pages Read';
    console.log(completedPages);

    let cpages = document.createElement('p');       // page read values
    cpages.innerText = books.cpages;
    console.log(cpages);

    rp.appendChild(completedPages);
    rp.appendChild(cpages);


    let line = document.createElement('div');       //line
    line.classList.add('line');


    read.appendChild(tp);
    read.appendChild(line);
    read.appendChild(rp);




    //page counter
    let pc = document.createElement('div');     //contains buttons to add and sub pages
    pc.classList.add('pc');

    let addBtn = document.createElement('button');  //adds pages
    let subBtn = document.createElement('button');  //subtracts pages

    addBtn.innerText = '+';

    subBtn.innerText = '-';

    pc.appendChild(addBtn);
    pc.appendChild(subBtn);

    //complete-contains complete checkbox and edit button
    let complete = document.createElement('div');   //contains complete checkbox and edit
    complete.classList.add('complete');

    
    //contains checkbox
    let com = document.createElement('div');    //complete checkbox
    com.classList.add('com');

    let label = document.createElement('label');
    label.innerText = 'Completed';

    let input = document.createElement('input');
    input.type = 'checkbox';

    com.appendChild(label);
    com.appendChild(input);


    //edit button
    let edit = document.createElement('div');   //edit button
    edit.classList.add('edit');

    let i = document.createElement('i');
    i.innerHTML = 'E';

    edit.appendChild(i);


    complete.appendChild(com);
    complete.appendChild(edit);


    //completeBanner
    let compBanner = document.createElement('div'); //completed banner
    compBanner.classList.add('comp-banner');
    compBanner.classList.add('active');
    compBanner.innerHTML = 'COMPLETED!';

    book.appendChild(top);
    book.appendChild(read);
    book.appendChild(pc);
    book.appendChild(complete);
    book.appendChild(compBanner);

    bookHolder.appendChild(book);
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