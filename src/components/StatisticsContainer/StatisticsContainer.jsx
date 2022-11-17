import React, { useEffect, useState } from 'react'
import Statistics from '../Statistics/Statistics'
import './statisticsContainer.css'
import { collection, where, getDocs, getFirestore, query } from 'firebase/firestore'
import CircularProgress from '@mui/material/CircularProgress';
import { useContext } from 'react';
import { Auth } from '../AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';



export default function StatisticsContainer() {
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
        getSettings()
      } else if (adminUser === false) {
        usersRequestDemo()
        getSettings()
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



      {
        loading ?
          <div className='loadingPage'>
            <CircularProgress />
          </div>
          :
          <Statistics usersList={usersList} settings={settings} />
      }

    </>
  )
} 