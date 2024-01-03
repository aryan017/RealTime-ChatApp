const chatForm=document.getElementById('chat-form')
const chatMessage=document.querySelector('.chat-messages')
const socket=io()

// get username and room from URL
const {username,room} = Qs.parse(location.search,{
    ignoreQueryPrefix: true
})

socket.emit('joinRoom',({username,room}));

socket.on('message', (message) => {
    console.log(message);
    outputMessage(message);

    // scroll Down
    chatMessage.scrollTop=chatMessage.scrollHeight;
})

chatForm.addEventListener('submit',(e) => {
    e.preventDefault();

    const msg=e.target.elements.msg.value;

    socket.emit('chatMessage',msg);

    e.target.elements.msg.value='';
    e.target.elements.msg.focus();
})

// OutPut Message to DOM

function outputMessage(message){
    const div=document.createElement('div');
    div.classList.add('message');
    div.innerHTML=`<p class="meta">${message.username}<span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`
    document.querySelector('.chat-messages').append(div);
}