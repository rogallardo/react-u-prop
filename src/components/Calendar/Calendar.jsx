import React from 'react'
import { useState, useEffect } from 'react'
import { collection, getFirestore, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import './calendar.css'
import User from '../User/User'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/300.css';
import { PureComponent } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { format, addDays, parse } from 'date-fns/esm';
import CreateIcon from '@mui/icons-material/Create';

import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import { TransitionGroup } from 'react-transition-group';
import Alert from '@mui/material/Alert';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import DirectionsIcon from '@mui/icons-material/Directions';

    /* const coincidenciasCiudad = () => {
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
      }*/

    /*const cityLabelConverse = () => {

        if (newCity === "palermo") {
            setNewCityLabel("Palermo")
        } else if (newCity === "urquiza") {
            setNewCityLabel("Villa Urquiza")
        } else if (newCity === "devoto") {
            setNewCityLabel("Villa Devoto")
        }
    }*/

    /* const updateName = (name, nameEdited, id) => {
          const db = getFirestore();
          const usersDoc = doc(db, "users", id)
          updateDoc(usersDoc, { name: nameEdited })
          name = nameEdited
      }*/



export default function Calendar({ usersList }) {

    const [copyUsersList, setCopyUsersList] = useState(usersList)
    const [newValue, setNewValue] = useState('')
    const [todayFilter, setTodayFilter] = useState(true)
    const [tomorrowFilter, setTomorrowFilter] = useState(false)
    const [usersMatch, setUsersMatch] = useState([])
    const [hoverID, setHoverID] = useState()

    
   

    useEffect(() => {
      
        coincidenciasBusqueda()
    }, [newValue]) 
    
    const coincidenciasBusqueda = () => {
        if (newValue !== "") {

            if ( todayFilter === true && tomorrowFilter === false) {
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
    } else if (newValue === "" && todayFilter === true){
        todayPendings()
    } else if (newValue === "" && tomorrowFilter === true){
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

    const deleteUser = async (id) => {
        const db = getFirestore();
        await deleteDoc(doc(db, "users", id));
        handleAnimationDelete(id)
        setTimeout(() => { removeItem(id) }, 700);

    }

    return (
        <>
            <div className='big-container-userEdit'>

                <div className='inputSearch-container-userEdit'>
                    <div className='inputSearch-subcontainer-userEdit'>
                        <div className='inputSearch-style'>

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
                            <div className='btn-editar-container'>
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    title="Edit"
                                    onClick={() => { todayPendings() }}
                                >
                                    <CreateIcon />
                                </IconButton>
                            </div>
                            <div className='btn-editar-container'>
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    title="Delete"
                                    onClick={() => { tomorrowPendings() }}
                                >
                                    <CreateIcon />
                                </IconButton>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='principalTitle-container'>
                    <Typography >
                        <h1 className='principalTitle'>Resultados</h1>
                    </Typography>
                </div>

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

                                    <div className={(user.id === hoverID) ? 'userComponentContainer-AnimationDelete' : 'userComponentContainer'} >
                                        <User user={user} key={user.id} id={user.id} name={user.name} googleName={user.googleName} cityLabel={user.cityLabel} phone={user.phone} link={user.link} status={user.status} lastContactDate={user.lastContactDate} nextContactDate={user.nextContactDate} /> </div>
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
                            <div >No hay resultados</div>
                    }
                </div>

            </div>



        </>


    )

}
