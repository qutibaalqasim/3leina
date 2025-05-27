import messageModel from "./DB/models/message.model.js";


const connectedUsers = new Map();

const socketHandler = (io) => {
    io.on('connection', (socket)=>{
        console.log('socket connected:', socket.id);

        socket.on('register', (userId)=>{
            connectedUsers.set(userId, socket.id);
            socket.userId = userId;
        });

        socket.on('sendMessage', async ({from, to, content}) => {
            const message = await messageModel.create({from, to, content});
            const toSocketId = connectedUsers.get(to);
            if (toSocketId) {
                io.to(toSocketId).emit('newMessage', message);
            }
        });

        socket.on('disconnected', ()=>{
            if(socket.userId) {
                connectedUsers.delete(socket.userId);
                console.log('User disconnected:', socket.userId);
            }
        });
    });
}


export default socketHandler;