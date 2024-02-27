import React from 'react'
import './User.scss'
import Test from '../test/Test'
import Button from '@mui/material/Button';
import { useContext, useState } from 'react';
import { Auth } from '../AuthContext/AuthContext';
import StatusSelector from '../StatusSelector/StatusSelector';
import { format, addDays  } from 'date-fns/esm';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import userService from '../../services/user.service'
import { Link } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import {  List, ListItem, ListItemText } from '@mui/material';

export default function User({  handleRefreshDelete, settings, user, id, name, googleName, city, phone, link, status }) {
    const { userCollection } = useContext(Auth)
    const mobile = useMediaQuery('(max-width: 700px)')
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = (open) => () => {
        setIsDrawerOpen(open);
    };


// update local status only if status on db is succesfully updated
    let newLastContactDate = ''
    let newNextContactDate = ''
    const handleUpdateStatus= async (value) => {
        try {
            const msg = await updatedDatesAndStatusOnDB(value)
            if(msg){
                   user.status = value
                   user.lastContactDate = newLastContactDate
                   user.nextContactDate = newNextContactDate
            }
            return msg     
        } catch (error) {
            throw Error('Error al actualizar el estado')         
        }          
    }
    const updatedDatesAndStatusOnDB = async(value)=>{
        try {
            const updatedData = {};
            if(value === 'Contactado'){
               const {newNextContactDate, todayFormatted} = addingDays(settings.contactadoAddDays);
               updatedData.lastContactDate = todayFormatted;
               updatedData.nextContactDate = newNextContactDate;
               updatedData.status = value;

           }else if(value === 'Re-contactado'){
               const {newNextContactDate, todayFormatted} = addingDays(settings.reContactadoAddDays);
               updatedData.lastContactDate = todayFormatted;
               updatedData.nextContactDate = newNextContactDate;
               updatedData.status = value;

           }else if(value === 'Propuesta'){
               const {newNextContactDate, todayFormatted} = addingDays(settings.propuestaAddDays);
               updatedData.lastContactDate = todayFormatted;
               updatedData.nextContactDate = newNextContactDate;
               updatedData.status = value;
           }else if (value ==='Visita'){
               const {newNextContactDate, todayFormatted} = addingDays(settings.visitaAddDays);
               updatedData.lastContactDate = todayFormatted;
               updatedData.nextContactDate = newNextContactDate;
               updatedData.status = value;

           }else if (value ==='Rechazado' || value === 'Captado'){
               const dateFormat = 'MM/dd/yy';     
               const today = new Date(); 
               const todayFormatted = format(today, dateFormat);
               updatedData.lastContactDate = todayFormatted;
               updatedData.nextContactDate = '-';
               updatedData.status = value;

           }else if(value==='Sin contactar'){
               updatedData.lastContactDate =  '-';
               updatedData.nextContactDate = '-';
               updatedData.status = value;
           }
           newLastContactDate = updatedData.lastContactDate
           newNextContactDate = updatedData.nextContactDate

           const { msg } = await userService.updateUser(userCollection, id, updatedData);
           return msg
        } catch (error) {
            console.log(error)
        }
       
    } 
    const addingDays = (daysNumber)=>{
        const dateFormat = 'MM/dd/yy';     
        const today = new Date(); 
        const todayFormatted = format(today, dateFormat)
        const updatedDate = addDays(today, daysNumber);  
        const newNextContactDate = format(updatedDate, dateFormat);
        const result = {
            newNextContactDate, todayFormatted
        }
        return result
    }
    //delete btn
    const handleDelete = async() => {
            const {error} = await userService.deleteUser(userCollection, id)     
            if(!error){
                handleRefreshDelete(id)
            }    
    };
        return (
            <>
            {
               !mobile ?
               (
                <>
                <div className='user-container'>
                    <div  className='usertext-container'><p >{name}</p></div>                    
                    <div className='usertext-container'><p >{city}</p></div>
                    <div className='usertext-container'><p >{googleName}</p></div>
                    <div className='usertext-container'><p >{phone}</p></div>
                    <div className='usertext-container'><a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', padding: '0px', margin: '0px' }}> <Button sx={{ m: 0, underline: 'hide', padding: "0px" }} variant="text" size='small'>Link</Button></a></div>
                    <div className='usertext-container'>
                        < StatusSelector  status={status} handleUpdateStatus={handleUpdateStatus}/>
                    </div>
                    <div className='usertext-container'><Test settings={settings} user={user} key={user.id} id={user.id} name={user.name} city={user.city} googleName={user.googleName} phone={user.phone} link={user.link} status={user.status} /></div>                        
                    <div className='usertext-container'><Link to={`/user/${id}`} ><div><CreateIcon/></div></Link> <div onClick={handleDelete}><DeleteIcon /></div> </div>
                </div>
                
                </>

               ):(
                <>
                <div className='user-container-mobile'>
                    <div className='usertext-container name' onClick={toggleDrawer(true)}><p >{googleName}</p></div>
                    <div className='usertext-container'><a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', padding: '0px', margin: '0px' }}> <Button sx={{ m: 0, underline: 'hide', padding: "0px" }} variant="text" size='small'>Link</Button></a></div>
                    <div className='usertext-container status'>
                        < StatusSelector  status={status} handleUpdateStatus={handleUpdateStatus}/>
                    </div>
                    <div className='usertext-container'><Test settings={settings} user={user} key={user.id} id={user.id} name={user.name} city={user.city} googleName={user.googleName} phone={user.phone} link={user.link} status={user.status} /></div>
                </div>
                <Drawer anchor="bottom" open={isDrawerOpen} onClose={toggleDrawer(false)}>
                <List>
                <ListItem button >
                        <ListItemText primary={googleName} style={{color: 'black'}} />
                    </ListItem>
                    <ListItem button >
                        <ListItemText primary={name} />
                    </ListItem>
                    <ListItem button >
                        <ListItemText primary={city} />
                    </ListItem>
                    <ListItem button >
                        <ListItemText primary={phone} />
                    </ListItem>
                    <ListItem button >
                    <Link to={`/user/${id}`} style={{ textDecoration: 'none', color: 'inherit' }} ><p style={{textDecoration: 'none', fontWeight:'500'}}>Editar</p></Link>
                    </ListItem>
                    <ListItem button onClick={handleDelete}>
                        <p style={{color: 'red', fontWeight:'500'}}>Eliminar</p>
                    </ListItem>

                  
                </List>
            </Drawer>
                </>
               )
            }
                
            </>
        )
    }

