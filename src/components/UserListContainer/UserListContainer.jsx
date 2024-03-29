import React, { useEffect, useState, useContext } from 'react'
import UserList from '../UserList/UserList'
import './UserListContainer.css'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import CircularProgress from '@mui/material/CircularProgress';
import { Auth } from '../AuthContext/AuthContext';

export default function UserListContainer() {
  const { adminUser, userCollection, settingsCollection} = useContext(Auth)
  const [usersList, setUsersList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [settings, setSettings] = useState([])

  useEffect(() => {
    if(adminUser != null){
      fetchData() 
    }
  }, [adminUser])
  
  async function fetchData(){
    try {  
      await Promise.all([
        getSettings(),
        getUsers()
      ])
    } catch (error) {
        setError(true)
    } finally {
        setLoading(false)
    }
  }
  async function getUsers() {
    try {
      const db = getFirestore();
      const collectionRef = collection(db, userCollection);
      const { docs } = await getDocs(collectionRef)
      const users = docs.map((user) => ({ ...user.data(), id: user.id }));
      const usersMapped = users.map(user => {
        return{
          ...user, 
          addedOnDate: user.lastContactDate
        }
      })
      console.log(usersMapped)
      setUsersList(usersMapped); 
    } catch (error) {
      console.log("error")
    }   
  }
  async function getSettings() {
    try {
      const db = getFirestore();
      const collectionRef = collection(db, settingsCollection);
      const { docs } = await getDocs(collectionRef)
      const arrNormalizado = docs.map((setting) => ({ ...setting.data() }));
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
          <UserList usersList={usersList} settings={settings} />
      }
    </>
  )
}