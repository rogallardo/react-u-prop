//@ts-check
import React from 'react'
import { useEffect, useState } from 'react'
import { signOut, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { collection, getFirestore, addDoc, updateDoc, doc, deleteDoc, setDoc, getDoc } from 'firebase/firestore';
import './NavBar.css'
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Auth } from '../AuthContext/AuthContext';


export default function NavBar() {

  const { userLog, adminUser, userInfo, cerrarSesion } = useContext(Auth)
  const [hideMenu, setHideMenu] = useState(true)
  const initializeNavBar = () => {
    if (userLog === false) {
      setHideMenu(true)
    } else {
      setHideMenu(false)
    }
  }
  useEffect(() => {
initializeNavBar()
  }, [userLog])



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
            adminUser ?
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