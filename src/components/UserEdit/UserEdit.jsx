import React from 'react'
import { useState, useEffect } from 'react'
import { collection, getFirestore, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import './UserEdit.css'
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


export default function UserEdit({ usersList }) {
    const { userLog, adminUser, userInfo, cerrarSesion } = useContext(Auth)
    let today = new Date()
    let todayFormated = format(today, "dd/MM/yyyy")
    const [copyUsersList, setCopyUsersList] = useState(usersList)
    const [newName, setNewName] = useState('')
    const [newGoogleName, setNewGoogleName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [newCity, setNewCity] = useState('')
    const [newCityLabel, setNewCityLabel] = useState('')
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
        cityLabelConverse()
    }, [newCity])

    useEffect(() => {
        coincidenciasTelefono()
    }, [newPhone])

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

    const cityLabelConverse = () => {

        if (newCity === "palermo") {
            setNewCityLabel("Palermo")
        } else if (newCity === "urquiza") {
            setNewCityLabel("Villa Urquiza")
        } else if (newCity === "devoto") {
            setNewCityLabel("Villa Devoto")
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
                const birthday = addDays(calendarDate, 20);
                let birthFormat = format(birthday, "MM/dd/yyyy")
                console.log(birthFormat)
                setNewNextContactDate(birthFormat)
               

            } else if (newStatus === "Re-contactado") {
                const birthday = addDays(calendarDate, 3);
                let birthFormato = format(birthday, "MM/dd/yyyy")
                console.log(birthFormato)
                setNewNextContactDate(birthFormato)
            } else if (newStatus === "Propuesta") {
                const birthday = addDays(calendarDate, 3);
                let birthFormatho = format(birthday, "MM/dd/yyyy")
                console.log(birthFormatho)
                setNewNextContactDate(birthFormatho)
              


            } else if (newStatus === "Sin contactar") {
               
                setNewLastContactDate("-")
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
       
         const nextDay = addDays(calendarDate, 20);
            let nextFormat = format(nextDay, "MM/dd/yyyy")
            console.log(nextFormat)
            setNewLastContactDate(calendarDateFormateded)
            setNewNextContactDate(nextFormat)

        } else if (newStatus === "Re-contactado") {
            const nextDay = addDays(calendarDate, 3);
            let nextFormated = format(nextDay, "MM/dd/yyyy")
            setNewLastContactDate(calendarDateFormateded)
            setNewNextContactDate(nextFormated)
            console.log(nextFormated)

        } else if (newStatus === "Propuesta") {
            const nextDay = addDays(calendarDate, 3);
            let nextFormatedo = format(nextDay, "MM/dd/yyyy")
            setNewLastContactDate(calendarDateFormateded)
            setNewNextContactDate(nextFormatedo)
            console.log(nextFormatedo)
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
            cityLabel: newCityLabel,
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
        setNewCityLabel('')
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
                        <div className='input-style'>
                            <TextField id="outlined-basic" label="Nombre" variant="outlined" onChange={handleNewName} value={newName} />
                        </div>
                        <div className='input-style'>

                            <FormControl variant="outlined" sx={{ m: 0, minWidth: 140 }}>

                                <InputLabel id="demo-simple-select-standard-label">Ciudad</InputLabel>

                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={newCity}
                                    onChange={handleNewCity}
                                    label="Ciudad"
                                >
                                    <MenuItem value="">
                                        <em>Todas</em>
                                    </MenuItem>
                                    <MenuItem value={"palermo"}>Palermo</MenuItem>
                                    <MenuItem value={"devoto"}>Villa Devoto</MenuItem>
                                    <MenuItem value={"urquiza"}>Villa Urquiza</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className='input-style'>
                            <TextField id="outlined-basic" label="Contacto Google" variant="outlined" onChange={handleNewGoogleName} value={newGoogleName} />

                        </div>
                        <div className='input-style'>
                            <TextField id="outlined-basic" label="Teléfono" variant="outlined" onChange={handleNewPhone} value={newPhone} />

                        </div>
                        <div className='input-style'>
                            <TextField id="outlined-basic" label="Link" variant="outlined" onChange={(e) => setNewLink(e.target.value)} value={newLink} />
                        </div>
                        <div className='input-style'>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Stack spacing={3}>
                                    <DesktopDatePicker
                                        disabled={newStatus === "Sin contactar"}
                                        label="Último contacto"
                                        inputFormat="dd/MM/yyyy"
                                        value={calendarDate}
                                        onChange={handleCalendarDate}
                                        renderInput={(params) => <TextField onKeyDown={onKeyDown} {...params} />}
                                    />

                                </Stack>
                            </LocalizationProvider>
                        </div>
                        <div className='input-style'>
                            <FormControl variant="outlined" sx={{ m: 0, minWidth: 140 }}>
                                <InputLabel id="demo-simple-select-standard-label">Estado</InputLabel>
                                <Select
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

                            <Fab onClick={addUser} color="primary" aria-label="add">
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

                                    <div className={(user.id === hoverID) ? 'userComponentContainer-AnimationDelete' : 'userComponentContainer'} ><User user={user} key={user.id} id={user.id} name={user.name} googleName={user.googleName} cityLabel={user.cityLabel} phone={user.phone} link={user.link} status={user.status} lastContactDate={user.lastContactDate} nextContactDate={user.nextContactDate}/> </div>
                                    <div className={(user.id === hoverID) ? 'btns-userEdit-container-AnimationDelete' : 'btns-userEdit-container'}>

                                        <div className='btn-editar-container'>
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                title="Edit"
                                                onClick={() => { handleAnimationDelete(user.id) }}
                                            >
                                                <CreateIcon />
                                            </IconButton>
                                        </div>
                                        <div className='btn-eliminar-container'>
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                title="Delete"
                                                onClick={() => { deleteUser(user.id) }}
                                            >
                                                <DeleteIcon />
                                            </IconButton></div>

                                    </div>


                                </div>
                            ))

                            :
                            <div >No hay coincidencias</div>
                    }
                </div>

            </div>



        </>


    )


}
