import React from 'react'
import './User.css'
import Test from '../test/Test'
import { useState, useEffect } from 'react'
import { getFirestore, doc, updateDoc } from 'firebase/firestore'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { Auth } from '../AuthContext/AuthContext';
import '@fontsource/roboto/300.css';
import StatusSelector from '../StatusSelector/StatusSelector';
import CreateIcon from '@mui/icons-material/Create';
import { format, addDays } from 'date-fns/esm';
import { Link } from 'react-router-dom'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';


export default function User({ settings, user, id, name, googleName, city, phone, link, status, lastContactDate, nextContactDate }) {
    /***********************************************************************RESPONSIVE***************************************************************************************/
    const [width, setWidth] = React.useState(window.innerWidth);
    const breakpoint = 700;
    useEffect(() => {
        const handleResizeWindow = () => setWidth(window.innerWidth);

        window.addEventListener("resize", handleResizeWindow);
        return () => {

            window.removeEventListener("resize", handleResizeWindow);
        };
    }, [])

    /*************************************************************************************************************************************************************************/

    const { userLog, adminUser, userInfo, cerrarSesion } = useContext(Auth)
    const [statusEdited, setStatusEdited] = useState(status)
    const [nextContactDayEdited, setNextContactDayEdited] = useState(nextContactDate)
    const [lastContactDayEdited, setLastContactDayEdited] = useState(lastContactDate)


    const [nextContactDateFormated, setNextContactDateFormated] = useState(nextContactDate)
    const [lastContactDateFormated, setLastContactDateFormated] = useState(lastContactDate)
    const [renderDate, setRenderDate] = useState(false)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 300,
        bgcolor: 'background.paper',
        borderRadius: '5px',
        boxShadow: 24,
        p: 4,
    };
    const styleMobile = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 200,
        height: 400,
        bgcolor: 'background.paper',
        borderRadius: '5px',
        boxShadow: 24,
        p: 4,
    };

    useEffect(() => {
        dateFormated()
    }, [nextContactDayEdited])
    
    useEffect(() => {
        user.lastContactDate = lastContactDayEdited
        if (renderDate === true) {
            updateLastContactDate()

        }
    }, [lastContactDayEdited])


    useEffect(() => {
        user.nextContactDate = nextContactDayEdited
        if (renderDate === true) {
            updateNextContactDate()
        }
    }, [nextContactDayEdited])


    useEffect(() => {
        user.status = statusEdited
        if (renderDate === true) {
            newDateContactSetter()
        }
        updateStatus()
    }, [statusEdited]);


    const newDateContactSetter = () => {
        let today = new Date()
        let todayFormated = format(today, "MM/dd/yyyy")
        if (statusEdited === "Sin contactar") {
            setLastContactDayEdited("-")
            setNextContactDayEdited("-")
        }
        else if (statusEdited === "Contactado") {
            setLastContactDayEdited(todayFormated)

            const birthday = addDays(today, `${settings.contactadoAddDays}`)
            let nextFormateded = format(birthday, "MM/dd/yyyy")
            setNextContactDayEdited(nextFormateded)

        } else if (statusEdited === "Re-contactado") {
            setLastContactDayEdited(todayFormated)

            const birthdayy = addDays(today, `${settings.reContactadoAddDays}`);
            let nextFormatedi = format(birthdayy, "MM/dd/yyyy")
            setNextContactDayEdited(nextFormatedi)

        } else if (statusEdited === "Propuesta") {
            setLastContactDayEdited(todayFormated)

            const birthdayy = addDays(today, `${settings.propuestaAddDays}`);
            let nextFormatedo = format(birthdayy, "MM/dd/yyyy")
            setNextContactDayEdited(nextFormatedo)

        } else if (statusEdited === "Visita") {
            setLastContactDayEdited(todayFormated)

            const birthdayy = addDays(today, `${settings.visitaAddDays}`);
            let nextFormatedp = format(birthdayy, "MM/dd/yyyy")
            setNextContactDayEdited(nextFormatedp)

        } else if (statusEdited === "Captado") {
            setLastContactDayEdited(todayFormated)

            setNextContactDayEdited("-")
        } else if (statusEdited === "Rechazado") {
            setLastContactDayEdited(todayFormated)

            setNextContactDayEdited("-")
        }
    }
    const renderDateSetter = () => {
        setRenderDate(true)
    }

    const handleStatusEdited = (e) => {

        setStatusEdited(e.target.value)

        renderDateSetter()

    }
    const updateLastContactDate = () => {
        const db = getFirestore();
        if (adminUser === true) {
            const usersDoc = doc(db, "users", id)
            updateDoc(usersDoc, { lastContactDate: lastContactDayEdited })
        } else if (adminUser === false) {
            const usersDoc = doc(db, "usersDemo", id)
            updateDoc(usersDoc, { lastContactDate: lastContactDayEdited })
        }


    }
    const updateNextContactDate = async () => {
        const db = getFirestore();
        if (adminUser === true) {
            const usersDoc = doc(db, "users", id)
            updateDoc(usersDoc, { nextContactDate: nextContactDayEdited })
        } else if (adminUser === false) {
            const usersDoc = doc(db, "usersDemo", id)
            updateDoc(usersDoc, { nextContactDate: nextContactDayEdited })
        }

    }

    const updateStatus = async () => {
        const db = getFirestore();
        if (adminUser === true) {
            const usersDoc = doc(db, "users", id)
            await updateDoc(usersDoc, { status: statusEdited })
        } else if (adminUser === false) {
            const usersDoc = doc(db, "usersDemo", id)
            await updateDoc(usersDoc, { status: statusEdited })
        }
    }

    const dateFormated = ()=>{
      if(statusEdited === "Sin contactar"){
        setLastContactDateFormated("-")
        setNextContactDateFormated("-")
        
      }else if (statusEdited === "Rechazado"){
        let lastDateFormated = new Date(lastContactDayEdited)
        let lastDateForm = format(lastDateFormated, "dd/MM/yyyy")
        setLastContactDateFormated(lastDateForm)
        setNextContactDateFormated("-")
      }else if (statusEdited === "Captado"){
        let lastDateFormated = new Date(lastContactDayEdited)
        let lastDateForm = format(lastDateFormated, "dd/MM/yyyy")
        setLastContactDateFormated(lastDateForm)
        setNextContactDateFormated("-")
      }else{
        let lastDateFormated = new Date(lastContactDayEdited)
        let lastDateForm = format(lastDateFormated, "dd/MM/yyyy")
        setLastContactDateFormated(lastDateForm)
        let nextDateFormated = new Date(nextContactDayEdited)
      let nextDateForm = format(nextDateFormated, "dd/MM/yyyy")
      setNextContactDateFormated(nextDateForm)
      }
       
    }

    if (width > breakpoint) {
        return (
            <>

                <div className='user-container'>
                    <div className='user-subcontainer'>


                        <div onClick={handleOpen} className='usertext-container'><p >{name}</p></div>
                        <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                       {name}
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2, marginLeft: 3 }}>
                                       Ciudad: {city}
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2, marginLeft: 3  }}>
                                       Contacto: {googleName}
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2, marginLeft: 3  }}>
                                       Teléfono: {phone}
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2, marginLeft: 3  }}>
                                       Link: <a href={link} target="_blank" rel="noopener noreferrer" > link</a>
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2, marginLeft: 3  }}>
                                       Estado: {statusEdited}
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2, marginLeft: 3  }}>
                                       Último contacto: {lastContactDateFormated}
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2, marginLeft: 3  }}>
                                       Próximo contacto: {nextContactDateFormated}
                                    </Typography>
                                </Box>
                            </Modal>
                        <div className='usertext-container'><p >{city}</p></div>
                        <div className='usertext-container'><p >{googleName}</p></div>
                        <div className='usertext-container'><p >{phone}</p></div>
                        <div className='usertext-container'><a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', padding: '0px', margin: '0px' }}> <Button sx={{ m: 0, underline: 'hide', padding: "0px" }} variant="text" size='small'>Link</Button></a></div>
                        <div className='usertext-container'>
                            < StatusSelector handleStatusEdited={handleStatusEdited} statusEdited={statusEdited} status={status} />
                        </div>
                        <div className='usertext-container'><Test settings={settings} user={user} key={user.id} id={user.id} name={user.name} city={user.city} googleName={user.googleName} phone={user.phone} link={user.link} status={user.status} /></div>
                    </div>
                </div>
            </>
        )
    }
    {/*************************************************************MOBILE RESPONSIVE -600PX******************************************************************************************/ }
    return (
        <>

            <div className='user-container-mobile'>
                <div className='user-subcontainer-mobile'>
                    <div className='user-subcontainer-org'>
                        <div className='user-subcontainer-orgChild'>
                            <div onClick={handleOpen} className='usertext-container-mobile'><p>{name}</p></div>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={styleMobile}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                       {name}
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2, marginLeft: 3 }}>
                                       Ciudad: {city}
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2, marginLeft: 3  }}>
                                       Contacto: {googleName}
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2, marginLeft: 3  }}>
                                       Teléfono: {phone}
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2, marginLeft: 3  }}>
                                       Link: <a href={link} target="_blank" rel="noopener noreferrer" > link</a>
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2, marginLeft: 3  }}>
                                       Estado: {statusEdited}
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2, marginLeft: 3  }}>
                                       Último contacto: {lastContactDateFormated}
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2, marginLeft: 3  }}>
                                       Próximo contacto: {nextContactDateFormated}
                                    </Typography>
                                </Box>
                            </Modal>
                            <div className='usertext-container-mobile'><p>{googleName}</p></div>
                            <div className='usertext-container-mobile'>
                                <IconButton
                                    edge="end"
                                    aria-label="Editar"
                                    title="Editar"
                                    component={Link} to={`/user/${id}`}
                                >
                                    <CreateIcon />
                                </IconButton>

                            </div>
                        </div>
                        <div className='user-subcontainer-orgChild'>
                            <div className='usertext-container-mobile'><p>{phone}</p></div>
                            <div className='usertext-container-mobile'><p>{city}</p></div>
                        </div>

                    </div>
                    <div className='user-subcontainer-org'>
                        <div className='usertext-container-mobile'><a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', padding: '0px', margin: '0px' }}> <Button sx={{ m: 0, underline: 'hide', padding: "0px" }} variant="text" size='small'>Link</Button></a></div>
                        <div className='usertext-container-mobile'>
                            < StatusSelector handleStatusEdited={handleStatusEdited} statusEdited={statusEdited} status={status} />
                        </div>
                        <div className='usertext-container-mobile'><Test user={user} key={user.id} id={user.id} name={user.name} city={user.city} googleName={user.googleName} phone={user.phone} link={user.link} status={user.status} contactDate={user.contactDate} settings={settings} /></div>

                    </div>

                </div>
            </div>


        </>
    )
}
