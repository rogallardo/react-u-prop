import React from 'react'
import ReactWhatsapp from 'react-whatsapp';
import './Test.css';
import { useState, useEffect } from 'react'

export default function Test( { user, id, name, googleName, city, phone, link, status, settings}) {
   const [inMsg, setInMsg] = useState(settings.inicialMsg)
   const [inMsgSecond, setInMsgSecond] = useState(settings.inicialMsgSecondPart)
   const [contMsg, setContMsg] = useState(settings.contactadoMsg)
   const [proMsg, setProMsg] = useState(settings.propuestaMsg)



   const filterStatus = ()=>{
    let mensaje
    if(user.status === "Sin contactar"){
      return mensaje = `${inMsg} ${user.city} ${inMsgSecond}`
    } else if (user.status === "Contactado"){
      return mensaje = `${contMsg}`
    } else if (user.status === "Propuesta"){
      return mensaje = `${proMsg}`
    }    
   }
  let msgWp = filterStatus()
  return (
    <>
    <ReactWhatsapp  className='wp-container' number={user.phone} message={msgWp} />
    
    </>
    
  ) 
}
