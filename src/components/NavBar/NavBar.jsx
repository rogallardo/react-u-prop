//@ts-check
import React from 'react'
import { useEffect, useState } from 'react'
import { signOut, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { collection, getFirestore, addDoc, updateDoc, doc, deleteDoc, setDoc, getDoc } from 'firebase/firestore';
import './NavBar.css'
import { Link, useNavigate } from 'react-router-dom'


export default function NavBar() {
  const navigate = useNavigate()
  const [userLog, setUserLog] = useState(false)
  const [user, setUser] = useState({})
  const auth = getAuth()



  
  useEffect(() => {
    async function getRol(uid) {
      const db = getFirestore();
      const usersLogRef = doc(db, `usersLogin/${uid}`)
      const docuCifrada = await getDoc(usersLogRef)
      const docuNormalizada = docuCifrada.data()
      return docuNormalizada
    }
    function getRolAndSetUser(user){
        getRol(user.uid).then((role => {
         if(user) {
           setUserLog(true)
          const dataUser = {
            uid: user.uid,
            email: user.email,
            rol: role.rol 
          }
          
          setUser(dataUser)
          console.log(dataUser)
         }
         
        }))
    }
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getRolAndSetUser(user)
        
        
      } else {
        setUser({})
      }
    })
  }, [])

  const cerrarSesion = () => {
    const p = new Promise((res, rej) => {
      async function singOutAndSettUserLog() {
        await signOut(auth)
        setUserLog(false)
      }
      res(singOutAndSettUserLog())
    })
    p.then(res => navigate('/login'))

  }


  return (
    <>
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

      </div>

    </>
  )
}