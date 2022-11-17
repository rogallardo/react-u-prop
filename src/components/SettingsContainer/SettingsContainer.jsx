import React, { useEffect, useState } from 'react'
import Settings from '../Settings/Settings'

import { collection, where, getDocs, getFirestore, query } from 'firebase/firestore'
import CircularProgress from '@mui/material/CircularProgress';
import { useContext } from 'react';
import { Auth } from '../AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';



export default function SettingsContainer() {
  const { userLog, adminUser, userInfo, cerrarSesion } = useContext(Auth)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [userLogCheck, setUserLogCheck] = useState(null)
  const [settings, setSettings] = useState([])
  const[usersList, setUsersList]= useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (userLog === true) {
      if (adminUser === true) {
        getSettings()
      } else if (adminUser === false) {

        getSettingsDemo()
      }
    }
    setTimeout(() => {
      if (userLog === false) {
        setUserLogCheck(false)
      }
    }, 10000)
  }, [adminUser])

  useEffect(() => {
    setTimeout(() => {
      if (userLog === false && userLogCheck === false) {
        navigate('/login')
      }
    }, 10000)
  }, [userLogCheck])


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
      setLoading(false)

    } catch (error) {
      console.log("error")
    }

  }



  const fetchingSettingsDemo = () => {
    return new Promise((res, rej) => {
      const db = getFirestore();
      const collectionRefSettings = collection(db, 'settingsDemo');
      setTimeout(() => {
        res(getDocs(collectionRefSettings))
      }, 1000);
    })
  }
  const getSettingsDemo = async () => {
    try {
      const fetchData = await fetchingSettingsDemo()
      const arrNormalizado = fetchData.docs.map((settingDemo) => ({ ...settingDemo.data() }));
      setSettings(arrNormalizado[0]);
      setLoading(false)

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
          <Settings  settings={settings} adminUser={adminUser}/>
      }

    </>
  )
} 