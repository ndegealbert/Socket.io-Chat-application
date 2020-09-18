const  express = require('express')
const  socketio = require('socket.io')
const  http =  require('http')
const cors = require('cors')

const  {addUser,removeUser,getUser ,getUserRomm  }  = require('./users')

//Router 
const  router =  require('./router')
const PORT = process.env.PORT || 5000



const  app = express()
app.use(cors())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
const Server = http.createServer(app)
const io = socketio(Server)

io.on('connection',(socket)=>{
    socket.on('join',({name,room})=>{
        console.log(name,room)

        if(name && room){
        const {error,user } = addUser({id:socket.id,name,room})
        console.log(user)
        if(error){
            console.log(error)
        }
        socket.emit('message',{user:'admin',text:`${user.name} Welcome to  the room test `})

        socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name}  has Joined`})
        socket.join(user.room)
        //Emit room details to user Data
        io.to(user.room).emit('roomData',{room:user.room,users:getUserRomm(user.room)})

        }    
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        console.log(socket.id)
    
        io.to(user.room).emit('message', { user: user.name, text: message });
        io.to(user.room).emit('roomData', { room: user.room, users:getUserRomm(user.room)});
    
        callback();
      });
    

        socket.on('disconnect',()=>{
            console.log("User Left")
            const user=removeUser(socket.id)
            if(user){
                io.to(user.room).emit('message',{user:'admin', text:`${user.name} has left`})
            }
    })

})
app.use(router )
Server.listen(process.env.PORT || 5000, () => console.log(`Server has started at  5000.`));
