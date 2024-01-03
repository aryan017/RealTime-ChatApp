const path=require('path')
const http=require('http')
const express=require('express');
const socketIo=require('socket.io');
const formatMessage=require('./utils/message')

const app=express();
const server=http.createServer(app);
const io=socketIo(server);

// Set Static folder
app.use(express.static(path.join(__dirname,'public')));

const PORT=3000 || process.env.PORT
const name="chatgpt";

io.on('connection',(socket) => {

    // User is Joining the room
    socket.on('joinRoom',({username,room}) => {
         // Welcome the current User
   socket.emit('message',formatMessage(name,'Welcome to chatBot'))

   // Broadcast when the user connects
   socket.broadcast.emit('message',formatMessage(name,'connects'))

    })
   // Listen for  chatMessages
   socket.on('chatMessage',msg => {
    io.emit('message',formatMessage('User',msg))
   })

   //Run when the user Disconnects
   socket.on('disconnect', () => {
    io.emit('message',formatMessage(name,'disconnects'))
   })
});

server.listen(PORT,() => {
    console.log(`server runiing on ${PORT}`)
})