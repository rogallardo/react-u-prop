import React, { useEffect, useState } from 'react'
import UserList from '../UserList/UserList'
import './UserListContainer.css'
import { collection, where, getDocs, getFirestore, query } from 'firebase/firestore'
import CircularProgress from '@mui/material/CircularProgress';
import { useContext } from 'react';
import { Auth } from '../AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';




export default function UserListContainer() {
  const { userLog, adminUser, userInfo, cerrarSesion } = useContext(Auth)
  const [usersList, setUsersList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [userLogCheck, setUserLogCheck] = useState(null)
  const navigate = useNavigate()


  useEffect(() => {
     if(userLog === true ){
      if(adminUser === true){
        usersRequest()
      }else if(adminUser === false){
        usersRequestDemo()
      } 
    }  
    setTimeout(()=>{
      if(userLog === false){
        setUserLogCheck(false)
      }
    }, 4000)
  }, [adminUser])

  useEffect(() => {
   setTimeout(()=>{
     if(userLog === false && userLogCheck === false){
       navigate('/login')
     }
   }, 7000)
 }, [userLogCheck])
  


  function usersRequest() {
    console.log("llamado a API userListContainer")
    const db = getFirestore();

    const collectionRef = collection(db, 'users');


    let collectionFound = new Promise((res, rej) => {
      setTimeout(() => { res(getDocs(collectionRef)) }, 1000)
    })

    collectionFound
      .then((res) => {
        const arrNormalizado = res.docs.map((user) => ({ ...user.data(), id: user.id }));
        setUsersList(arrNormalizado);
      })
      .catch((rej) => {
        setError(true);

        console.log("error de carga")

      })
      .finally(() => {
        setLoading(false);
      })

  }
  function usersRequestDemo() {

    const db = getFirestore();
    const collectionRef = collection(db, 'usersDemo');


    let collectionFound = new Promise((res, rej) => {
      setTimeout(() => { res(getDocs(collectionRef)) }, 1000)
    })

    collectionFound
      .then((res) => {
        const arrNormalizadoDemo = res.docs.map((user) => ({ ...user.data(), id: user.id }));
        setUsersList(arrNormalizadoDemo);
      })
      .catch((rej) => {
        setError(true);

        console.log("error de carga")

      })
      .finally(() => {
        setLoading(false);
      })

  }






  /* } else{
     const collectionFiltrada = query(collectionRef, where('status', '==', statusId));
     let arrayFiltrado = new Promise((resolve, reject)=>{
       setTimeout(()=>{ resolve(getDocs(collectionFiltrada))}, 2000)
     })

     arrayFiltrado.then((res)=> {
       const arrNormalizado = res.docs.map((user)=>({...user.data(), id: user.id}));
       setUsersList(arrNormalizado);
     })
     .catch((error)=>{
       setError(true);
     })
     .finally(()=>{
       setLoading(false);
     })
   }
 
 }, [statusId]);*/
  return (
    <>

      {
        loading ?
          <div className='loadingPage'>
            <CircularProgress />
          </div>
          :
          <UserList usersList={usersList} />
      }
    </>
  )
}