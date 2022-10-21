//@ts-check
import React from 'react'
import { useEffect, useState } from 'react'
import './NavBar.css'
import { useContext } from 'react';
import { Link} from 'react-router-dom'
import { Auth } from '../AuthContext/AuthContext';


export default function NavBar() {

  const { userLog, adminUser, userInfo, cerrarSesion } = useContext(Auth)
  const [hideMenu, setHideMenu] = useState(true)
  const [showAdminMenu, setShowAdminMenu] = useState(false)
  const initializeNavBar = () => {
    if (userLog === false) {
      setHideMenu(true)
    } else {
      setTimeout(()=>{
        setHideMenu(false)
      }, 1000)
      
    }
  }
  useEffect(() => {
initializeNavBar()
  }, [userLog])

  useEffect(() => {
    if(adminUser===true){
      setShowAdminMenu(true)
    }else{
      setShowAdminMenu(false)
    }
  }, [adminUser])
  



  return (
    <>
      {
        !hideMenu &&
        <div className="navbar-container">
          <div ><Link className='brand-container' to={"/"}>U-prop</Link></div>
          {
            userLog ?


              <div className='logOut-btn-container'>
                <button onClick={cerrarSesion} className='logOut-btn'>Cerrar sesión</button>
              </div>

              :

              <span></span>

          }
          {
            showAdminMenu ?
              <div className='logOut-btn-container'>
                <button onClick={cerrarSesion} className='logOut-btn'>Admin</button>
              </div>
              :
              <span></span>


          }

        </div>


      }

    </>
  )
}