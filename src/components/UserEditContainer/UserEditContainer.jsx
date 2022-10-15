import React from 'react'

import {collection, where, getDocs, getFirestore, query} from 'firebase/firestore'
import UserEdit from '../UserEdit/UserEdit'
import { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import './userEditContainer.css'
import NavBar from '../NavBar/NavBar';


export default function UserEditContainer() {
    const [usersList, setUsersList] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    /*useEffect(() =>{
      const db = getFirestore();
      const collectionRef = collection(db, 'products');
       
      if (!categoryId){
        let collectionFound = new Promise((res, rej)=>{
          setTimeout(()=>{res(getDocs(collectionRef))}, 1000)
        })
  
        collectionFound
        .then((res)=> {
          const arrNormalizado = res.docs.map((item)=>({...item.data(), id: item.id}));
          setProductList(arrNormalizado);
        })
        .catch((error)=>{
          setError(true)
          console.log("error");
        })
      .finally(()=>{
        setLoading(false);
      })
      } else{
        const collectionFiltrada = query(collectionRef, where('category', '==', categoryId));
        let arrayFiltrado = new Promise((resolve, reject)=>{
          setTimeout(()=>{ resolve(getDocs(collectionFiltrada))}, 2000)
        })
  
        arrayFiltrado.then((res)=> {
          const arrNormalizado = res.docs.map((item)=>({...item.data(), id: item.id}));
          setProductList(arrNormalizado);
        })
        .catch((error)=>{
          setError(true);
        })
        .finally(()=>{
          setLoading(false);
        })
      }
    }, [categoryId]);*/
   
  
  useEffect(() =>{
    console.log("llamado a API UserEditContainer")
    const db = getFirestore();
    const collectionRef = collection(db, 'users');
      let collectionFound = new Promise((res, rej)=>{
        setTimeout(()=>{res(getDocs(collectionRef))}, 1000)
      })

      collectionFound
      .then((res)=> {
        const arrNormalizado = res.docs.map((user)=>({...user.data(), id: user.id}));
        setUsersList(arrNormalizado);
      })
      .catch((error)=>{
        setError(true);
        console.log("error de carga")
      
   
       
      })
    .finally(()=>{
      setLoading(false);
    })
    
    
  }, []);
  return (
    <>
    <NavBar />
    <div>
    {
        loading?
        <div className='userListContainer'>
            <CircularProgress />
        </div>
        : 
        <UserEdit usersList={usersList}/> 
    }
</div>
</>
  )
}
