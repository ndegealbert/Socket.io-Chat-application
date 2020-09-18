import  React,{useState,useEffect,useRef} from  'react'
import queryString  from 'query-string'
import useSocket from 'use-socket.io-client'

import Input  from '../Input/Input'
import Messages  from  '../Messges/Message'


import  './Chat.css'
import InfoBar from '../inforBar/inforbar'
const Chat = ({location}) =>{
    const [name,setName]=useState('')
    const[room,setRoom] = useState('')
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const  ENDPOINT = 'https://react-node-socket-chat-app.herokuapp.com/'

  const  ENDPOINT2 = 'http://localhost:5000/'
    const [socket] =useSocket(ENDPOINT)
    socket.connect()

    useEffect(()=>{
        const {name,room} =  queryString.parse(location.search)
        console.log(name,room)
     
        setName(name)
        setRoom(room)  
        socket.emit('join',{name,room})

        socket.on('message', message => {
            setMessages(messages => [ ...messages, message ]);
          });

        return ()=>{
            socket.emit('disconnect')
            socket.off()
        }

    },[ENDPOINT,location.search])

    const sendMessage = (event) => {
        event.preventDefault()
        if(message) {
          socket.emit('sendMessage', message, () => setMessage(''));
        }

        
      }

    console.log(message)
    console.log(messages)
   
    return(
        <div className="outerContainer ">
            <div className="container">
                <InfoBar room={room}/>
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    )
}
export default Chat
