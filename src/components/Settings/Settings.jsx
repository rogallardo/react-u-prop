import React from 'react'
import { useEffect, useState } from 'react'
import { collection, where, getDocs, getFirestore, query, doc, updateDoc } from 'firebase/firestore'
import { addDays } from 'date-fns'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './settings.css'
import CreateIcon from '@mui/icons-material/Create';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';


export default function Settings({ settings, adminUser }) {
  const [contAddDays, setContAddDays] = useState(settings.contactadoAddDays)
  const [reContAddDays, setReContAddDays] = useState(settings.reContactadoAddDays)
  const [visAddDays, setVisAddDays] = useState(settings.visitaAddDays)
  const [proAddDays, setProAddDays] = useState(settings.propuestaAddDays)
  const [disabledCont, setDisabledCont] = useState(true)
  const [disabledReCont, setDisabledReCont] = useState(true)
  const [disabledVis, setDisabledVis] = useState(true)
  const [disabledPro, setDisabledPro] = useState(true)
  const [contRestartCount, setContRestartCount] = useState(false)
  const [reContRestartCount, setReContRestartCount] = useState(false)
  const [visRestartCount, setVisRestartCount] = useState(false)
  const [proRestartCount, setProRestartCount] = useState(false)
  const [contSavedValue, setContSaveValue] = useState(settings.contactadoAddDays)
  const [reContSavedValue, setReContSaveValue] = useState(settings.reContactadoAddDays)
  const [visSavedValue, setVisSaveValue] = useState(settings.visitaAddDays)
  const [proSavedValue, setProSaveValue] = useState(settings.propuestaAddDays)

  const [inicialMsg, setInicialMsg] = useState(settings.inicialMsg)
  const [inicialMsgSecondPart, setInicialMsgSecondPart] = useState(settings.inicialMsgSecondPart)
  const [inicialMsgSecondPartSaveValue, setInicialMsgSecondPartSaveValue] = useState(settings.inicialMsgSecondPart)
  const [disabledInicialMsg, setDisabledInicialMsg] = useState(true)
  const [inicialMsgRestart, setInicialMsgRestart] = useState(settings.inicialMsg)
  const [inicialMsgSaveValue, setInicialMsgSaveValue] = useState(inicialMsg)

  const [contactadoMsg, setContactadoMsg] = useState(settings.contactadoMsg)
  const [disabledContactadoMsg, setDisabledContactadoMsg] = useState(true)
  const [contactadoMsgRestart, setContactadoMsgRestart] = useState(settings.contactadoMsg)
  const [contactadoMsgSaveValue, setContactadoMsgSaveValue] = useState(contactadoMsg)

  const [propuestaMsg, setPropuestaMsg] = useState(settings.propuestaMsg)
  const [disabledPropuestaMsg, setDisabledPropuestaMsg] = useState(true)
  const [propuestaMsgRestart, setPropuestaMsgRestart] = useState(settings.propuestaMsg)
  const [propuestaMsgSaveValue, setPropuestaMsgSaveValue] = useState(propuestaMsg)

  const [cityAdded, setCityAdded] = useState('')
  // const [cityCollection, setCityCollection] = useState(settings.cities)
  const [disabledCities, setDisabledCities] = useState(true)
  const [citiesRestart, setCitiesRestart] = useState(settings.cities)



  //***************************************RETORNAR VALOR INICIAL Y DESACTIVAR INPUT AL CLICKEAR CANCELAR********************************************* */
  useEffect(() => {
    if (disabledCont === true && contRestartCount === true) {
      setContAddDays(contSavedValue)
    }
  }, [disabledCont])

  useEffect(() => {
    if (disabledReCont === true && reContRestartCount === true) {
      setReContAddDays(reContSavedValue)
    }
  }, [disabledReCont])

  useEffect(() => {
    if (disabledVis === true && visRestartCount === true) {
      setVisAddDays(visSavedValue)
    }
  }, [disabledVis])

  useEffect(() => {
    if (disabledPro === true && proRestartCount === true) {
      setProAddDays(proSavedValue)
    }
  }, [disabledPro])

  useEffect(() => {
    if (disabledInicialMsg === true && inicialMsgRestart === true) {
      setInicialMsg(inicialMsgSaveValue)
      setInicialMsgSecondPart(inicialMsgSecondPartSaveValue)
    }
  }, [disabledInicialMsg])
  useEffect(() => {
    if (disabledContactadoMsg === true && contactadoMsgRestart === true) {
      setContactadoMsg(contactadoMsgSaveValue)
    }
  }, [disabledContactadoMsg])

  useEffect(() => {
    if (disabledPropuestaMsg === true && propuestaMsgRestart === true) {
      setPropuestaMsg(propuestaMsgSaveValue)
    }
  }, [disabledPropuestaMsg])

  useEffect(() => {
    if (disabledCities === true && citiesRestart === true) {
      setCityAdded('')
    }
  }, [disabledCities])

  //**********************************MOSTRAR MENU AL CLICKEAR EDITAR**************************************************************************** */
  const handleDisabledCont = () => {
    setDisabledCont(false)
  }
  const handleDisabledReCont = () => {
    setDisabledReCont(false)
  }
  const handleDisabledVis = () => {
    setDisabledVis(false)
  }
  const handleDisabledPro = () => {
    setDisabledPro(false)
  }
  const handleDisabledInicialMsg = () => {
    setDisabledInicialMsg(false)
  }
  const handleDisabledContactadoMsg = () => {
    setDisabledContactadoMsg(false)
  }
  const handleDisabledPropuestaMsg = () => {
    setDisabledPropuestaMsg(false)
  }
  const handleDisabledCities = () => {
    setDisabledCities(false)
  }
  //*********************************OCULTAR MENU AL CLICKER CANCELAR********************************************************************** */
  const showEditCont = () => {
    setDisabledCont(true)
    setContRestartCount(true)
  }
  const showEditReCont = () => {
    setDisabledReCont(true)
    setReContRestartCount(true)
  }
  const showEditVis = () => {
    setVisRestartCount(true)
    setDisabledVis(true)
  }
  const showEditPro = () => {
    setProRestartCount(true)
    setDisabledPro(true)
  }
  const showEditInicialMsg = () => {
    setInicialMsgRestart(true)
    setDisabledInicialMsg(true)
  }
  const showEditContactadoMsg = () => {
    setContactadoMsgRestart(true)
    setDisabledContactadoMsg(true)
  }
  const showEditPropuestaMsg = () => {
    setPropuestaMsgRestart(true)
    setDisabledPropuestaMsg(true)
  }
  const showEditCities = () => {
    setCitiesRestart(true)
    setDisabledCities(true)
  }

  //************************************GUARDAR CAMBIOS EN FIREBASE*********************************************************************** */CONST
  const updateContDate = () => {
    const db = getFirestore();
    if(adminUser === true ){
      const settingsDoc = doc(db, "settings", "p8DtoxnpJnIo6FcFg7K2") 
    updateDoc(settingsDoc, { contactadoAddDays: contAddDays })
    } else {
      const settingsDoc = doc(db, "settingsDemo", "TtoxVMQJx0cd4yTPoG9w")  
    updateDoc(settingsDoc, { contactadoAddDays: contAddDays })
    }
    
    setContRestartCount(false)
    setDisabledCont(true)
    setContSaveValue(contAddDays)
  }
  const updateReContDate = () => {
    const db = getFirestore();
    if(adminUser ===true ){
      const settingsDoc = doc(db, "settings", "p8DtoxnpJnIo6FcFg7K2")
    updateDoc(settingsDoc, { reContactadoAddDays: reContAddDays })
    } else {
      const settingsDoc = doc(db, "settingsDemo", "TtoxVMQJx0cd4yTPoG9w")
      updateDoc(settingsDoc, { reContactadoAddDays: reContAddDays })
    }
    
    setReContRestartCount(false)
    setDisabledReCont(true)
    setReContSaveValue(reContAddDays)
  }
  const updateVisDate = () => {
    const db = getFirestore();
    if(adminUser ===true ){
      const settingsDoc = doc(db, "settings", "p8DtoxnpJnIo6FcFg7K2")
      updateDoc(settingsDoc, { visitaAddDays: visAddDays })
    } else {
      const settingsDoc = doc(db, "settingsDemo", "TtoxVMQJx0cd4yTPoG9w")
      updateDoc(settingsDoc, { visitaAddDays: visAddDays })
    }
    
    setVisRestartCount(false)
    setDisabledVis(true)
    setVisSaveValue(visAddDays)
  }
  const updateProDate = () => {
    const db = getFirestore();
    if(adminUser ===true ){
      const settingsDoc = doc(db, "settings", "p8DtoxnpJnIo6FcFg7K2")
    updateDoc(settingsDoc, { propuestaAddDays: proAddDays })
    } else  {
      const settingsDoc = doc(db, "settingsDemo", "TtoxVMQJx0cd4yTPoG9w")
      updateDoc(settingsDoc, { propuestaAddDays: proAddDays })
    }
    setProRestartCount(false)
    setDisabledPro(true)
    setProSaveValue(proAddDays)
  }
  const updateInicialMsg = () => {
    const db = getFirestore();
    if(adminUser ===true ){
      const settingsDoc = doc(db, "settings", "p8DtoxnpJnIo6FcFg7K2")
    updateDoc(settingsDoc, { inicialMsg: inicialMsg, inicialMsgSecondPart: inicialMsgSecondPart })
    } else {
      const settingsDoc = doc(db, "settingsDemo", "TtoxVMQJx0cd4yTPoG9w")
      updateDoc(settingsDoc, { inicialMsg: inicialMsg, inicialMsgSecondPart: inicialMsgSecondPart })
    }
    
    setInicialMsgRestart(false)
    setDisabledInicialMsg(true)
    setInicialMsgSaveValue(inicialMsg)
    setInicialMsgSecondPartSaveValue(inicialMsgSecondPart)
  }
  const updateContactadoMsg = () => {
    const db = getFirestore();
    if(adminUser ===true ){
      const settingsDoc = doc(db, "settings", "p8DtoxnpJnIo6FcFg7K2")
      updateDoc(settingsDoc, { contactadoMsg: contactadoMsg })
    } else  {
      const settingsDoc = doc(db, "settingsDemo", "TtoxVMQJx0cd4yTPoG9w")
      updateDoc(settingsDoc, { contactadoMsg: contactadoMsg })
    }
  
    setContactadoMsgRestart(false)
    setDisabledContactadoMsg(true)
    setContactadoMsgSaveValue(inicialMsg)
  }
  const updatePropuestaMsg = () => {
    const db = getFirestore();
    if(adminUser ===true ){
      const settingsDoc = doc(db, "settings", "p8DtoxnpJnIo6FcFg7K2")
      updateDoc(settingsDoc, { propuestaMsg: propuestaMsg })
    } else  {
      const settingsDoc = doc(db, "settingsDemo", "TtoxVMQJx0cd4yTPoG9w")
      updateDoc(settingsDoc, { propuestaMsg: propuestaMsg })
    }
   
    setPropuestaMsgRestart(false)
    setDisabledPropuestaMsg(true)
    setPropuestaMsgSaveValue(propuestaMsg)
  }
  const updateCities = () => {
    const db = getFirestore();
    if(adminUser ===true ){
      const settingsDoc = doc(db, "settings", "p8DtoxnpJnIo6FcFg7K2")
      const cityCollection = settings.cities
      let newArray = [...cityCollection, cityAdded]
      updateDoc(settingsDoc, { cities: newArray })
    } else  {
      const settingsDoc = doc(db, "settingsDemo", "TtoxVMQJx0cd4yTPoG9w")
     const cityCollection = settings.cities
      let newArray = [...cityCollection, cityAdded]
      updateDoc(settingsDoc, { cities: newArray })
    }
    
    setCitiesRestart(false)
    setDisabledCities(true)
  }



  return (
    <>
      <Typography component={'span'} variant={'body2'}>
        <div className='big-containersSettings'>
          <div className='settings-container'>
          
          <div className='title-settings'>
            <p>Configuración</p>
          </div>
          <div className='addDaysConf-container'>
            <div className="addDaysConf-title">
              <h4>Tiempo de contacto</h4>
            </div>
            <div className="addDaysConf-subcontainer">
              <div className="addDaysConf-item">
                <div className='text-container-addDays'><p>En estado de "CONTACTADO", se sumarán día/s</p></div>
                <div className='input-container-addDays'>
                  <TextField className='input-style-addDays'
                    id="outlined-number"
                    hiddenLabel
                    disabled={disabledCont === true}
                    type="number"
                    variant="filled"
                    size="small"

                    onChange={(e) => setContAddDays(e.target.value)}
                    value={contAddDays}

                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

                  {
                    disabledCont ?
                      <div className='editIcon-container'>
                        <IconButton

                          aria-label="delete"
                          title="Edit"
                          onClick={handleDisabledCont}

                        >
                          <CreateIcon />
                        </IconButton>
                      </div>

                      :
                      <div className='saveCancelIcons-container'>
                        <IconButton
                          onClick={updateContDate}
                          aria-label="delete"
                          title="Edit"
                        >
                          < SaveIcon />
                        </IconButton>
                        <IconButton
                          onClick={showEditCont}

                          aria-label="delete"
                          title="Edit"
                        >
                          < CancelIcon />
                        </IconButton>
                      </div>



                  }


                </div>
              </div>
              <div className="addDaysConf-item">
                <div className='text-container-addDays'><p>En estado de "RE-CONTACTADO", se sumarán día/s</p></div>
                <div className='input-container-addDays'>
                  <TextField className='input-style-addDays'
                    id="outlined-number"
                    hiddenLabel
                    disabled={disabledReCont === true}
                    type="number"
                    variant="filled"
                    size="small"


                    onChange={(e) => setReContAddDays(e.target.value)}
                    value={reContAddDays}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

                  {
                    disabledReCont ?
                      <div className='editIcon-container'>
                        <IconButton

                          aria-label="delete"
                          title="Edit"
                          onClick={handleDisabledReCont}

                        >
                          <CreateIcon />
                        </IconButton>
                      </div>

                      :
                      <div className='saveCancelIcons-container'>
                        <IconButton

                          onClick={updateReContDate}
                          aria-label="delete"
                          title="Edit"
                        >
                          < SaveIcon />
                        </IconButton>
                        <IconButton
                          onClick={showEditReCont}

                          aria-label="delete"
                          title="Edit"
                        >
                          < CancelIcon />
                        </IconButton>
                      </div>



                  }


                </div>

              </div>
              <div className="addDaysConf-item">
                <div className='text-container-addDays'><p>En estado de "VISITA", se sumarán día/s</p></div>
                <div className='input-container-addDays'>
                  <TextField className='input-style-addDays'
                    id="outlined-number"
                    hiddenLabel
                    disabled={disabledVis === true}
                    type="number"
                    variant="filled"
                    size="small"


                    onChange={(e) => setVisAddDays(e.target.value)}
                    value={visAddDays}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

                  {
                    disabledVis ?
                      <div className='editIcon-container'>
                        <IconButton

                          aria-label="delete"
                          title="Edit"
                          onClick={handleDisabledVis}

                        >
                          <CreateIcon />
                        </IconButton>
                      </div>

                      :
                      <div className='saveCancelIcons-container'>
                        <IconButton
                          onClick={updateVisDate}

                          aria-label="delete"
                          title="Edit"
                        >
                          < SaveIcon />
                        </IconButton>
                        <IconButton
                          onClick={showEditVis}

                          aria-label="delete"
                          title="Edit"
                        >
                          < CancelIcon />
                        </IconButton>
                      </div>



                  }


                </div>
              </div>
              <div className="addDaysConf-item">
                <div className='text-container-addDays'><p>En estado de "PROPUESTA", se sumarán día/s</p></div>

                <div className='input-container-addDays'>
                  <TextField className='input-style-addDays'
                    id="outlined-number"
                    hiddenLabel
                    disabled={disabledPro === true}
                    type="number"
                    variant="filled"
                    size="small"


                    onChange={(e) => setProAddDays(e.target.value)}
                    value={proAddDays}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

                  {

                    disabledPro ?

                      <div className='editIcon-container'>

                        <IconButton

                          aria-label="delete"
                          title="Edit"
                          onClick={handleDisabledPro}

                        >
                          <CreateIcon />
                        </IconButton>

                      </div>

                      :
                      <div className='saveCancelIcons-container'>
                        <IconButton
                          onClick={updateProDate}
                          aria-label="delete"
                          title="Edit"
                        >
                          < SaveIcon />
                        </IconButton>
                        <IconButton
                          onClick={showEditPro}

                          aria-label="delete"
                          title="Edit"
                        >
                          < CancelIcon />
                        </IconButton>
                      </div>



                  }


                </div>
              </div>
            </div>

          </div>
          <div className="msgwpConf-container">
            <div className="msgwpConf-title">
              <h4>Mensaje automático</h4>
            </div>
            <div className="msgwpConf-subcontainer">
              <div className='msgwpConf-item'>
                <div className='text-container-msg'><p>Mensaje inicial</p></div>
                <div className='input-container-msg'>
                  <TextField className='input-style-text-msg-inicialOne'
                    id="outlined-text"
                    hiddenLabel
                    disabled={disabledInicialMsg === true}
                    type="text"
                    variant="filled"
                    size="small"

                    onChange={(e) => setInicialMsg(e.target.value)}
                    value={inicialMsg}

                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

                  <div className='textOnMsg'><p>+ Ciudad +</p></div>

                  <TextField className='input-style-text-msg-inicialTwo'
                    id="outlined-text"
                    hiddenLabel
                    disabled={disabledInicialMsg === true}
                    type="text"
                    variant="filled"
                    size="small"

                    onChange={(e) => setInicialMsgSecondPart(e.target.value)}
                    value={inicialMsgSecondPart}

                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

                  {
                    disabledInicialMsg ?
                      <div className='editIcon-container'>
                        <IconButton

                          aria-label="delete"
                          title="Edit"
                          onClick={handleDisabledInicialMsg}

                        >
                          <CreateIcon />
                        </IconButton>
                      </div>

                      :
                      <div className='saveCancelIcons-container'>
                        <IconButton
                          onClick={updateInicialMsg}
                          aria-label="delete"
                          title="Edit"
                        >
                          < SaveIcon />
                        </IconButton>
                        <IconButton
                          onClick={showEditInicialMsg}

                          aria-label="delete"
                          title="Edit"
                        >
                          < CancelIcon />
                        </IconButton>
                      </div>



                  }
                </div>
              </div>
              <div className='msgwpConf-item'>
                <div className='text-container-msg'><p>Mensaje en estado de "CONTACTADO"</p></div>
                <div className='input-container-msg'>
                  <TextField className='input-style-text-msg'
                    id="outlined-text"
                    hiddenLabel
                    disabled={disabledContactadoMsg === true}
                    type="text"
                    variant="filled"
                    size="small"

                    onChange={(e) => setContactadoMsg(e.target.value)}
                    value={contactadoMsg}

                    InputLabelProps={{
                      shrink: true,
                    }}
                  />



                  {
                    disabledContactadoMsg ?
                      <div className='editIcon-container'>
                        <IconButton

                          aria-label="delete"
                          title="Edit"
                          onClick={handleDisabledContactadoMsg}

                        >
                          <CreateIcon />
                        </IconButton>
                      </div>

                      :
                      <div className='saveCancelIcons-container'>
                        <IconButton
                          onClick={updateContactadoMsg}
                          aria-label="delete"
                          title="Edit"
                        >
                          < SaveIcon />
                        </IconButton>
                        <IconButton
                          onClick={showEditContactadoMsg}

                          aria-label="delete"
                          title="Edit"
                        >
                          < CancelIcon />
                        </IconButton>
                      </div>



                  }
                </div>
              </div>
              <div className='msgwpConf-item'>
                <div className='text-container-msg'><p>Mensaje en estado de "PROPUESTA"</p></div>
                <div className='input-container-msg'>
                  <TextField className='input-style-text-msg'
                    id="outlined-text"
                    hiddenLabel
                    disabled={disabledPropuestaMsg === true}
                    type="text"
                    variant="filled"
                    size="small"

                    onChange={(e) => setPropuestaMsg(e.target.value)}
                    value={propuestaMsg}

                    InputLabelProps={{
                      shrink: true,
                    }}
                  />



                  {
                    disabledPropuestaMsg ?
                      <div className='editIcon-container'>
                        <IconButton

                          aria-label="delete"
                          title="Edit"
                          onClick={handleDisabledPropuestaMsg}

                        >
                          <CreateIcon />
                        </IconButton>
                      </div>

                      :
                      <div className='saveCancelIcons-container'>
                        <IconButton
                          onClick={updatePropuestaMsg}
                          aria-label="delete"
                          title="Edit"
                        >
                          < SaveIcon />
                        </IconButton>
                        <IconButton
                          onClick={showEditPropuestaMsg}

                          aria-label="delete"
                          title="Edit"
                        >
                          < CancelIcon />
                        </IconButton>
                      </div>

                  }
                </div>
              </div>
            </div>
          </div>
          <div className="cityAdderConf-container">
          <div className="cityAdderConf-title">
            <h4>Agregar ciudades</h4>
          </div>
          <div className="cityAdderConf-subcontainer">
            <div className='cityAdderConf-item'>
              <div className='input-container-cityAdder'>
                <TextField className='input-style-text-cityAdder'
                  id="outlined-text"
                  hiddenLabel
                  disabled={disabledCities === true}
                  type="text"
                  variant="filled"
                  size="small"

                  onChange={(e) => setCityAdded(e.target.value)}


                  InputLabelProps={{
                    shrink: true,
                  }}
                />



                {
                  disabledCities ?
                    <div className='editIcon-container'>
                      <IconButton

                        aria-label="delete"
                        title="Edit"
                        onClick={handleDisabledCities}

                      >
                        <CreateIcon />
                      </IconButton>
                    </div>

                    :
                    <div className='saveCancelIcons-container'>
                      <IconButton
                        onClick={updateCities}
                        aria-label="delete"
                        title="Edit"
                      >
                        < SaveIcon />
                      </IconButton>
                      <IconButton
                        onClick={showEditCities}

                        aria-label="delete"
                        title="Edit"
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
          
        </div>
       
      </Typography>
    </>

  )
} 
