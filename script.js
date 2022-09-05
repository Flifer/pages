const ADD_BUTTON = 'addBtn'

const $chat = $('.chat')
const $form = $('#messageForm');
const $btn = $('.addBtn')
const $userInput = $('#user');
const $messageInput = $('#message');

let socket;

initConnection();
$form.on('submit', onFormSubmit)

function initConnection() {
  socket = new WebSocket('wss://fep-app.herokuapp.com');
}

function onFormSubmit(e) {
    e.preventDefault();
    const message = getInputsData();
    socket.send(JSON.stringify(message));
    clearForm();
}

socket.onopen = () => {
  socket.send(JSON.stringify({
    username: 'System',
    message: 'New user connected',
  }));
};

socket.onclose = () => {
  console.log('Socket closed');
  initConnection();
};

socket.onerror = (event) => {
  console.log('Error', event.data);
};

socket.onmessage = (event) => {
  try {
    renderMessage(event);
  } catch (e) {
    console.log('ignore error');
  }
};

function getInputsData() {
    return message = {
        username: $userInput.val(),
        message: $messageInput.val(),
    }
}

function renderMessage(str) {
    const messageObj = getMessage(str)
    const messageHtml = getMessageHtml(messageObj)
    $chat.append(messageHtml)

}

function getMessage(message) {
    return JSON.parse(message.data)
}

function getMessageHtml(obj) {
    return `
    <li>
        ${obj.username}: ${obj.message}
    </li>
    `
}

function clearForm() {
    $messageInput.val('');
}