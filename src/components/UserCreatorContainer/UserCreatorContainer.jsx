import React from 'react'
import {collection, where, getDocs, getFirestore, query} from 'firebase/firestore'
import UserCreator from '../UserCreator/UserCreator'
import { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import './userCreatorContainer.css'; 
import { useContext } from 'react';
import { Auth } from '../AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
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

export default function UserCreatorContainer() {
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


  return (
    <>
  
    <div>
    {
        loading?
        <div className='loadingPage'>
            <CircularProgress />
        </div>
        : 
        <UserCreator usersList={usersList} settings={settings}/> 
    }
</div>
</>
  )
}
