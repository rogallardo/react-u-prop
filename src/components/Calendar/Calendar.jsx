import React from 'react'
import { useState, useEffect } from 'react'
import { collection, getFirestore, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import './calendar.scss'
import User from '../User/User'
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/300.css';
import { format, addDays } from 'date-fns/esm';
import CreateIcon from '@mui/icons-material/Create';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import { useContext } from 'react';
import { Auth } from '../AuthContext/AuthContext';
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import UsersMatch from '../UsersMatch/UsersMatch'


export default function Calendar({ usersList, settings }) {
    const { userLog, adminUser, userInfo, cerrarSesion } = useContext(Auth)
    const [copyUsersList, setCopyUsersList] = useState(usersList)
    const [newValue, setNewValue] = useState('')
    const [todayFilter, setTodayFilter] = useState(true)
    const [tomorrowFilter, setTomorrowFilter] = useState(false)
    const [usersMatch, setUsersMatch] = useState([])
    const [hoverID, setHoverID] = useState()
    
    const [titleDate, setTitleDate] = useState("Hoy")
  
 



    useEffect(() => {
        coincidenciasBusqueda()
        
    }, [newValue])
    useEffect(() => {
        dateTitleSetter()
    }, [todayFilter])

    const coincidenciasBusqueda = () => {
        if (newValue !== "") {

            if (todayFilter === true && tomorrowFilter === false) {
                let copiaUsersListt = copyUsersList

                let today = new Date()
                let todayFormat = format(today, "MM/dd/yyyy")
                let todayForr = new Date(todayFormat)
                let filterUntilToday = copiaUsersListt.filter(user => new Date(user.nextContactDate) <= todayForr || user.status == "Sin contactar")

                let papa = filterUntilToday.filter((userInList) =>
                    userInList.name.toLowerCase().includes(newValue.toLowerCase()))

                let pepe = filterUntilToday.filter((userInList) =>
                    userInList.phone.toLowerCase().includes(newValue.toLowerCase()))

                let popo = filterUntilToday.filter((userInList) =>
                    userInList.googleName.toLowerCase().includes(newValue.toLowerCase()))


                if (papa.length > 0) {
                    setUsersMatch(papa)
                } else if (papa.length === 0 && popo.length === 0) {
                    setUsersMatch(pepe)
                } else if (pepe.length === 0 && papa.length === 0) {
                    setUsersMatch(popo)
                }
            } else if (todayFilter === false && tomorrowFilter === true) {
                let copiaUsersListt = copyUsersList

                let today = new Date()
                let tomorrow = addDays(today, 1);
                let tomorrowFormated = format(tomorrow, "MM/dd/yyyy")
                let tomorrowForr = new Date(tomorrowFormated)
                let filterUntilTomorrow = copiaUsersListt.filter(user => new Date(user.nextContactDate) <= tomorrowForr || user.status == "Sin contactar")

                setUsersMatch(filterUntilTomorrow)


                let papa = filterUntilTomorrow.filter((userInList) =>
                    userInList.name.toLowerCase().includes(newValue.toLowerCase()))

                let pepe = filterUntilTomorrow.filter((userInList) =>
                    userInList.phone.toLowerCase().includes(newValue.toLowerCase()))

                let popo = filterUntilTomorrow.filter((userInList) =>
                    userInList.googleName.toLowerCase().includes(newValue.toLowerCase()))


                if (papa.length > 0) {
                    setUsersMatch(papa)
                } else if (papa.length === 0 && popo.length === 0) {
                    setUsersMatch(pepe)
                } else if (pepe.length === 0 && papa.length === 0) {
                    setUsersMatch(popo)
                }
            }
        } else if (newValue === "" && todayFilter === true) {
            todayPendings()
        } else if (newValue === "" && tomorrowFilter === true) {
            tomorrowPendings()
        }
    }
    const todayPendings = () => {
        let copyUsersListt = copyUsersList
        let today = new Date()
        let todayFormat = format(today, "MM/dd/yyyy")
        let todayForr = new Date(todayFormat)
        let filterUntilToday = copyUsersListt.filter(user =>  user.status !== "Re-contactado"  && new Date(user.nextContactDate) <= todayForr || user.status == "Sin contactar")
        setTomorrowFilter(false)
        setTodayFilter(true)
        setUsersMatch(filterUntilToday)
        setNewValue('')
    }


    const tomorrowPendings = () => {
        let copyUsersListtt = copyUsersList
        let today = new Date()
        let tomorrow = addDays(today, 1);
        let tomorrowFormated = format(tomorrow, "MM/dd/yyyy")
        let tomorrowForr = new Date(tomorrowFormated)
        let filterUntilTomorrow = copyUsersListtt.filter(user => new Date(user.nextContactDate) <= tomorrowForr || user.status == "Sin contactar")
        setTomorrowFilter(true)
        setTodayFilter(false)
        setUsersMatch(filterUntilTomorrow)
        setNewValue('')

    }

    const dateTitleSetter = ()=>{
        if(todayFilter === true) {
            let today = new Date()
            let todayFormat = format(today, "MM/dd/yyyy")
            let todayDay = new Date(todayFormat).getDay()
            let todayDate = new Date(todayFormat).getDate().toString()
            let todayMonth = new Date(todayFormat).getMonth() + 1;
            let todayYear = new Date(todayFormat).getFullYear().toString()
            let dia = ""
            let mes = ""
            if(todayDay === 1){ 
                dia = "lunes"
            }else if(todayDay === 2){
                dia = "martes"
            }else if(todayDay === 3){
                dia = "miércoles"
            }else if(todayDay === 4){
                dia = "jueves"
            }else if(todayDay === 5){
                dia = "viernes"
            }else if(todayDay === 6){
                dia = "sábado"
            }else if(todayDay === 0){
                dia = "domingo"
            }
            if(todayMonth === 1){
                mes = "Enero"
            }else if (todayMonth === 2){
                mes = "Febrero"
            }else if (todayMonth ===3){
                mes = "Marzo"
            }else if (todayMonth ===4){
                mes = "Abril"
            }else if (todayMonth ===5){
                mes = "Mayo"
            }else if (todayMonth ===6){
                mes = "Junio"
            }else if (todayMonth ===7){
                mes = "Julio"
            }else if (todayMonth ===8){
                mes = "Agosto"
            }else if (todayMonth ===9){
                mes = "Septiembre"
            }else if (todayMonth ===10){
                mes = "Octubre"
            }else if (todayMonth ===11){
                mes = "Noviembre"
            }else if (todayMonth ===12){
                mes = "Diciembre"
            }
            let fechaHoy =  `Hoy, ${dia} ${todayDate} de ${mes} `
            setTitleDate(fechaHoy)

        }else if (todayFilter === false){
            let today = new Date()
        let tomorrow = addDays(today, 1);
        let tomorrowFormated = format(tomorrow, "MM/dd/yyyy")
        let tomorrowForr = new Date(tomorrowFormated)
            let tomorrowDay = new Date(tomorrowFormated).getDay()
            let tomorrowDate = new Date(tomorrowFormated).getDate().toString()
            let tomorrowMonth = new Date(tomorrowFormated).getMonth() + 1;
            let tomorrowYear = new Date(tomorrowFormated).getFullYear().toString()
            let dia = ""
            let mes = ""
            if(tomorrowDay === 1){ 
                dia = "lunes"
            }else if(tomorrowDay === 2){
                dia = "martes"
            }else if(tomorrowDay === 3){
                dia = "miércoles"
            }else if(tomorrowDay === 4){
                dia = "jueves"
            }else if(tomorrowDay === 5){
                dia = "viernes"
            }else if(tomorrowDay === 6){
                dia = "sábado"
            }else if(tomorrowDay === 0){
                dia = "domingo"
            }
           
            if(tomorrowMonth === 1){
                mes = "Enero"
            }else if (tomorrowMonth === 2){
                mes = "Febrero"
            }else if (tomorrowMonth ===3){
                mes = "Marzo"
            }else if (tomorrowMonth ===4){
                mes = "Abril"
            }else if (tomorrowMonth ===5){
                mes = "Mayo"
            }else if (tomorrowMonth ===6){
                mes = "Junio"
            }else if (tomorrowMonth ===7){
                mes = "Julio"
            }else if (tomorrowMonth ===8){
                mes = "Agosto"
            }else if (tomorrowMonth ===9){
                mes = "Septiembre"
            }else if (tomorrowMonth ===10){
                mes = "Octubre"
            }else if (tomorrowMonth ===11){
                mes = "Noviembre"
            }else if (tomorrowMonth ===12){
                mes = "Diciembre"
            }
            let fechaManana =  `Mañana, ${dia} ${tomorrowDate} de ${mes} `
            setTitleDate(fechaManana)
        }
    }

    const handleNewValue = (e) => {
        setNewValue(e.target.value)
    }

    const handleRefreshDelete =(id)=>{
        let updatedUsersClonedDelete = copyUsersList.filter(user => user.id !== id)
        setCopyUsersList(updatedUsersClonedDelete)
       let updatedUsersMatchDelete  = usersMatch.filter(user => user.id !== id)
       setUsersMatch(updatedUsersMatchDelete)
    }


    return (
        <>
     
            <div className='calendar-flex-container'>


                <div className='menu-container-calendar'>
                    <div className='titleDate-Date-container'>
                        <div className='titleDate-container'>
                        <Typography component={'span'} variant={'body2'} >
                                <p className='titleDate'>{titleDate}</p>
                            </Typography>
                        </div>
                        <div className='date-container'>
                        <Typography component={'span'} variant={'body2'} >
                                <p className='subtitleDate'>Pendientes</p>
                            </Typography>
                        </div>

                    </div>
                    {
                        todayFilter ? 

                      <div className='btnsDate-calendar' onClick={() => { tomorrowPendings() }}>
                    <Typography component={'span'} variant={'body2'} >
                            <p className='titleBtn-calendar'>Ver mañana</p>
                        </Typography>
                    </div> 
                    :  
                    <div className='btnsDate-calendar' onClick={() => { todayPendings() }}>
                    <Typography component={'span'} variant={'body2'} >
                            <p className='titleBtn-calendar'>Ver hoy</p>
                        </Typography>
                    </div>
                    }
                    

                </div>

                <UsersMatch usersMatch={usersMatch} settings={settings} handleRefreshDelete={handleRefreshDelete} usersPerPage={10}/>

            </div>



        </>


    )

}
