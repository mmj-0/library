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

let noOfBooks = 0;

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


 //bookgrid div

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
   // console.log(library);
    createBook(newBook, noOfBooks);
    noOfBooks ++;

    if(noOfBooks >= 0 && noOfBooks != null || noOfBooks != undefined)
        console.log(library[noOfBooks-1]);

}

function createBook(books, bookIndex){
    //book
    let book = document.createElement('div');   //book layout - contains all below ele
    book.classList.add('book'); 
    book.setAttribute('data-number', bookIndex);

    //top-title, author
    let top = document.createElement('div');    //title and author contains title and author
    top.classList.add('top');
    
    let title = document.createElement('h1');   //title
    title.innerText = books.name;
    //console.log(title);

    let author = document.createElement('div');     //author
    author.innerText = `- ${books.author}`;
    author.classList.add('author');
    //console.log(author);

    top.appendChild(title);
    top.appendChild(author);



    //read-totalpages, readpages
    let read = document.createElement('div');   //contains tp and rp
    read.classList.add('read');

    let tp = document.createElement('div');     //contains total pages
    tp.classList.add('tp');

    let totalPages = document.createElement('h2'); //Total Pages
    totalPages.innerText = 'Total\nPages';
    //console.log(totalPages);

    let tpages = document.createElement('p');   //total pages value
    tpages.innerText= books.tpages;
    //console.log(tpages);

    tp.appendChild(totalPages);
    tp.appendChild(tpages);



    let rp = document.createElement('div');    //contains read pages
    rp.classList.add('rp');

    let completedPages = document.createElement('h2'); // Pages Read
    completedPages.innerText = 'Pages\nRead';
    //console.log(completedPages);

    let cpages = document.createElement('p');       // page read values
    cpages.innerText = books.cpages;
    //console.log(cpages);

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

    //addBtn.dataset.element = '+';
    //subBtn.dataset.element = '-';
    subBtn.setAttribute('data-element','-');
    addBtn.setAttribute('data-element','+');

    addBtn.innerText = '+';

    subBtn.innerText = '-';

    pc.appendChild(subBtn);
    pc.appendChild(addBtn);

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
    i.innerHTML = '<i class="fa-solid fa-pen" style="color: #faebd7;"></i>';

    edit.appendChild(i);


    complete.appendChild(com);
    complete.appendChild(edit);


    //completeBanner
    let compBanner = document.createElement('div'); //completed banner
    compBanner.classList.add('comp-banner');

    
    compBanner.innerHTML = 'COMPLETED!';
    
    if(parseInt(books.tpages) === parseInt(books.cpages)){
        input.checked = true;
        compBanner.classList.add('active');
    }
    else  
        compBanner.classList.remove('active');

    book.appendChild(top);
    book.appendChild(read);
    book.appendChild(pc);
    book.appendChild(complete);
    book.appendChild(compBanner);

    bookHolder.appendChild(book);

    dynamic();
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

const bookHolder = document.querySelector('.books'); 
function dynamic(){
let bookSel = bookHolder.querySelectorAll('.book');
bookSel.forEach(book => {

    book.addEventListener('click' , () => {console.log(book)})

    const tp = book.querySelector('.tp > p');
    const cp = book.querySelector('.rp > p');
     
    const addbtn = book.querySelector('[data-element = "+"]');
    const subbtn = book.querySelector('[data-element = "-"]');

    const checkbox = book.querySelector('.com > input');

    const editBox = book.querySelector('.edit > i');

    if(addbtn){
        addbtn.addEventListener('click', () => {
            console.log(cp.innerText);
            if(cp.innerText <= tp.innerText-1)
                ++cp.innerText;
            
            bannercheck();
        })
    }

    if(subbtn){
        subbtn.addEventListener('click', () => {
            console.log(cp.innerText);
            if(cp.innerText > 0)
                cp.innerText--;
            bannercheck();
        })
    }

    function bannercheck(){
        if(cp.innerText === tp.innerText){
            book.querySelector('.comp-banner').classList.add('active');
            checkbox.checked = true;
            console.log('yeye');
        }
        else{
            console.log('yeey');
            checkbox.checked = false;  
            console.log('checkbox should be false')
            if(book.querySelector('.comp-banner').classList.contains('active')){
                console.log('yeyo');
                book.querySelector('.comp-banner').classList.remove('active');
                
            } 
            
        }

    }

    checkbox.addEventListener('click', () =>  {
        if(checkbox.checked == true){
            cp.innerText = tp.innerText;
            bannercheck();
        }
        else{
            cp.innerText = tp.innerText - 1;
            bannercheck();
        }
    })

    editBox.addEventListener('click', () => {
        console.log('edit button clicked')
    })
    
})
}


dynamic();


