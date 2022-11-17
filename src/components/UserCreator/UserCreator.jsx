import React from 'react'
import { useState, useEffect } from 'react'
import { collection, getFirestore, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import './userCreator.css'
import User from '../User/User'
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/300.css';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { format, addDays } from 'date-fns/esm';
import CreateIcon from '@mui/icons-material/Create';
import { useContext } from 'react';
import { Auth } from '../AuthContext/AuthContext';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom'
import swal from 'sweetalert'

export default function UserCreator({ usersList, settings }) {
    const { userLog, adminUser, userInfo, cerrarSesion } = useContext(Auth)
    let today = new Date()
    let todayFormated = format(today, "dd/MM/yyyy")
    const [cities, setCities] = useState(settings.cities)
    const [copyUsersList, setCopyUsersList] = useState(usersList)
    const [newName, setNewName] = useState('')
    const [newGoogleName, setNewGoogleName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [newCity, setNewCity] = useState('')
    const [newLink, setNewLink] = useState('')
    const [newStatus, setNewStatus] = useState("Sin contactar")
    const [calendarDate, setCalendarDate] = useState(today)
    const [newLastContactDate, setNewLastContactDate] = useState("-")
    const [newNextContactDate, setNewNextContactDate] = useState("-")

    const [disabledDate, setDisabledDate] = useState(true)
    const [usersMatch, setUsersMatch] = useState([])
    const [animationDelete, setAnimationDelete] = useState(false)
    const [hoverID, setHoverID] = useState()
    
 
  
    
    useEffect(() => {
        citiesSorter()
    }, [])

    useEffect(() => {
       handleNewLastContactDate() 
    }, [calendarDate])

    useEffect(() => {
        nextContactDateSetter()       
    }, [newStatus])

    useEffect(() => {
        coincidenciasNombre()
    }, [newName])


    useEffect(() => {
        coincidenciasNombreGoogle()
    }, [newGoogleName])

    useEffect(() => {
        coincidenciasCiudad()
    }, [newCity])

    useEffect(() => {
        coincidenciasTelefono()
    }, [newPhone])


    const citiesSorter = ()=>{
        let citiesSorted = cities.sort()
        setCities(citiesSorted)
    }

    const coincidenciasNombre = () => {
        if (newName === "") {
            setUsersMatch([])
        } else {
            if (newCity === "") {
                let copiaUsersList = [...copyUsersList]
                let pepe = copiaUsersList.filter((userInList) =>
                    userInList.name.toLowerCase().includes(newName.toLowerCase()))
                setUsersMatch(pepe)
            } else {
                coincidenciasCiudad()
            }
        }
    }


    const coincidenciasNombreGoogle = () => {
        if (newGoogleName === "") {
            coincidenciasNombre()

        } else {
            let copiaUsersList = [...copyUsersList]
            let pepo = copiaUsersList.filter((userInList) =>
                userInList.googleName.toLowerCase().includes(newGoogleName.toLowerCase()))
            setUsersMatch(pepo)
        }
    }

    const coincidenciasTelefono = () => {
        if (newPhone !== "") {
            let copiaUsersListt = copyUsersList
            let pepo = copiaUsersListt.filter((userInList) =>
                userInList.phone == newPhone && ({ userInList }))
            setUsersMatch(pepo)
        }
    }

    const coincidenciasCiudad = () => {
        if (newCity !== "") {
            let copiaUsersListt = [...copyUsersList]
            let pep = copiaUsersListt.filter((userInList) =>
                userInList.name.toLowerCase().includes(newName.toLowerCase()))
            let pepi = pep.filter((userInList) =>
                userInList.city === newCity && ({ userInList }))
            setUsersMatch(pepi)
        } else {
            coincidenciasNombre()
        }
    }

    const handleNewPhone = (e) => {
        setNewPhone(e.target.value)
    }
    const handleNewName = (e) => {
        setNewName(e.target.value)
    }
    const handleNewGoogleName = (e) => {
        setNewGoogleName(e.target.value)
    }
    const handleNewCity = (e) => {
        setNewCity(e.target.value)
    }
    const handleNewStatus = (e) => {
        setNewStatus(e.target.value)
    }

 
    const handleCalendarDate = (newValue) => {
        setCalendarDate(newValue)
        handleNewLastContactDate()
    }

      
    const handleNewLastContactDate = () => {
        
        let calendarDateFormated = format(calendarDate, "MM/dd/yyyy")
       
            setNewLastContactDate(calendarDateFormated)
            if (newStatus === "Contactado") {
                const birthday = addDays(calendarDate, `${settings.contactadoAddDays}`);
                let birthFormat = format(birthday, "MM/dd/yyyy")
                setNewNextContactDate(birthFormat)
               

            } else if (newStatus === "Re-contactado") {
                const birthday = addDays(calendarDate, `${settings.reContactadoAddDays}`);
                let birthFormato = format(birthday, "MM/dd/yyyy")
                setNewNextContactDate(birthFormato)
            } else if (newStatus === "Propuesta") {
                const birthday = addDays(calendarDate, `${settings.propuestaAddDays}`);
                let birthFormatho = format(birthday, "MM/dd/yyyy")
                setNewNextContactDate(birthFormatho)
              
              }  else if (newStatus === "Visita") {
                    const birthday = addDays(calendarDate, `${settings.visitaAddDays}`);
                    let birthFormatho = format(birthday, "MM/dd/yyyy")
                    setNewNextContactDate(birthFormatho)

            } else if (newStatus === "Sin contactar") {
               
                setNewLastContactDate("-")
                setNewNextContactDate("-")

            } else if (newStatus === "Rechazado"){
                    setNewNextContactDate("-")
            } else if (newStatus === "Captado"){
                setNewNextContactDate("-")
            }

    };

    const nextContactDateSetter = () => {
        let calendarDateFormateded = format(calendarDate, "MM/dd/yyyy")       
            setNewLastContactDate(calendarDateFormateded)

        if (newStatus === "Sin contactar") {
            setCalendarDate(today)
            setNewNextContactDate("-")
            setNewLastContactDate("-")
       } else if (newStatus === "Contactado") {       
         const nextDay = addDays(calendarDate, `${settings.contactadoAddDays}`);
            let nextFormat = format(nextDay, "MM/dd/yyyy")
            setNewLastContactDate(calendarDateFormateded)
            setNewNextContactDate(nextFormat)
            console.log(settings.contactadoAddDays)

        } else if (newStatus === "Re-contactado") {
            const nextDay = addDays(calendarDate, `${settings.reContactadoAddDays}`);
            let nextFormated = format(nextDay, "MM/dd/yyyy")
            setNewLastContactDate(calendarDateFormateded)
            setNewNextContactDate(nextFormated)


        } else if (newStatus === "Propuesta") {
            const nextDay = addDays(calendarDate, `${settings.propuestaAddDays}`);
            let nextFormatedo = format(nextDay, "MM/dd/yyyy")
            setNewLastContactDate(calendarDateFormateded)
            setNewNextContactDate(nextFormatedo)

        } else if (newStatus === "Visita") {
            const nextDay = addDays(calendarDate, `${settings.visitaAddDays}`);
            let nextFormatedo = format(nextDay, "MM/dd/yyyy")
            setNewLastContactDate(calendarDateFormateded)
            setNewNextContactDate(nextFormatedo)

        } else if (newStatus === "Rechazado") {           
            setNewLastContactDate(calendarDateFormateded)
            setNewNextContactDate("-")
        } else if (newStatus === "Captado") {           
            setNewLastContactDate(calendarDateFormateded)
            setNewNextContactDate("-")
        }
    }


    const onKeyDown = (e) => {
        e.preventDefault();
    };
    const handleAnimationDelete = (id) => {
        setHoverID(id);


    }


    function addUser() {
        console.log("Grabando API UserEdit")
        const addedUser = {
            name: newName,
            googleName: newGoogleName,
            phone: newPhone,
            city: newCity,
            link: newLink,
            status: newStatus,
            lastContactDate: newLastContactDate,
            nextContactDate: newNextContactDate

            
        }
        const db = getFirestore();
        if(adminUser===true){   
        const usersDoc = collection(db, "users")
        addDoc(usersDoc, addedUser).then(({ id }) => {
            setCopyUsersList([...copyUsersList, { ...addedUser, id: id }])
            setUsersMatch([...usersMatch, { ...addedUser, id: id }])
        })   
        }else if(adminUser===false){
            const usersDoc = collection(db, "usersDemo")
            addDoc(usersDoc, addedUser).then(({ id }) => {
                setCopyUsersList([...copyUsersList, { ...addedUser, id: id }])
                setUsersMatch([...usersMatch, { ...addedUser, id: id }])
            })   
        }
        

        clearForm()
    }

    const clearForm = () => {
        setNewPhone('')
        setNewCity('')
        setNewName('')
        setNewLink('')
        setNewGoogleName('')
        setNewLastContactDate("-")
        setNewNextContactDate("-")
        setNewStatus('Sin contactar')
    }


    /* const updateName = (name, nameEdited, id) => {
         const db = getFirestore();
         const usersDoc = doc(db, "users", id)
         updateDoc(usersDoc, { name: nameEdited })
         name = nameEdited
     }*/

    const removeItem = (id) => {

        let resp = copyUsersList.filter((el) => el.id !== id)
        let resp2 = usersMatch.filter((el) => el.id !== id)
        setCopyUsersList(resp)
        setUsersMatch(resp2)
    }
    const alertDelete = (id)=>{
     
        swal({
            title:"Eliminar",
            text:"¿Desea eliminar usuario?",
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
            <div className='big-container-userEdit'>
            <Typography component={'span'} variant={'body2'} >
                <div className='principalTitle-container'>
                   
                        
                        <h1 className='principalTitle'> Ingrese usuario</h1>
                            
                    
                </div>
                </Typography>

                <div className='inputs-container-userEdit'>
                    <div className='inputs-subcontainer-userEdit'>
                        <div className='input-style-creator'>
                            <TextField overflow='hidden' id="outlined-basic" label="Nombre" variant="outlined" onChange={handleNewName} value={newName} size="small"/>
                        </div>
                        <div className='input-style-creator'>

                            <FormControl size="small" variant="outlined" sx={{ m: 0, width: 200, overflow:"hidden" }}>

                                <InputLabel  size="small" id="demo-simple-select-standard-label" overflow="hidden" >Ciudad</InputLabel>

                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={newCity}
                                    onChange={handleNewCity}
                                    label="Ciudad"
                                    size="small"
                                    overflow="hidden"
                                >
                                    <MenuItem value="">Todas las ciudades</MenuItem> 
                                    {
                                        cities.map((x, y)=>
                                          <MenuItem key={y} value={x}>{x}</MenuItem>   
                                    )
                                    }
                                </Select>
                            </FormControl>
                        </div>
                        <div className='input-style-creator'>
                            <TextField id="outlined-basic" size="small" label="Contacto Google" variant="outlined" onChange={handleNewGoogleName} value={newGoogleName} />

                        </div>
                        <div className='input-style-creator'>
                            <TextField id="outlined-basic" size="small" label="Teléfono" variant="outlined" onChange={handleNewPhone} value={newPhone} />

                        </div>
                        <div className='input-style-creator'>
                            <TextField id="outlined-basic"  size="small" label="Link" variant="outlined" onChange={(e) => setNewLink(e.target.value)} value={newLink} />
                        </div>
                        
                            <LocalizationProvider  size="small"  dateAdapter={AdapterDateFns}>
                            <div className='input-style-creator'>
                                <Stack  size="small"  spacing={3}>
                                    <DesktopDatePicker
                                        disabled={newStatus === "Sin contactar"}
                                        label="Último contacto"
                                        size="small"
                                        inputFormat="dd/MM/yyyy"
                                        value={calendarDate}
                                        onChange={handleCalendarDate}
                                        renderInput={(params) => <TextField  size="small"  onKeyDown={onKeyDown} {...params} />}
                                    />

                                </Stack>
                                </div>
                            </LocalizationProvider>
                       
                        <div className='input-style-creator'>
                            <FormControl   size="small" variant="outlined" sx={{ m: 0, width: 200 }}>
                                <InputLabel id="demo-simple-select-standard-label" size="small" >Estado</InputLabel>
                                <Select
                                size="small"
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={newStatus}
                                    onChange={handleNewStatus}
                                    label="Estado"
                                >
                                    <MenuItem value={"Sin contactar"}>Sin contactar</MenuItem>
                                    <MenuItem value={"Contactado"}>Contactado</MenuItem>
                                    <MenuItem value={"Re-contactado"}>Re-contactado</MenuItem>
                                    <MenuItem value={"Propuesta"}>Propuesta</MenuItem>
                                    <MenuItem value={"Visita"}>Visita</MenuItem>
                                    <MenuItem value={"Captado"}>Captado</MenuItem>
                                    <MenuItem value={"Rechazado"}>Rechazado</MenuItem>
                                </Select>
                            </FormControl>

                        </div>

                        <div >

                            <Fab onClick={addUser}  color="primary" aria-label="add">
                                <AddIcon />
                            </Fab>

                        </div>
                    </div>

                </div>
                <Typography component={'span'} variant={'body2'}  >
                <div className='principalTitle-container'>
                 
                       
                        <h1 className='principalTitle'>  Coincidencias  </h1>
                        
                   
                </div>
                </Typography>

                <div className='list-itemsContainer'>

                    <div className='list-itemsTitlesContainer'>
                        <div className='list-item'>Nombre</div>
                        <div className='list-item'>Ciudad</div>
                        <div className='list-item'>Contacto Google</div>
                        <div className='list-item'>Teléfono</div>
                        <div className='list-item'>Link</div>
                        <div className='list-item'>Estado</div>
                        <div className='list-item'>Whatsapp</div>
                    </div>

                    <div className='list-itemActionContainer'>
                        <div className='list-itemAction'>Acciones</div>
                    </div>
                </div>
                <div className='usersMatch-container'>

                    {
                        usersMatch.length > 0 ?
                            usersMatch.map((user) => (
                                <div className={(user.id === hoverID) ? 'userCoincidenceContainer-AnimationDelete' : 'userCoincidenceContainer'} key={user.id}>

                                    <div className={(user.id === hoverID) ? 'userComponentContainer-AnimationDelete' : 'userComponentContainer'} ><User settings={settings} user={user} key={user.id} id={user.id} name={user.name} googleName={user.googleName} city={user.city} phone={user.phone} link={user.link} status={user.status} lastContactDate={user.lastContactDate} nextContactDate={user.nextContactDate}/> </div>
                                    <div className={(user.id === hoverID) ? 'btns-userEdit-container-AnimationDelete' : 'btns-userEdit-container'}>

                                        <div className='btn-editar-container'>
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
                            <div className='noresults-container'><p>No hay coincidencias</p></div>
                    }
                </div>

            </div>



        </>


    )


}
