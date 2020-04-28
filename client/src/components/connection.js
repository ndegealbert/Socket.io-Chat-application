import React,{useEffect}  from  'react'



const  Socket  = ()=>{
const  ENDPOINT = 'localhost:5000'
useEffect(()=>{
    const socket = io( ENDPOINT )
},[ENDPOINT])
}

export default Socket