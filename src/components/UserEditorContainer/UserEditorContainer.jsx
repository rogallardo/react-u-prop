import React, { useState, useEffect } from 'react'
import {doc, getDoc, getFirestore} from 'firebase/firestore';
import CircularProgress from '@mui/material/CircularProgress';
import { useContext } from 'react';
import { Auth } from '../AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom"
import UserEditor from '../UserEditor/UserEditor';

export default function ItemDetailContainer() {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const {userId} = useParams();
    const { userLog, adminUser, userInfo, cerrarSesion } = useContext(Auth)
    const [userLogCheck, setUserLogCheck] = useState(null)
    const navigate = useNavigate()



  useEffect(() => {
    if (userLog === true) {
      if (adminUser === true) {
        fetchingUser()
        
      } else if (adminUser === false) {
        fetchingUserDemo()
        
      }
    }
    setTimeout(() => {
      if (userLog === false) {
        setUserLogCheck(false)
      }
    }, 5000)
  }, [adminUser])

  useEffect(() => {
    setTimeout(() => {
      if (userLog === false && userLogCheck === false) {
        navigate('/login')
      }
    }, 10000)
  }, [userLogCheck])

    const fetchingUser = ()=>{
       const db = getFirestore();

      const userToEditRef = doc(db, 'users', userId);
      let fetchingUserPromise = new Promise((resolve, rej)=>{
          setTimeout(()=>{resolve(getDoc(userToEditRef)) }, 2000)
      })
      
      fetchingUserPromise
      .then((snapshot)=>{
          setUser({...snapshot.data(), id: snapshot.id});
      })
      .catch((error)=> {
          setError(true);
      })
      .finally(()=>{
          setLoading(false);
      })
    }

    const fetchingUserDemo = ()=>{
      const db = getFirestore();
      
     const userToEditRef = doc(db, 'usersDemo', userId);
     let fetchingUserPromise = new Promise((resolve, rej)=>{
         setTimeout(()=>{resolve(getDoc(userToEditRef)) }, 2000)
     })
     
     fetchingUserPromise
     .then((snapshot)=>{
         setUser({...snapshot.data(), id: snapshot.id});
     })
     .catch((error)=> {
         setError(true);
     })
     .finally(()=>{
         setLoading(false);
     })
   }
    
    
  return (
    <div>
        {
            loading?
            <div className='loadingPage'>
            <CircularProgress />
          </div>
            : 
            <UserEditor user={user} adminUser={adminUser}/>
        }
    </div>
  )
}