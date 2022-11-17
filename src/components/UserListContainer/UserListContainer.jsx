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
  const [settings, setSettings] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (userLog === true) {
      if (adminUser === true) {
        usersRequest()
        
      } else if (adminUser === false) {
        usersRequestDemo()
        
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


  function usersRequest() {
    getSettings()
    console.log("llamado a API userListContainer")
    const db = getFirestore();
    const collectionRef = collection(db, 'users');
    let collectionFound = new Promise((res, rej) => {
      setTimeout(() => { res(getDocs(collectionRef)) }, 1500)
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
    getSettings()
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

  const fetchingSettings = () => {
    return new Promise((res, rej) => {
      const db = getFirestore();
      const collectionRefSettings = collection(db, 'settings');
      setTimeout(() => {
        res(getDocs(collectionRefSettings))
      }, 1000);
    })
  }
  const getSettings = async () => {
    try {
      const fetchData = await fetchingSettings()
      const arrNormalizado = fetchData.docs.map((setting) => ({ ...setting.data() }));
      setSettings(arrNormalizado[0]);
     

    } catch (error) {
      console.log("error")
    }

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
          <UserList usersList={usersList} settings={settings} />
      }
    </>
  )
}