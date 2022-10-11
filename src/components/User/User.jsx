import React from 'react'
import './User.css'
import Test from '../test/Test'
import { useState, useEffect, useRef } from 'react'
import { collection, where, getDocs, getFirestore, query, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Menu from '@mui/material/Menu';

import Box from '@mui/material/Box';

import '@fontsource/roboto/300.css';
import { PureComponent } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import StatusSelector from '../StatusSelector/StatusSelector';
import CreateIcon from '@mui/icons-material/Create';
import { format, addDays, parse } from 'date-fns/esm';

import IconButton from '@mui/material/IconButton';

/* const contactDateConverse = () => {
     const validDate = parse(contactDate, "yyyy/MM/dd", new Date())
     let todayFormat = format(validDate, "dd/MM/yyyy")
     setContactDateFormated(todayFormat)

 }*/



/*function updateName() {
     setEditar(false)
     const db = getFirestore();
     const usersDoc = doc(db, "users", id)
     updateDoc(usersDoc, { name: nameEdited })
     name = nameEdited
 }*/

export default function User({ user, id, name, googleName, cityLabel, phone, link, status, lastContactDate, nextContactDate }) {
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


    const [statusEdited, setStatusEdited] = useState(status)
    const [nextContactDayEdited, setNextContactDayEdited] = useState(nextContactDate)
    const [lastContactDayEdited, setLastContactDayEdited] = useState(lastContactDate)
    const [renderDate, setRenderDate] = useState(false)


    useEffect(() => {
        user.lastContactDate=lastContactDayEdited
        if (renderDate === true) {
        updateLastContactDate()
        
    }
        
    }, [lastContactDayEdited])

    
    useEffect(() => {
        user.nextContactDate=nextContactDayEdited
        if (renderDate === true) {
        updateNextContactDate()}
        
    }, [nextContactDayEdited])
    

    useEffect(() => {
        user.status=statusEdited
        
        

        if (renderDate === true) {
            newDateContactSetter()
            
        }
        updateStatus()
    
 
    }, [statusEdited]);


        const newDateContactSetter = () => {
            let today = new Date()
            let todayFormated = format(today, "MM/dd/yyyy")
            if (statusEdited === "Sin contactar"){
                setLastContactDayEdited("-")
                setNextContactDayEdited("-")
            }
            else if (statusEdited === "Contactado") {             
                setLastContactDayEdited(todayFormated)
                
                const birthday = addDays(today, 20)
                let nextFormateded = format(birthday, "MM/dd/yyyy")
                setNextContactDayEdited(nextFormateded)
                
            } else if (statusEdited === "Re-contactado") {
                setLastContactDayEdited(todayFormated)
                
                const birthdayy = addDays(today, 30);
                let nextFormatedi = format(birthdayy, "MM/dd/yyyy")
                setNextContactDayEdited(nextFormatedi)
            
            }else if (statusEdited === "Propuesta") {
                setLastContactDayEdited(todayFormated)
                
                const birthdayy = addDays(today, 2);
                let nextFormatedo = format(birthdayy, "MM/dd/yyyy")
                setNextContactDayEdited(nextFormatedo)
            
            }else if (statusEdited === "Visita") {
                setLastContactDayEdited(todayFormated)
                
                const birthdayy = addDays(today, 2);
                let nextFormatedp = format(birthdayy, "MM/dd/yyyy")
                setNextContactDayEdited(nextFormatedp)
    
            }else if (statusEdited === "Captado") {
                setLastContactDayEdited(todayFormated)
                
                setNextContactDayEdited("-")   
            } else if (statusEdited === "Rechazado") {
                setLastContactDayEdited("-")
                
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
        const updateLastContactDate  = async () => {
            const db = getFirestore();
            const usersDoc = doc(db, "users", id)
            await updateDoc(usersDoc, { lastContactDate: lastContactDayEdited })
            
        }
        const updateNextContactDate  = async () => {
            const db = getFirestore();
            const usersDoc = doc(db, "users", id)
            await updateDoc(usersDoc, { nextContactDate: nextContactDayEdited })
        }

        const updateStatus = async () => {
            const db = getFirestore();
            const usersDoc = doc(db, "users", id)
            await updateDoc(usersDoc, { status: statusEdited })
            
            
        }

        if (width > breakpoint) {
            return (
                <>

                    <div className='user-container'>
                        <div className='user-subcontainer'>
                            <div className='usertext-container'><Typography><p >{name}</p></Typography></div>
                            <div className='usertext-container'><Typography><p >{cityLabel}</p></Typography></div>
                            <div className='usertext-container'><Typography><p >{googleName}</p></Typography></div>
                            <div className='usertext-container'><Typography><p >{phone}</p></Typography></div>

                            <div className='usertext-container'><Typography><p >{lastContactDayEdited}</p></Typography></div>
                            <div className='usertext-container'><Typography><p >{nextContactDayEdited}</p></Typography></div>
                            <div className='usertext-container'><a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', padding: '0px', margin: '0px' }}> <Button sx={{ m: 0, underline: 'hide', padding: "0px" }} variant="text" size='small'>Link</Button></a></div>
                            <div className='usertext-container'>
                                < StatusSelector handleStatusEdited={handleStatusEdited} statusEdited={statusEdited} status={status} />
                            </div>
                            <div className='usertext-container'><Test user={user} key={user.id} id={user.id} name={user.name} cityLabel={user.cityLabel} googleName={user.googleName} phone={user.phone} link={user.link} status={user.status} /></div>
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
                                <div className='usertext-container-mobile'><Typography><p>{name}</p></Typography></div>
                                <div className='usertext-container-mobile'><Typography><p>{googleName}</p></Typography></div>
                                <div className='usertext-container-mobile'>
                                    <IconButton
                                        edge="end"
                                        aria-label="Editar"
                                        title="Editar"
                                    >
                                        <CreateIcon />
                                    </IconButton>

                                </div>
                            </div>
                            <div className='user-subcontainer-orgChild'>
                                <div className='usertext-container-mobile'><Typography><p>{phone}</p></Typography></div>
                                <div className='usertext-container-mobile'><Typography><p>{cityLabel}</p></Typography></div>
                            </div>

                        </div>
                        <div className='user-subcontainer-org'>
                            <div className='usertext-container-mobile'><a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', padding: '0px', margin: '0px' }}> <Button sx={{ m: 0, underline: 'hide', padding: "0px" }} variant="text" size='small'>Link</Button></a></div>
                            <div className='usertext-container-mobile'>
                                < StatusSelector handleStatusEdited={handleStatusEdited} statusEdited={statusEdited} status={status} />
                            </div>
                            <div className='usertext-container-mobile'><Test user={user} key={user.id} id={user.id} name={user.name} cityLabel={user.cityLabel} googleName={user.googleName} phone={user.phone} link={user.link} status={user.status} contactDate={user.contactDate} /></div>

                        </div>

                    </div>
                </div>


            </>
        )
    }
