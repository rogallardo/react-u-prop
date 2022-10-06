import React from 'react'
import ReactWhatsapp from 'react-whatsapp';
import './Test.css';

export default function Test( { user, id, name, googleName, cityLabel, phone, link, status}) {

    const mensaje = `Buenas tardes, te contacto por tu propiedad publicada en ML. Hoy me especializo en ${user.cityLabel} y alrededores. Me gustaría trabajar tu propiedad, podría enviarte una propuesta de trabajo y una publicación de ejemplo. Ante cualquier consulta, estamos en contacto. Ivana Cañete - Agente inmobiliario.`
  return (
    <>
    <ReactWhatsapp  className='wp-container' number={user.phone} message={mensaje} />
    
    </>
    
  ) 
}
