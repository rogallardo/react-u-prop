import React from 'react'
import { useEffect, useState } from 'react'
import { collection, where, getDocs, getFirestore, query, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './userEditor.css'
import CreateIcon from '@mui/icons-material/Create';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { format, addDays } from 'date-fns/esm';
import swal from 'sweetalert'



export default function UserEditor({ user, adminUser }) {
    let today = new Date()
    let todayFormated = format(today, "MM/dd/yyyy")
  const [userName, setUserName] = useState(user.name)
  const [userCity, setUserCity] = useState(user.city)
  const [userGoogleName, setUserGoogleName] = useState(user.googleName)
  const [userPhone, setUserPhone] = useState(user.phone)
  const [userLink, setUserLink] = useState(user.link)
  const [userLastContactDate, setUserLastContactDate]=useState(user.lastContactDate)
  const [userNextContactDate, setUserNextContactDate]=useState(user.nextContactDate)

  const [disabledName, setDisabledName] = useState(true)
  const [disabledCity, setDisabledCity] = useState(true)
  const [disabledGoogleName, setDisabledGoogleName] = useState(true)
  const [disabledPhone, setDisabledPhone] = useState(true)
  const [disabledLink, setDisabledLink] = useState(true)
  const [disabledLastContactDate, setDisabledLastContactDate] = useState(true)
  const [disabledNextContactDate, setDisabledNextContactDate] = useState(true)

  const [nameRestart, setNameRestart] = useState(false)
  const [cityRestart, setCityRestart] = useState(false)
  const [googleNameRestart, setGoogleNameRestart] = useState(false)
  const [phoneRestart, setPhoneRestart] = useState(false)
  const [linkRestart, setLinkRestart] = useState(false)
  const [lastContactDateRestart, setLastContactDateRestart] = useState(false)
  const [nextContactDateRestart, setNextContactDateRestart] = useState(false)

  const [nameSavedValue, setNameSavedValue] = useState(user.name)
  const [citySavedValue, setCitySavedValue] = useState(user.city)
  const [googleNameSavedValue, setGoogleNameSavedValue] = useState(user.googleName)
  const [phoneSavedValue, setPhoneSavedValue] = useState(user.phone)
  const [linkSavedValue, setLinkSavedValue] = useState(user.link)
  const [lastContactDateSavedValue, setLastContactDateSavedValue] = useState(todayFormated)
  const [nextContactDateSavedValue, setNextContactDateSavedValue] = useState(todayFormated)

/************************************************INICIADORES DE CALENDARIOS**************************************************** */
  useEffect(()=>{
     if(user.status !== "Sin contactar"){
    lastDateFormatedInit()
     }
  }, [])
  useEffect(()=>{
    if(user.status !== "Rechazado" && user.status !== "Sin contactar" && user.status !== "Captado"){
   nextDateFormatedInit()
    }
 }, [])
   //***************************************RETORNAR VALOR INICIAL Y DESACTIVAR INPUT AL CLICKEAR CANCELAR********************************************* */ 
  useEffect(() => {
    if (disabledName === true && nameRestart === true) {
      setUserName(nameSavedValue)
    }
  }, [disabledName])

  useEffect(() => {
    if (disabledCity === true && cityRestart === true) {
      setUserCity(citySavedValue)
    }
  }, [disabledCity])

  useEffect(() => {
    if (disabledGoogleName === true && googleNameRestart === true) {
      setUserGoogleName(googleNameSavedValue)
    }
  }, [disabledGoogleName])

  useEffect(() => {
    if (disabledPhone === true && phoneRestart === true) {
      setUserPhone(phoneSavedValue)
    }
  }, [disabledPhone])

  useEffect(() => {
    if (disabledLink === true && linkRestart === true) {
      setUserLink(linkSavedValue)   
    }
  }, [disabledLink])
  useEffect(() => {
    if (disabledLastContactDate === true && lastContactDateRestart === true) {
      setUserLastContactDate(lastContactDateSavedValue)
    }
  }, [disabledLastContactDate])

  useEffect(() => {
    if (disabledNextContactDate === true && nextContactDateRestart === true) {
      setUserNextContactDate(nextContactDateSavedValue)
    }
  }, [disabledNextContactDate])

  //**********************************MOSTRAR MENU AL CLICKEAR EDITAR**************************************************************************** */
  const handleDisabledName = () => {
    setDisabledName(false)
  }
  const handleDisabledCity = () => {
    setDisabledCity(false)
  }
  const handleDisabledGoogleName = () => {
    setDisabledGoogleName(false)
  }
  const handleDisabledPhone = () => {
    setDisabledPhone(false)
  }
  const handleDisabledLink = () => {
    setDisabledLink(false)
  }
  const handleDisabledLastContactDate = () => {
    if(user.status !== "Sin contactar"){
      setDisabledLastContactDate(false)
    } else if ( user.status === "Sin contactar"){
      alert('Usuario aun no contactado')
    }
  }
  const handleDisabledNextContactDate = () => {
    if(user.status !== "Sin contactar" && user.status !== "Rechazado" && user.status !== "Captado"){
      setDisabledNextContactDate(false)
    } else if ( user.status === "Sin contactar" || user.status === "Rechazado" || user.status === "Captado"){
      alert('Cambiar el estado del usuario para acceder')
    }
  }

  //*********************************OCULTAR MENU AL CLICKER CANCELAR********************************************************************** */
  const showEditName = () => {
    setDisabledName(true)
    setNameRestart(true)
  }
  const showEditCity = () => {
    setDisabledCity(true)
    setCityRestart(true)
  }
  const showEditGoogleName = () => {
    setGoogleNameRestart(true)
    setDisabledGoogleName(true)
  }
  const showEditPhone = () => {
    setPhoneRestart(true)
    setDisabledPhone(true)
  }
  const showEditLink = () => {
    setLinkRestart(true)
    setDisabledLink(true)
  }
  const showEditLastContactDate = () => {
    setLastContactDateRestart(true)
    setDisabledLastContactDate(true)
  }
  const showEditNextContactDate = () => {
    setNextContactDateRestart(true)
    setDisabledNextContactDate(true)
  }


  //************************************GUARDAR CAMBIOS EN FIREBASE*********************************************************************** */
  const updateName = () => {
    const db = getFirestore();
    if(adminUser===true){
      const userDoc = doc(db, "users", `${user.id}`)
      updateDoc(userDoc, { name: userName })
    } else{
      const userDoc = doc(db, "usersDemo", `${user.id}`)
      updateDoc(userDoc, { name: userName })
    }
   
    setNameRestart(false)
    setDisabledName(true)
    setNameSavedValue(userName)
  }
  const updateCity = () => {
    const db = getFirestore();
    if(adminUser===true){
      const userDoc = doc(db, "users", `${user.id}`)
    updateDoc(userDoc, { city: userCity })
    } else{
      const userDoc = doc(db, "usersDemo", `${user.id}`)
      updateDoc(userDoc, { city: userCity })
    }
    
    setCityRestart(false)
    setDisabledCity(true)
    setCitySavedValue(userCity)
  }
  const updateGoogleName = () => {
    const db = getFirestore();
    if(adminUser===true){
      const userDoc = doc(db, "users", `${user.id}`)
      updateDoc(userDoc, { googleName: userGoogleName })
    } else{
      const userDoc = doc(db, "usersDemo", `${user.id}`)
      updateDoc(userDoc, { googleName: userGoogleName })
    }
   
    setGoogleNameRestart(false)
    setDisabledGoogleName(true)
    setGoogleNameSavedValue(userGoogleName)
  }
  const updatePhone = () => {
    const db = getFirestore();
    if(adminUser===true){
      const userDoc = doc(db, "users", `${user.id}`)
      updateDoc(userDoc, { phone: userPhone })
    } else{
      const userDoc = doc(db, "usersDemo", `${user.id}`)
      updateDoc(userDoc, { phone: userPhone })
    }
    setPhoneRestart(false)
    setDisabledPhone(true)
    setPhoneSavedValue(userPhone)
  }
  const updateLink = () => {
    const db = getFirestore();
    if(adminUser===true){
      const userDoc = doc(db, "users", `${user.id}`)
    updateDoc(userDoc, { link: userLink })
    } else{
      const userDoc = doc(db, "usersDemo", `${user.id}`)
      updateDoc(userDoc, { link: userLink })
    }
    
    setLinkRestart(false)
    setDisabledLink(true)
    setLinkSavedValue(userLink)
  }
  const updateLastContactDate = () => {
    const db = getFirestore();
    if(adminUser===true){
      const userDoc = doc(db, "users", `${user.id}`)
    updateDoc(userDoc, { lastContactDate: userLastContactDate })
    } else{
      const userDoc = doc(db, "usersDemo", `${user.id}`)
      updateDoc(userDoc, { lastContactDate: userLastContactDate })
    }
    
    setLastContactDateRestart(false)
    setDisabledLastContactDate(true)
    setLastContactDateSavedValue(userLastContactDate)
  }
  const updateNextContactDate = () => {
    const db = getFirestore();
    if(adminUser===true){
      const userDoc = doc(db, "users", `${user.id}`)
      updateDoc(userDoc, { nextContactDate: userNextContactDate })
    } else{
      const userDoc = doc(db, "usersDemo", `${user.id}`)
      updateDoc(userDoc, { nextContactDate: userNextContactDate })
    }

    setNextContactDateRestart(false)
    setDisabledNextContactDate(true)
    setNextContactDateSavedValue(userNextContactDate)
  }
  /***************************** CALENDARIO ******************************************** */
  const onKeyDown = (e) => {
    e.preventDefault();
};
const lastDateFormatedInit = ()=>{
  if(user.status !== "Sin contactar"){
    let lastDate = new Date(user.lastContactDate)
    let lastDateFormated = format(lastDate, "MM/dd/yyyy")
    setUserLastContactDate(lastDateFormated)
  }else {
    setUserLastContactDate(todayFormated)
  }
  
}
const handleCalendarLastDate = (newValue) => {
  let calendarDateFormated = format(newValue, "MM/dd/yyyy")
  setUserLastContactDate(calendarDateFormated)
}
const nextDateFormatedInit = ()=>{
  if(user.status !== "Sin contactar" && user.status !== "Captado"){
    let nextDate = new Date(user.nextContactDate)
    let nextDateFormated = format(nextDate, "MM/dd/yyyy")
    setUserNextContactDate(nextDateFormated)
  }else {
    setUserNextContactDate(todayFormated)
  }
  
}
const handleCalendarNextDate = (newValue) => {
  let calendarDateFormated = format(newValue, "MM/dd/yyyy")
  setUserNextContactDate(calendarDateFormated)
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
  if (adminUser === true) {
     await deleteDoc(doc(db, "users", id));
      
  } else if (adminUser === false) {
      await deleteDoc(doc(db, "usersDemo", id));
  
  }


}

  return (
    <>
      <Typography component={'span'} variant={'body2'}>
        <div className='big-containerUserEditor'>
          <div className='title-userEditor'>
            <p>Editar contacto</p>
          </div>
          <div><button>Eliminar</button></div>
          <div className='userEditor-container'>
            <div className="userEditor-subcontainer">
              <div className="userEditor-item">
                <div className='text-container-userEditor'><p>Nombre</p></div>
                <div className='input-container-userEditor'>
                  <TextField className='input-style-userEditor'
                    id="outlined-number"
                    hiddenLabel
                    disabled={disabledName === true}
                    type="text"
                    variant="filled"
                    size="small"

                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}

                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

                  {
                    disabledName ?
                      <div className='editIcon-container'>
                        <IconButton

                          aria-label="delete"
                          title="Editar"
                          onClick={handleDisabledName}

                        >
                          <CreateIcon />
                        </IconButton>
                      </div>

                      :
                      <div className='saveCancelIcons-container'>
                        <IconButton
                          onClick={updateName}
                          aria-label="delete"
                          title="Guardar"
                        >
                          < SaveIcon />
                        </IconButton>
                        <IconButton
                          onClick={showEditName}

                          aria-label="delete"
                          title="Cancelar"
                        >
                          < CancelIcon />
                        </IconButton>
                      </div>



                  }


                </div>
              </div>
              <div className="userEditor-item">
                <div className='text-container-userEditor'><p>Ciudad</p></div>
                <div className='input-container-userEditor'>
                  <TextField className='input-style-userEditor'
                    id="outlined-number"
                    hiddenLabel
                    disabled={disabledCity === true}
                    type="text"
                    variant="filled"
                    size="small"


                    onChange={(e) => setUserCity(e.target.value)}
                    value={userCity}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

                  {
                    disabledCity ?
                      <div className='editIcon-container'>
                        <IconButton

                          aria-label="delete"
                          title="Editar"
                          onClick={handleDisabledCity}

                        >
                          <CreateIcon />
                        </IconButton>
                      </div>

                      :
                      <div className='saveCancelIcons-container'>
                        <IconButton

                          onClick={updateCity}
                          aria-label="delete"
                          title="Guardar"
                        >
                          < SaveIcon />
                        </IconButton>
                        <IconButton
                          onClick={showEditCity}

                          aria-label="delete"
                          title="Cancelar"
                        >
                          < CancelIcon />
                        </IconButton>
                      </div>



                  }


                </div>
              </div>
              <div className="userEditor-item">
                <div className='text-container-userEditor'><p>Contacto Google</p></div>
                <div className='input-container-userEditor'>
                  <TextField className='input-style-userEditor'
                    id="outlined-number"
                    hiddenLabel
                    disabled={disabledGoogleName === true}
                    type="text"
                    variant="filled"
                    size="small"


                    onChange={(e) => setUserGoogleName(e.target.value)}
                    value={userGoogleName}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

                  {
                    disabledGoogleName ?
                      <div className='editIcon-container'>
                        <IconButton

                          aria-label="delete"
                          title="Editar"
                          onClick={handleDisabledGoogleName}

                        >
                          <CreateIcon />
                        </IconButton>
                      </div>

                      :
                      <div className='saveCancelIcons-container'>
                        <IconButton
                          onClick={updateGoogleName}

                          aria-label="delete"
                          title="Guardar"
                        >
                          < SaveIcon />
                        </IconButton>
                        <IconButton
                          onClick={showEditGoogleName}

                          aria-label="delete"
                          title="Cancelar"
                        >
                          < CancelIcon />
                        </IconButton>
                      </div>



                  }


                </div>
              </div>
              <div className="userEditor-item">
                <div className='text-container-userEditor'><p>Teléfono</p></div>

                <div className='input-container-userEditor'>
                  <TextField className='input-style-userEditor'
                    id="outlined-number"
                    hiddenLabel
                    disabled={disabledPhone === true}
                    type="text"
                    variant="filled"
                    size="small"


                    onChange={(e) => setUserPhone(e.target.value)}
                    value={userPhone}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

                  {

                    disabledPhone ?

                      <div className='editIcon-container'>

                        <IconButton

                          aria-label="delete"
                          title="Editar"
                          onClick={handleDisabledPhone}

                        >
                          <CreateIcon />
                        </IconButton>

                      </div>

                      :
                      <div className='saveCancelIcons-container'>
                        <IconButton
                          onClick={updatePhone}
                          aria-label="delete"
                          title="Guardar"
                        >
                          < SaveIcon />
                        </IconButton>
                        <IconButton
                          onClick={showEditPhone}

                          aria-label="delete"
                          title="Cancelar"
                        >
                          < CancelIcon />
                        </IconButton>
                      </div>



                  }


                </div>
              </div>
              <div className="userEditor-item">
                <div className='text-container-userEditor'><p>Link</p></div>
                <div className='input-container-userEditor'>
                  <TextField className='input-style-userEditor'
                    id="outlined-number"
                    hiddenLabel
                    disabled={disabledLink === true}
                    type="text"
                    variant="filled"
                    size="small"


                    onChange={(e) => setUserLink(e.target.value)}
                    value={userLink}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

                  {
                    disabledLink ?
                      <div className='editIcon-container'>
                        <IconButton

                          aria-label="delete"
                          title="Editar"
                          onClick={handleDisabledLink}

                        >
                          <CreateIcon />
                        </IconButton>
                      </div>

                      :
                      <div className='saveCancelIcons-container'>
                        <IconButton
                          onClick={updateLink}

                          aria-label="delete"
                          title="Guardar"
                        >
                          < SaveIcon />
                        </IconButton>
                        <IconButton
                          onClick={showEditLink}

                          aria-label="delete"
                          title="Cancelar"
                        >
                          < CancelIcon />
                        </IconButton>
                      </div>



                  }


                </div>
              </div>
              <div className="userEditor-item">
                <div className='text-container-userEditor'><p>Último contacto</p></div>
                <div className='input-container-userEditor'>
                  <LocalizationProvider  size="small"  dateAdapter={AdapterDateFns}>
                            <div className='input-style-userEditor'>
                                <Stack  size="small"  spacing={3}>
                                    <DesktopDatePicker
                                         disabled={disabledLastContactDate === true}
                                        label="Último contacto"
                                        size="small"
                                        inputFormat="dd/MM/yyyy"
                                        value={userLastContactDate}
                                        onChange={handleCalendarLastDate}
                                        renderInput={(params) => <TextField  size="small"  onKeyDown={onKeyDown} {...params} />}
                                    />

                                </Stack>
                                </div>
                            </LocalizationProvider>
                            {
                    disabledLastContactDate ?
                
                      <div className='editIcon-container'>
                        <IconButton

                          aria-label="delete"
                          title="Editar"
                          onClick={handleDisabledLastContactDate}

                        >
                          <CreateIcon />
                        </IconButton>
                      </div>

                      :
                      <div className='saveCancelIcons-container'>
                        <IconButton
                          onClick={updateLastContactDate}

                          aria-label="delete"
                          title="Guardar"
                        >
                          < SaveIcon />
                        </IconButton>
                        <IconButton
                          onClick={showEditLastContactDate}

                          aria-label="delete"
                          title="Cancelar"
                        >
                          < CancelIcon />
                        </IconButton>
                      </div>
                  }               
                </div>
              </div>
              <div className="userEditor-item">
                <div className='text-container-userEditor'><p>Próximo contacto</p></div>
                <div className='input-container-userEditor'>
                  <LocalizationProvider  size="small"  dateAdapter={AdapterDateFns}>
                            <div className='input-style-userEditor'>
                                <Stack  size="small"  spacing={3}>
                                    <DesktopDatePicker
                                         disabled={disabledNextContactDate === true}
                                        label="Último contacto"
                                        size="small"
                                        inputFormat="dd/MM/yyyy"
                                        value={userNextContactDate}
                                        onChange={handleCalendarNextDate}
                                        renderInput={(params) => <TextField  size="small"  onKeyDown={onKeyDown} {...params} />}
                                    />

                                </Stack>
                                </div>
                            </LocalizationProvider>
                            {
                    disabledNextContactDate ?
                      <div className='editIcon-container'>
                        <IconButton

                          aria-label="delete"
                          title="Editar"
                          onClick={handleDisabledNextContactDate}

                        >
                          <CreateIcon />
                        </IconButton>
                      </div>

                      :
                      <div className='saveCancelIcons-container'>
                        <IconButton
                          onClick={updateNextContactDate}

                          aria-label="delete"
                          title="Guardar"
                        >
                          < SaveIcon />
                        </IconButton>
                        <IconButton
                          onClick={showEditNextContactDate}

                          aria-label="delete"
                          title="Cancelar"
                        >
                          < CancelIcon />
                        </IconButton>
                      </div>
                  }               
                </div>
              </div>
            </div>

          </div>

        </div>
       
      </Typography>
    </>

  )
} 
