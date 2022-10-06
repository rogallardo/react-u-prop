import React from 'react'

import { useState, useEffect } from 'react'
import './statusSelector.css'
export default function StatusSelector({handleStatusEdited, statusEdited}) {
    
    const [statusColor, setStatusColor] = useState("white")
   

    useEffect(() => {
   
        colorSetter()
       
    }, [statusEdited])
    


    const colorSetter = () =>{

        
        if (statusEdited === "Sin contactar"){
            setStatusColor("#64748B")
        }else if(statusEdited === "Contactado"){
            setStatusColor("#ffeb3b")
        }else if(statusEdited === "Re-contactado"){
            setStatusColor("#ffc107")
        }else if(statusEdited === "Propuesta"){
            setStatusColor("#ff9800")    
        }else if(statusEdited === "Visita"){
            setStatusColor("#4dabf5")
        }else if(statusEdited === "Captado"){
            setStatusColor("#4caf50")
        }else if(statusEdited === "Rechazado"){
            setStatusColor("#ef5350")
        }
      
       
    }

   

     
    return (
        <div className='content-select'>
            
	<select style={{color:"black", borderColor:statusColor, backgroundColor:statusColor}}value={statusEdited} onChange={handleStatusEdited}>
		<option style={{color:"grey", textAlign:"center", padding:"3px", backgroundColor:"white"}}value="Sin contactar">SIN CONTACTAR</option>
		<option style={{color:"grey", textAlign:"center", padding:"3px", backgroundColor:"white"}}value="Contactado">CONTACTADO</option>
        <option style={{color:"grey", textAlign:"center", padding:"3px", backgroundColor:"white"}}value="Re-contactado">RE-CONTACTADO</option>
        <option  style={{color:"grey", textAlign:"center", padding:"3px", backgroundColor:"white"}}value="Propuesta">PROPUESTA</option>
        <option  style={{color:"grey", textAlign:"center", padding:"3px", backgroundColor:"white"}}value="Visita">VISITA</option>
        <option  style={{color:"grey", textAlign:"center", padding:"3px", backgroundColor:"white"}}value="Captado">CAPTADO</option>
		<option  style={{color:"grey", textAlign:"center", padding:"3px", backgroundColor:"white"}}value="Rechazado">RECHAZADO</option>
	</select>
	
</div>
    )
}
