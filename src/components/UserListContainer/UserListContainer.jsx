import React, { useEffect, useState } from 'react'
import UserList from '../UserList/UserList'
import './UserListContainer.css'
import { useParams, Link } from "react-router-dom"
import {collection, where, getDocs, getFirestore, query} from 'firebase/firestore'
import CircularProgress from '@mui/material/CircularProgress';
import NavBar from '../NavBar/NavBar'




export default function UserListContainer() {
  const [usersList, setUsersList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const {statusId} = useParams();
  
  useEffect(() =>{
    console.log("llamado a API userListContainer")
    const db = getFirestore();
    const collectionRef = collection(db, 'users');
     
    if (!statusId){
      let collectionFound = new Promise((res, rej)=>{
        setTimeout(()=>{res(getDocs(collectionRef))}, 1000)
      })

      collectionFound
      .then((res)=> {
        const arrNormalizado = res.docs.map((user)=>({...user.data(), id: user.id}));
        setUsersList(arrNormalizado);
      })
      .catch((rej)=>{
        setError(true);
        
    console.log("error de carga")
        
      })
    .finally(()=>{
      setLoading(false);
    })
    } else{
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
 
  }, [statusId]);
  return  (
 <>
    
    {
        loading?
        <div className='loadingPage'>
            <CircularProgress />
        </div>
        : 
        <UserList usersList={usersList}/> 
    }
</>
  )
}