import React from 'react'

import { useState, useEffect } from 'react'
import './statusSelector.css'
import { CircularProgress } from '@mui/material'
export default function StatusSelector({ status, handleUpdateStatus} ) {
    const [statusEdited, setStatusEdited] = useState(status)
    const [statusColor, setStatusColor] = useState("#F7F7F7")
    const [fontColor, setFontColor] = useState("#F7F7F7")
    useEffect(()=>{
        colorSetter(status)
    }, [])
    const handleStatusEdited = async (value)=>{  
        setStatusEdited("Cargando")  
        setStatusColor('white')   
        setFontColor('grey')
        const msg = await handleUpdateStatus(value)
        if(msg === 'ok'){
            colorSetter(value)
            setStatusEdited(value)
     }else{
        setStatusEdited(status)
        colorSetter(status)
     } 
    }
   
    const colorSetter = (status) =>{    
        if (status === "Sin contactar"){
            setStatusColor("#D7D7D7")
            setFontColor('#9C9C9C')
                
        }else if(status === "Contactado"){
            setStatusColor("#FFFDCC")
            setFontColor('#EDD900')
        }else if(status === "Re-contactado"){
            setStatusColor("#FFECC2")
            setFontColor('#FFB73A')

        }else if(status === "Propuesta"){
            setStatusColor("#DDDCFF") 
            setFontColor('#A28EFF')

        }else if(status === "Visita"){
            setStatusColor("#C8E8FF")
            setFontColor('#4dabf5')

        }else if(status === "Captado"){
            setStatusColor("#D2EBD3")
            setFontColor('#83B386')
        }else if(status === "Rechazado"){
            setStatusColor("#F5D0CD")
            setFontColor('#E67B72')

        } 
    }

   

     
    return (
        <div className='content-select' style={{cursor: 'pointer'}}>            
            <select style={{color:fontColor,  backgroundColor:statusColor, cursor: 'pointer'}}value={statusEdited} onChange={(e)=>{handleStatusEdited(e.target.value)}}>
            {statusEdited !== "Cargando" ? null : <option value="Cargando" >Cargando...</option>}
                <option value="Sin contactar">Sin contactar</option>
                <option value="Contactado">Contactado</option>
                <option value="Re-contactado">Re-contactado</option>
                <option  value="Propuesta">Propuesta</option>
                <option  value="Visita">Visita</option>
                <option  value="Captado">Captado</option>
                <option  value="Rechazado">Rechazado</option>
            </select>           
        </div>
    )
}
