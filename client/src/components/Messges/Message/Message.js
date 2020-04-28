import React  from  'react'
import ReactEmoji  from 'react-emoji'
import "./Message.css"

const  Message =({message:{user,text},name})=>{
    let isSentbyCurrentUser = false
    const trimedName = name.trim().toLowerCase()
    if(user===trimedName){
        isSentbyCurrentUser=true
    }
    return(
        isSentbyCurrentUser
        ?(
            <div className="messageContainer justifyEnd">
                <p className="sentTest pr-10 ">{trimedName}</p>
                <div className="messageBox backgroundBlue">
                  <p className="messageText colorWhite">{ReactEmoji.emojify(text) }</p>

                </div>

            </div>

        )
        :(
            <div className="messageContainer justifStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{ReactEmoji.emojify(text) }</p>
            </div>
            <p className="sentTest pl-10 ">{trimedName}</p>
        </div>


        )
       
        
    )
}

export default Message 