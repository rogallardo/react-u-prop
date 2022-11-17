import React from 'react'
import { useState, useEffect } from 'react'
import { getFirestore, doc, deleteDoc } from 'firebase/firestore'
import './userList.css'
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
import ExportExcel from '../ExportExcel/ExportExcel'
import swal from 'sweetalert'



export default function UserList({ usersList, settings }) {
    let today = new Date()
    const { userLog, adminUser, userInfo, cerrarSesion } = useContext(Auth)
    let todayFormat = format(today, "yyyy/MM/dd")
    const [copyUsersList, setCopyUsersList] = useState(usersList)
    const [newValue, setNewValue] = useState('')
    const [cityFilter, setCityFilter] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [usersMatch, setUsersMatch] = useState([])
    const [hoverID, setHoverID] = useState()
    const [cities, setCities] = useState(settings.cities)
    const [users, setUsers] = useState(usersList)
    const [open, setOpen] = useState(false)
    



    useEffect(() => {
        citiesSorter()
    }, [])

    useEffect(() => {
        coincidenciasBusqueda()
    }, [newValue])

    useEffect(() => {
        coincidenciasBusqueda()
    }, [cityFilter])
    useEffect(() => {
        coincidenciasBusqueda()

    }, [statusFilter])

    const citiesSorter = () => {
        let citiesSorted = cities.sort()
        setCities(citiesSorted)
    }

    const filtering = () => {
        if (cityFilter !== "" && statusFilter === "" && newValue !== "") {
            let copiaUsersListt = copyUsersList
            let papa = copiaUsersListt.filter((userInList) =>
                userInList.name.toLowerCase().includes(newValue.toLowerCase()))
            let pepe = copiaUsersListt.filter((userInList) =>
                userInList.phone.toLowerCase().includes(newValue.toLowerCase()))
            let popo = copiaUsersListt.filter((userInList) =>
                userInList.googleName.toLowerCase().includes(newValue.toLowerCase()))
            if (papa.length > 0) {
                let papaCiudad = papa.filter((userInList) =>
                    userInList.city == cityFilter)
                setUsersMatch(papaCiudad)
            } else if (papa.length === 0 && popo.length === 0) {
                let pepeCiudad = pepe.filter((userInList) =>
                    userInList.city == cityFilter)
                setUsersMatch(pepeCiudad)
            } else if (pepe.length === 0 && papa.length === 0) {
                let popoCiudad = popo.filter((userInList) =>
                    userInList.city == cityFilter)
                setUsersMatch(popoCiudad)
            }
        } else if (cityFilter === "" && statusFilter !== "" && newValue !== "") {
            let copiaUsersListt = copyUsersList
            let papa = copiaUsersListt.filter((userInList) =>
                userInList.name.toLowerCase().includes(newValue.toLowerCase()))
            let pepe = copiaUsersListt.filter((userInList) =>
                userInList.phone.toLowerCase().includes(newValue.toLowerCase()))
            let popo = copiaUsersListt.filter((userInList) =>
                userInList.googleName.toLowerCase().includes(newValue.toLowerCase()))
            if (papa.length > 0) {
                let papaStatus = papa.filter((userInList) =>
                    userInList.status == statusFilter)
                setUsersMatch(papaStatus)
            } else if (papa.length === 0 && popo.length === 0) {
                let pepeStatus = pepe.filter((userInList) =>
                    userInList.status == statusFilter)
                setUsersMatch(pepeStatus)
            } else if (pepe.length === 0 && papa.length === 0) {
                let popoStatus = popo.filter((userInList) =>
                    userInList.status == statusFilter)
                setUsersMatch(popoStatus)
            }
        } else if (cityFilter !== "" && statusFilter !== "" && newValue !== "") {
            let copiaUsersListt = copyUsersList

            let papa = copiaUsersListt.filter((userInList) =>
                userInList.name.toLowerCase().includes(newValue.toLowerCase()))

            let pepe = copiaUsersListt.filter((userInList) =>
                userInList.phone.toLowerCase().includes(newValue.toLowerCase()))

            let popo = copiaUsersListt.filter((userInList) =>
                userInList.googleName.toLowerCase().includes(newValue.toLowerCase()))

            if (papa.length > 0) {
                let papaStatus = papa.filter((userInList) =>
                    userInList.status == statusFilter)
                let papaStatusCity = papaStatus.filter((userInList) =>
                    userInList.city == cityFilter)
                setUsersMatch(papaStatusCity)

            } else if (papa.length === 0 && popo.length === 0) {
                let pepeStatus = pepe.filter((userInList) =>
                    userInList.status == statusFilter)
                let pepeStatusCity = pepeStatus.filter((userInList) =>
                    userInList.city == cityFilter)
                setUsersMatch(pepeStatusCity)

            } else if (pepe.length === 0 && papa.length === 0) {
                let popoStatus = popo.filter((userInList) =>
                    userInList.status == statusFilter)
                let popoStatusCity = popoStatus.filter((userInList) =>
                    userInList.city == cityFilter)
                setUsersMatch(popoStatusCity)

            }

        } else if (cityFilter !== "" && statusFilter === "" && newValue === "") {
            let copiaUsersListt = copyUsersList
            let onlyCityFilter = copiaUsersListt.filter((userInList) =>
                userInList.city == cityFilter
            )
            setUsersMatch(onlyCityFilter)
        } else if (cityFilter === "" && statusFilter !== "" && newValue === "") {
            let copiaUsersListt = copyUsersList
            let onlyStatusFilter = copiaUsersListt.filter((userInList) =>
                userInList.status == statusFilter
            )
            setUsersMatch(onlyStatusFilter)
        } else if (cityFilter !== "" && statusFilter !== "" && newValue === "") {
            let copiaUsersListt = copyUsersList
            let onlyStatusArray = copiaUsersListt.filter((userInList) =>
                userInList.status == statusFilter)
            let onlyStatusAndCityArray = onlyStatusArray.filter((userInList) =>
                userInList.city == cityFilter)
            setUsersMatch(onlyStatusAndCityArray)
        } else if (cityFilter === "" && statusFilter === "" && newValue === "") {
            setUsersMatch(usersList)
        }
    }
    const coincidenciasBusqueda = () => {
        if (newValue !== "") {

            if (cityFilter === "" && statusFilter === "") {
                let copiaUsersListt = copyUsersList
                let papa = copiaUsersListt.filter((userInList) =>
                    userInList.name.toLowerCase().includes(newValue.toLowerCase()))

                let pepe = copiaUsersListt.filter((userInList) =>
                    userInList.phone.toLowerCase().includes(newValue.toLowerCase()))

                let popo = copiaUsersListt.filter((userInList) =>
                    userInList.googleName.toLowerCase().includes(newValue.toLowerCase()))


                if (papa.length > 0) {
                    setUsersMatch(papa)
                } else if (papa.length === 0 && popo.length === 0) {
                    setUsersMatch(pepe)
                } else if (pepe.length === 0 && papa.length === 0) {
                    setUsersMatch(popo)
                }
            } else if (cityFilter !== "" || statusFilter !== "") {
                filtering()
            }



        } else if (newValue === "" && cityFilter === "" && statusFilter === "") {
            setUsersMatch(usersList)
        } else if (newValue === "" && cityFilter !== "" && statusFilter === "") {
            filtering()
        } else if (newValue === "" && cityFilter === "" && statusFilter !== "") {
            filtering()
        } else if (newValue === "" && cityFilter !== "" && statusFilter !== "") {
            filtering()
        }

    }

    const handleNewValue = (e) => {
        setNewValue(e.target.value)
    }
    const handleCityFilter = (e) => {
        setCityFilter(e.target.value)
    }
    const handleStatusFilter = (e) => {
        setStatusFilter(e.target.value)
    }


    const handleAnimationDelete = (id) => {
        setHoverID(id);
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

    const removeItem = (id) => {

        let resp = copyUsersList.filter((el) => el.id !== id)
        let resp2 = usersMatch.filter((el) => el.id !== id)
        setCopyUsersList(resp)
        setUsersMatch(resp2)
    }

    const deleteUser = async (id) => {
        const db = getFirestore();
        if (adminUser === true) {

           await deleteDoc(doc(db, "users", id));
           
            handleAnimationDelete(id)
            setTimeout(() => { removeItem(id) }, 700);
            

            
        } else if (adminUser === false) {
            await deleteDoc(doc(db, "usersDemo", id));
            
            handleAnimationDelete(id)
            setTimeout(() => { removeItem(id) }, 700);
       
            
        }


    }

    return (

        <>

            <div className='big-container-userEdit'>
                <div className='button-excel-container'>
                    <ExportExcel excelData={users} fileName={"Excel export"} />
                </div>
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
                                    onChange={handleNewValue}
                                />
                                <IconButton disabled type="button" sx={{ p: '10px' }} aria-label="search">
                                    <SearchIcon />
                                </IconButton>

                            </Paper>
                        </div>
                        <div className='filtros-container'>
                            <div className='content-selected'>
                                <select value={cityFilter} onChange={handleCityFilter}>
                                    <option value="" >Todas las ciudades</option>{
                                        cities.map((x) =>
                                            <option value={x}>{x}</option>)
                                    }</select>
                            </div>
                            <div className='content-selected'>
                                <select value={statusFilter} onChange={handleStatusFilter}>
                                    <option value="">Todos los estados</option>
                                    <option value="Sin contactar">Sin contactar</option>
                                    <option value="Contactado">Contactado</option>
                                    <option value="Re-contactado">Re-contactado</option>
                                    <option value="Propuesta">Propuesta</option>
                                    <option value="Visita">Visita</option>
                                    <option value="Captado">Captado</option>
                                    <option value="Rechazado">Rechazado</option>

                                </select>

                            </div>
                        </div>
                    </div>
                </div>

                <div className='principalTitle-container'>
                    <Typography component={'span'} variant={'body2'} >
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
                                        <User settings={settings} user={user} key={user.id} id={user.id} name={user.name} city={user.city} googleName={user.googleName} phone={user.phone} link={user.link} status={user.status} lastContactDate={user.lastContactDate} nextContactDate={user.nextContactDate} /> </div>
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
                            <div >No hay resultados</div>
                    }
                </div>

            </div>



        </>


    )

}
