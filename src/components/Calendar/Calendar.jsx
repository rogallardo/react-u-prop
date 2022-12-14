import React from 'react'
import { useState, useEffect } from 'react'
import { collection, getFirestore, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import './calendar.css'
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
        let filterUntilToday = copyUsersListt.filter(user => new Date(user.nextContactDate) <= todayForr || user.status == "Sin contactar")
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
                dia = "mi??rcoles"
            }else if(todayDay === 4){
                dia = "jueves"
            }else if(todayDay === 5){
                dia = "viernes"
            }else if(todayDay === 6){
                dia = "s??bado"
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
                dia = "mi??rcoles"
            }else if(tomorrowDay === 4){
                dia = "jueves"
            }else if(tomorrowDay === 5){
                dia = "viernes"
            }else if(tomorrowDay === 6){
                dia = "s??bado"
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
            let fechaManana =  `Ma??ana, ${dia} ${tomorrowDate} de ${mes} `
            setTitleDate(fechaManana)
        }
    }

    const handleNewValue = (e) => {
        setNewValue(e.target.value)
    }

    const handleAnimationDelete = (id) => {
        setHoverID(id);
    }

    const removeItem = (id) => {

        let resp = copyUsersList.filter((el) => el.id !== id)
        let resp2 = usersMatch.filter((el) => el.id !== id)
        setCopyUsersList(resp)
        setUsersMatch(resp2)
    }
    const alertDelete = (id)=>{
     
        swal({
            title:"Eliminar",
            text:"??Desea eliminar usuario?",
            icon: "warning",
            buttons: ["Cancelar", "Eliminar"]

        }).then(response=>{
            if(response){
                deleteUser(id)
                swal({text:"El usuario ha sido eliminado",
                        icon:"success"
            })
            }
        })
    }
    const deleteUser = async (id) => {
        const db = getFirestore();
        if(adminUser===true){
             
        await deleteDoc(doc(db, "users", id));
        handleAnimationDelete(id)
        setTimeout(() => { removeItem(id) }, 700); 
      
        }else if(adminUser===false){
            await deleteDoc(doc(db, "usersDemo", id));
        handleAnimationDelete(id)
        setTimeout(() => { removeItem(id) }, 700); 
      
        }
      

    }

    return (
        <>
     
            <div className='big-container-calendar'>


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
                            <p className='titleBtn-calendar'>Ver ma??ana</p>
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


                <div className='inputSearch-container-calendar'>
                    <div className='inputSearch-subcontainer-calendar'>
                        <div className='inputSearch-style-calendar'>

                            <Paper
                                component="form"
                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
                            >
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Buscar..."
                                    inputProps={{ 'aria-label': 'search google maps' }}
                                    value={newValue}
                                    onChange={handleNewValue}
                                />
                                <IconButton disabled type="button" sx={{ p: '10px' }} aria-label="search">
                                    <SearchIcon />
                                </IconButton>

                            </Paper>
                        </div>

                    </div>
                </div>



                <div className='list-itemsContainer-calendar'>

                    <div className='list-itemsTitlesContainer-calendar'>
                        <div className='list-item-calendar'>Nombre</div>
                        <div className='list-item-calendar'>Ciudad</div>
                        <div className='list-item-calendar'>Contacto Google</div>
                        <div className='list-item-calendar'>Tel??fono</div>
                        <div className='list-item-calendar'>Link</div>
                        <div className='list-item-calendar'>Estado</div>
                        <div className='list-item-calendar'>Whatsapp</div>
                    </div>

                    <div className='list-itemActionContainer-calendar'>
                        <div className='list-itemAction'>Acciones</div>
                    </div>
                </div>
                <div className='usersMatch-container-calendar'>

                    {
                        usersMatch.length > 0 ?
                            usersMatch.map((user) => (
                                <div className={(user.id === hoverID) ? 'userCoincidenceContainer-AnimationDelete-calendar' : 'userCoincidenceContainer-calendar'} key={user.id}>

                                    <div className={(user.id === hoverID) ? 'userComponentContainer-AnimationDelete' : 'userComponentContainer'} >
                                        <User settings={settings} user={user} key={user.id} id={user.id} name={user.name} googleName={user.googleName} city={user.city} phone={user.phone} link={user.link} status={user.status} lastContactDate={user.lastContactDate} nextContactDate={user.nextContactDate} /> </div>
                                    <div className={(user.id === hoverID) ? 'btn-calendar-container-AnimationDelete' : 'btns-calendar-container'}>

                                        <div className='btn-editar-container-calendar'>
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                title="Edit"
                                                component={Link} to={`/user/${user.id}`}
                                            >
                                                <CreateIcon />
                                            </IconButton>
                                        </div>
                                        <div className='btn-eliminar-container'>
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                title="Delete"
                                                
                                                onClick={()=>{alertDelete(user.id)}}
                                            >
                                                <DeleteIcon />
                                            </IconButton></div>

                                    </div>
                                   


                                </div>
                            ))

                            :
                            <div >No hay resultados</div>
                    }
                </div>

            </div>



        </>


    )

}
