const URL = 'https://62e6b2430e5d74566aeb3d86.mockapi.io/ToDolist/';
const TODO_ITEM_CLASS = '.toDoItem'
const DONE_TODO_ITEM_CLASS = 'done'
const EDIT_BTN_ClASS = 'editBtn'
const DELETE_BTN_CLASS = 'deleteBtn'

const toDoList = document.querySelector('#toDoList');
const input = document.querySelector('#title');
const toDoForm = document.querySelector('#toDoForm');

toDoForm.addEventListener('submit', onToDoFormSubmit);
toDoList.addEventListener('click', onToDoListClick);

getToDoList().then(renderToDoList);

function onToDoFormSubmit(e) {
    e.preventDefault();
    
    const newToDo = getToDo();

    if (newToDo.title == '') {
    alert('Empty field')
    return}

    createToDo(newToDo)
    .then(newToDo => {
        renderToDoItem(newToDo);
        clearForm();
    });
}

function onToDoListClick(e) {
    const toDoItem = getToDoItem(e.target);
    if (toDoItem) {
        const toDoItemId = getToDoItemId(toDoItem)

        if (e.target.classList.contains(DELETE_BTN_CLASS)) {
            deleteToDo(toDoItem, toDoItemId)
            return;
        }

        if (e.target.classList.contains(EDIT_BTN_ClASS)) {
            editToDo(toDoItem, toDoItemId)
            return;
        }

        if (toDoItem.classList.contains(DONE_TODO_ITEM_CLASS)) {
            toDoNotDone(toDoItemId)
        }

        toDoDone(toDoItemId)
        toDoItem.classList.toggle(DONE_TODO_ITEM_CLASS)
    }
}

function deleteToDo(toDoItem, toDoItemId) {
    fetch(URL + toDoItemId, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    }).then(toDoList.removeChild(toDoItem))
}

function editToDo(toDoItem, toDoItemId) {
    const editedToDo = prompt('Write down your goal')
    if (editedToDo !=='') {
        fetch(URL + toDoItemId, {
            method: 'PUT',
            body: JSON.stringify({title: editedToDo}),
            headers: {'Content-Type': 'application/json'},
        }).then(toDoItem.querySelector('.title').innerText = editedToDo)
    }
}

function toDoDone(toDoItemId) {
    fetch(URL + toDoItemId, {
        method: 'PUT',
        body: JSON.stringify({status: true}),
        headers: {'Content-Type': 'application/json'},
    });
}

function toDoNotDone(toDoItemId) {
    fetch(URL + toDoItemId, {
        method: 'PUT',
        body: JSON.stringify({status: false}),
        headers: {'Content-Type': 'application/json'},
    });
}

function getToDoList() {
    return fetch(URL).then(res => res.json());
}

function renderToDoList(list) {
    const html = list.map(generateToDoHtml).join('');

    toDoList.insertAdjacentHTML('beforeend', html);
}

function renderToDoItem(toDo) {
    const newToDoHtml = generateToDoHtml(toDo);
    toDoList.insertAdjacentHTML('beforeend', newToDoHtml);
}

function generateToDoHtml(toDo) {
    const status = toDo.status ? 'done' : '';

    return `
        <li data-id ="${toDo.id}" class="toDoItem ${status}">
            <span class = "title">${toDo.title}</span>
            <button class="deleteBtn">Delete</button>
            <button class="editBtn">Edit</button>
        </li>
    `;
}

function getToDo() {
    return {
        title: input.value,
        status: false
    };
}

function createToDo(toDo) {
    return fetch(URL, {
        method: 'POST',
        body: JSON.stringify(toDo),
        headers: {'Content-type': 'application/json'},
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }

        throw new Error('Can not create new ToDo');
    });
}

function clearForm() {
    toDoForm.reset();
}

function getToDoItem(el) {
    return el.closest(TODO_ITEM_CLASS);
}

function getToDoItemId(toDoItem) {
    return toDoItem.dataset.id
}