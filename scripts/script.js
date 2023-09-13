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
    form.bname.value = '';
    form.author.value = '';
    form.tpages.value = '';
    form.cpages.value = '';
}


//LIBRARYDATA
const addForm = document.getElementById("addForm");
const addFormSubmit = document.getElementById('addform-sub');
const error = document.querySelector('.error');


 //bookgrid div

let library = [];

function Book(name, author, tpages, cpages, index){
    this.name = name;
    this.author = author;
    this.tpages = tpages;
    this.cpages = cpages;
    this.index = index;
}


function addBookToLibrary(){
    const name = document.getElementById('bname').value;
    const author = document.getElementById('author').value;
    const tpages = document.getElementById('tpages').value;
    const cpages = document.getElementById('cpages').value;

    const newBook = new Book(name, author, tpages, cpages, noOfBooks);

    library.push(newBook);
   // console.log(library);
    createBook(noOfBooks);
    noOfBooks ++;

    if(noOfBooks >= 0 && noOfBooks != null || noOfBooks != undefined)
        console.log(library[noOfBooks-1]);

}

function createBook(bookIndex){
    //book
    let book = document.createElement('div');   //book layout - contains all below ele
    book.classList.add('book'); 
    book.setAttribute('data-number', bookIndex);

    //top-title, author
    let top = document.createElement('div');    //title and author contains title and author
    top.classList.add('top');
    
    let title = document.createElement('h1');   //title
    title.innerText = library[bookIndex].name;
    //console.log(title);

    let author = document.createElement('div');     //author
    author.innerText = `- ${library[bookIndex].author}`;
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
    tpages.innerText= library[bookIndex].tpages;
    //console.log(tpages);

    tp.appendChild(totalPages);
    tp.appendChild(tpages);



    let rp = document.createElement('div');    //contains read pages
    rp.classList.add('rp');

    let completedPages = document.createElement('h2'); // Pages Read
    completedPages.innerText = 'Pages\nRead';
    //console.log(completedPages);

    let cpages = document.createElement('p');       // page read values
    cpages.innerText = library[bookIndex].cpages;
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

    edit.dataset.bookIndex = bookIndex; //Unique Identifier

    edit.appendChild(i);


    complete.appendChild(com);
    complete.appendChild(edit);


    //completeBanner
    let compBanner = document.createElement('div'); //completed banner
    compBanner.classList.add('comp-banner');

    
    compBanner.innerHTML = 'COMPLETED!';
    
    if(parseInt(library[bookIndex].tpages) === parseInt(library[bookIndex].cpages)){
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
    e.preventDefault();
    let messages = [];
    if(addForm.bname.value === '' || addForm.bname.value === null){
        messages.push('Enter Name');
    }

    else if(addForm.author.value === '' || addForm.author.value === null){
        messages.push('Enter Author');
    }

    else if(addForm.tpages.value === '' || addForm.tpages.value === null){
        messages.push('Enter Total Pages')
        console.log('ece');
    }

    else if(addForm.cpages.value === '' || addForm.tpages.value === null){
        messages.push('Enter Completed Pages')
        console.log('ecesdsdsd');
    }

    else if(parseInt(addForm.cpages.value) > parseInt(addForm.tpages.value)){
        console.log(tpages.value);
        console.log(cpages.value);

        messages.push('Total Pages can\'t be smaller than Completed Pages');
    }

    console.log()

    if(messages.length > 0){
        e.preventDefault();
        error.textContent = messages.join(', ');
    }

    if(messages.length == 0)
    {
        e.preventDefault();
        addBookToLibrary();
        clearForm(addForm);
        error.textContent = '';
    }
})


//EDIT BUTTON FORM
const editFormBtn = document.querySelectorAll('.edit > i');


    // editFormBtn.forEach(button => {
    //     button.addEventListener('click', () => {
    //         const form = document.querySelector('.popup-edit-form');
    //         openEditForm(form);
    //     })
    // })

    closeformBtn.forEach(button => {
        button.addEventListener('click', () => {
            const form = button.closest('.popup-edit-form')
            closeEditForm(form);
        })
    })



const bookHolder = document.querySelector('.books'); 
function dynamic(){
let bookSel = bookHolder.querySelectorAll('.book');
bookSel.forEach(book => {

    book.addEventListener('click' , () => {console.log(book)});
    const bi = book.getAttribute("data-number");

    console.log("bi = "+ bi);
    console.log(library[bi]);

    const tp = book.querySelector('.tp > p');
    const cp = book.querySelector('.rp > p');

    const name = book.querySelector('.top > h1');
    const author = book.querySelector('.author');
     
    const addbtn = book.querySelector('[data-element = "+"]');
    const subbtn = book.querySelector('[data-element = "-"]');

    const checkbox = book.querySelector('.com > input');

    const editBox = book.querySelector('.edit > i');

    bookIndex = book.getAttribute('data-number'); // Get the bookIndex from the book element's attribute

    if(addbtn){
        addbtn.addEventListener('click', () => {
            console.log(cp.innerText);
            if(cp.innerText <= tp.innerText-1){
                cp.innerText++;
                library[bi].cpages = cp.innerText;
            }
            
            bannercheck();
        })
    }

    if(subbtn){
        subbtn.addEventListener('click', () => {
            console.log(cp.innerText);
            if(cp.innerText > 0){
                --cp.innerText;
                library[bi].cpages = cp.innerText;
            }
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
        console.log('edit button clicked');
        const form = document.querySelector('.popup-edit-form');
        openEditForm(form, bookIndex);
    })

    
})
}


function openEditForm(form, bookIndex){
    if(form == null){
        console.log('editform=null');
        return;
    }
    form.classList.add('active');
    overlay.classList.add('active');

    let e_name = form.querySelector('#bname');
    let e_author = form.querySelector('#author');
    let e_tpages = form.querySelector('#tpages');
    let e_cpages = form.querySelector('#cpages');

    const editBtn = form.querySelector('#editform-sub');

    const bookBeingEdited = library[bookIndex];     //currentbook

    e_name.value = bookBeingEdited.name;
    e_author.value = bookBeingEdited.author;
    e_tpages.value = bookBeingEdited.tpages;
    e_cpages.value = bookBeingEdited.cpages; 



    // if (!e_name) {
    //     console.log('e_name not found');
    //     return;
    // }

    // if (!cb_name) {
    //     console.log('cb_name not found');
    //     return;
    // }

    // console.log(form);
    // console.log(cb_name.innerText);
    // console.log(cb_author.innerText);
    // console.log(cb_tp.innerText);
    // console.log(cb_rp.innerText);

    // e_name.value = e_name.innerText;
    // e_name.innerText = e_name.value;   
    
    // e_author.value = e_author.innerText;
    // e_author.innerText = e_author.value;

    // e_tpages.value = e_tpages.innerText;
    // e_tpages.innerText = e_tpages.value;

    // e_cpages.value = e_cpages.innerText;
    // e_cpages.innerText = e_cpages.value;

    console.log(library);
    console.log(bookBeingEdited.name);






    editBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('edit button clickedsdasdsadsa');
        console.log("CHANGED VALUES");
        console.log(e_name.value);
        console.log(e_author.value);
        console.log(e_cpages.value);
        console.log(e_tpages.value);
        console.log("----------------");


        let messages = [];
        if(e_name.value === '' || e_name.value === null){
            messages.push('Enter Name');
        }
    
        if(e_author.value === '' || e_author.value === null){
            messages.push('Enter Author');
        }
    
        if(e_tpages.value === '' || e_tpages.value === null){
            messages.push('Enter Total Pages')
        }
    
        if(e_cpages.value === '' || e_cpages.value === null){
            messages.push('Enter Completed Pages')
        }
    
        if(parseInt(e_cpages.value) > parseInt(e_tpages.value)){
            console.log(e_tpages.value);
            console.log(e_cpages.value);
    
            messages.push('Total Pages can\'t be smaller than Completed Pages');
        }
    
        if(messages.length > 0){
            e.preventDefault();
            error.textContent = messages.join(', ');
        }

        if (messages.length == 0) {
            e.preventDefault();
        
            if (e_name.value.trim() !== '') {
                bookBeingEdited.name = e_name.value;
            }
            
            if (e_author.value.trim() !== '') {
                bookBeingEdited.author = e_author.value;
            }
            
            if (e_tpages.value.trim() !== '') {
                bookBeingEdited.tpages = e_tpages.value;
            }
            
            if (e_cpages.value.trim() !== '') {
                bookBeingEdited.cpages = e_cpages.value;
            }
        }
    });
    
}





function closeEditForm(form){
    if(form == null) return;
    form.classList.remove('active');
    overlay.classList.remove('active');
}



dynamic();




//BOOK EDITING FORM
// const editFormBtn = document.querySelectorAll('.edit > i');

// function editForm(){
//     editFormBtn.forEach(button => {
//         button.addEventListener('click', () => {
//             const form = document.querySelector('.popup-edit-form');
//             openEditForm(form);
//         })
//     })

//     closeformBtn.forEach(button => {
//         button.addEventListener('click', () => {
//             const form = button.closest('.popup-edit-form')
//             closeEditForm(form);
//         })
//     }) 
// }

// function openEditForm(form){
//     if(form == null) return;
//     form.classList.add('active');
//     overlay.classList.add('active');
// }


// function closeEditForm(form){
//     if(form == null) return;
//     form.classList.remove('active');
//     overlay.classList.remove('active');
// }

