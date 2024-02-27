import React from 'react'
import User from '../User/User'
import './UsersMatch.scss'
import useMediaQuery from '@mui/material/useMediaQuery';

export default function UsersMatch({ usersMatch, settings, handleRefreshDelete, usersPerPage }) {
    const mobile = useMediaQuery('(max-width: 700px)')
  return (
    <>
    {
        !mobile ? 
        (
            <>
    <div className='usersMatch-container' 
    style={{height: `calc(2.85rem * (${usersPerPage} + 1))`}}
    >
    <div className='list-itemsContainer'>
        <div className='list-item'>Nombre</div>
        <div className='list-item'>Ciudad</div>
        <div className='list-item'>Contacto Google</div>
        <div className='list-item'>Teléfono</div>
        <div className='list-item'>Link</div>
        <div className='list-item'>Estado</div>
        <div className='list-item'>Whatsapp</div>
        <div className='list-item'>Acciones</div>
    </div>
    {   
        usersMatch.length > 0 ?                                             
        usersMatch.map((user) => (
                <div key={user.id} className='userComponent-container' >
                    <User  handleRefreshDelete={handleRefreshDelete} settings={settings} user={user}  id={user.id} name={user.name} city={user.city} googleName={user.googleName} phone={user.phone} link={user.link} status={user.status} lastContactDate={user.lastContactDate} nextContactDate={user.nextContactDate} />                     
                </div>
            ))
            :
            <div className='noResultsTitle-container'>
                <h4 >No hay resultados</h4>
            </div>                          
    }
</div>
            </>
        ) : 
        (
            <>
                <div className='usersMatch-container-mobile' style={{height: `calc(3rem * (${usersPerPage} + 1))`}}>
                    <div className='list-itemsContainer'>
                        <div className='list-item name'>Contacto Google</div>
                        <div className='list-item'>Link</div>
                        <div className='list-item'>Estado</div>
                        <div className='list-item'>Wp</div>
                    </div>
    {   
        usersMatch.length > 0 ?                                             
        usersMatch.map((user) => (
                <div key={user.id} className='userComponent-container' >
                    <User  handleRefreshDelete={handleRefreshDelete} settings={settings} user={user}  id={user.id} name={user.name} city={user.city} googleName={user.googleName} phone={user.phone} link={user.link} status={user.status} lastContactDate={user.lastContactDate} nextContactDate={user.nextContactDate} />                     
                </div>
            ))
            :
            <div className='noResultsTitle-container'>
                <h4 >No hay resultados</h4>
            </div>                          
    }
</div>
            </>
        )
    }
    </>

  )
}
