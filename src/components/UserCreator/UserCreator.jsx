import React from 'react'
import { useState, useEffect } from 'react'
import { collection, getFirestore, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import './UserCreator.scss'
import '@fontsource/roboto/300.css';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useContext } from 'react';
import { Auth } from '../AuthContext/AuthContext';
import swal from 'sweetalert'
import UsersMatch from '../UsersMatch/UsersMatch'
import userService from '../../services/user.service'

export default function UserCreator({ usersList, settings }) {
    const {  userCollection } = useContext(Auth)
    const [cities, setCities] = useState(settings.cities)
    const [copyUsersList, setCopyUsersList] = useState(usersList)
    const [newName, setNewName] = useState('')
    const [newGoogleName, setNewGoogleName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [newCity, setNewCity] = useState('')
    const [newLink, setNewLink] = useState('')
    const [inputErrorGoogleName, setInputErrorGoogleName] = useState(false)
    const [inputErrorPhone, setInputErrorPhone] = useState(false)
    const [usersMatch, setUsersMatch] = useState([])
    const [newUserCreated, setNewUserCreated] = useState(false)
    const [title, setTitle] = useState('Coincidencias')
    
    useEffect(() => {
        citiesSorter()
    }, [])

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

    useEffect(()=>{
            clearForm()
    }, [newUserCreated])
    const citiesSorter = ()=>{
        let citiesSorted = cities.sort()
        setCities(citiesSorted)
    }

    const coincidenciasNombre = () => {
        if (!newName && !newUserCreated) {
            console.log('Reiniciando todo')
            setNewGoogleName("")
            setUsersMatch([])
            setTitle(`Coincidencias`) 
        } else {
            if (!newCity && !newUserCreated) {
                console.log('no hay ciudad')
                setNewUserCreated(false)
                setNewGoogleName(`ZZML - ${newName}`)
               
                let copiaUsersList = [...copyUsersList]
                let pepo = copiaUsersList.filter((userInList) =>
                    userInList.name.toLowerCase().includes(newName.toLowerCase()))
                    setUsersMatch(pepo.splice(0, 5)) 
                    setTitle(`Coincidencias para ${newName} en todas las ciudades`) 
            } else {
                setNewUserCreated(false)
                coincidenciasCiudad()           
                if(!newUserCreated){
                    console.log('linea 82')
                    setTitle(`Coincidencias para ${newName} en ${newCity}`) 
                }else{
                    setTitle('Nuevo Usuario')
                }
                
            }
        }
    }


    const coincidenciasNombreGoogle = () => {
        if (!newGoogleName &&  !newUserCreated) {
            setInputErrorGoogleName(false)
        } else {
            setNewUserCreated(false)
            let copiaUsersList = [...copyUsersList]
            let pepo = copiaUsersList.filter((userInList) =>
            userInList.googleName.toLowerCase() === newGoogleName.toLowerCase())
            if(pepo.length){
                setInputErrorGoogleName(true)
            }else{
                setInputErrorGoogleName(false)
            }
      }
    }

    const coincidenciasTelefono = () => {
        if (newPhone) {
            setNewUserCreated(false)
            let coincidencias = copyUsersList.filter((userInList) =>
                userInList.phone.replace(/[\s\-]/g, '').includes(newPhone.replace(/[\s\-\+]/g, '')))           
            if(coincidencias.length){      
                setInputErrorPhone(true)
            }else{              
                setInputErrorPhone(false)
            }
            setUsersMatch(coincidencias.splice(0, 5))
            setTitle(`Coincidencias para teléfono '${newPhone}' en todas las ciudades`)
        }
    }

    const coincidenciasCiudad = () => {
        setNewUserCreated(false)
        if (newCity && newName) {
            setNewUserCreated(false)
            let copiaUsersListt = [...copyUsersList]
            let pep = copiaUsersListt.filter((userInList) =>
                userInList.name.toLowerCase().includes(newName.toLowerCase()))
            let pepi = pep.filter((userInList) =>
                userInList.city === newCity && ({ userInList }))
            setUsersMatch(pepi.splice(0, 5))
            setNewGoogleName(`ZZML - ${newName}`)
            console.log('linea 125')
            setTitle(`Coincidencias para ${newName} en ${newCity}`)
        } else {
            coincidenciasNombreGoogle()
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

    async function addUser () {
        const addedUser = {
            name: newName,
            googleName: newGoogleName,
            phone: newPhone,
            city: newCity,
            link: newLink,
            status: 'Sin contactar',
            lastContactDate: '-',
            nextContactDate: '-'        
        }
        const id = await userService.createUser(userCollection, addedUser)

        if(id){
            console.log(id)   
            setCopyUsersList([...copyUsersList, { ...addedUser, id: id }])
            setUsersMatch([{ ...addedUser, id: id }])
            setNewUserCreated(true)
            setTitle('Nuevo usuario')
        }
    }

    const clearForm = () => {
        setNewPhone('')
        setNewCity('')
        setNewName('')
        setNewLink('')
        setNewGoogleName('')
    }

    const handleRefreshDelete =(id)=>{
        let updatedUsersClonedDelete = copyUsersList.filter(user => user.id !== id)
        setCopyUsersList(updatedUsersClonedDelete)
       let updatedUsersMatchDelete  = usersMatch.filter(user => user.id !== id)
       setUsersMatch(updatedUsersMatchDelete)
    }

    return (
        <>
            <div className='userCreator-flex-container'>
                <div className='principalTitle-container'>                    
                    <p className='principalTitle'> Ingrese usuario</p>        
                </div>
                <div className='inputs-container-userEdit'>
                    <div className='inputs-subcontainer-userEdit'>
                        <div className='input-style-creator'>
                            <FormControl size="small" variant="outlined" sx={{ m: 0, width: 200 }}>
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
                                          <MenuItem style={{zIndex:'1'}} key={y} value={x}>{x}</MenuItem>   
                                    )
                                    }
                                </Select>
                            </FormControl>
                        </div>
                        <div className='input-style-creator'>
                            <TextField overflow='hidden' id="outlined-basic" label="Nombre" variant="outlined" onChange={handleNewName} value={newName} size="small"/>
                        </div>
                        <div className='input-style-creator'>
                            <TextField id="outlined-basic" size="small" label="Contacto Google" variant="outlined" onChange={handleNewGoogleName} value={newGoogleName}  error={inputErrorGoogleName}/>

                        </div>
                        <div className='input-style-creator'>
                            <TextField id="outlined-basic" size="small" label="Teléfono" variant="outlined" onChange={handleNewPhone} value={newPhone} error={inputErrorPhone}/>

                        </div>
                        <div className='input-style-creator'>
                            <TextField id="outlined-basic"  size="small" label="Link" variant="outlined" onChange={(e) => setNewLink(e.target.value)} value={newLink} />
                        </div>

                        <div >

                            <Fab onClick={addUser}  color="primary" aria-label="add">
                                <AddIcon />
                            </Fab>

                        </div>
                    </div>

                </div>

                <div className='principalTitle-container'>                                   
                        <p className='principalSubTitle'>  {title} </p>                  
                </div>
                <UsersMatch usersMatch={usersMatch} settings={settings} handleRefreshDelete={handleRefreshDelete} usersPerPage={5}/>
            </div>



        </>


    )


}
