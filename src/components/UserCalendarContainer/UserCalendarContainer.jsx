import React, { useEffect, useState, useContext } from 'react'
import './UserCalendarContainer.css'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import CircularProgress from '@mui/material/CircularProgress';
import { Auth } from '../AuthContext/AuthContext';
import UserCalendar from '../UserCalendar/UserCalendar';
import { format, addDays } from 'date-fns/esm';

export default function UserCalendarContainer() {
  const { adminUser, userCollection, settingsCollection} = useContext(Auth)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [settings, setSettings] = useState([])
  const [usersPendings, setUsersPendings] = useState([])

  useEffect(() => {
    if(adminUser != null){
      fetchData() 
    }
  }, [adminUser])
  
  async function fetchData(){
    try {  
        await getSettings()
        await getUsers() 
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
      todayPendings(usersMapped)
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

  const todayPendings = (usersList) => {
    let today = new Date()
    let todayFormat = format(today, "MM/dd/yyyy")
    let todayForr = new Date(todayFormat)
    let filterUntilToday = usersList.filter(user =>  user.status !== "Re-contactado" && user.status !== "Sin contactar" && new Date(user.nextContactDate) <= todayForr)
    let filterSinContactar = usersList.filter(user => user.status === "Sin contactar")
    let filteredUsers = [...filterSinContactar, ...filterUntilToday]
    setUsersPendings(filteredUsers)
}

  return (
    <>
      {
        loading ?
          <div className='loadingPage'>
            <CircularProgress />
          </div>
          :
          <UserCalendar usersList={usersPendings} settings={settings} />
      }
    </>
  )
}