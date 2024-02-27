import React from 'react'
import './sideBar.css'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import IconButton from '@mui/material/IconButton';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Link, useLocation } from "react-router-dom";
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';

export default function SideBar() {
    const { pathname } = useLocation();
        return (
            <>
        <div className='sideBar-container'>
            <Link to={"/"}>
                <div className='icon-container'>
                    <div className={pathname === "/" ? 'icon-pressed' : 'icon-subcontainer'} >

                        <IconButton
                            disabled
                            aria-label="inicio"
                            title="Inicio"

                        >
                            <HomeOutlinedIcon style={pathname === '/' ? {color: '#cac6d7'} : {color: '#43396f'}} />
                        </IconButton>
                    </div>
                </div>

            </Link>
            <Link to={"/userCreator"}>
                <div className='icon-container'>
                    <div className={pathname === "/userCreator" ? 'icon-pressed' : 'icon-subcontainer'} >
                        <IconButton
                            disabled
                            aria-label="agregar"
                            title="Agregar usuario"
                        >
                            <PersonAddAltOutlinedIcon style={pathname === '/userCreator' ? {color: '#cac6d7'} : {color: '#43396f'}}/>
                        </IconButton>
                    </div>
                </div>

            </Link>
            <Link to={"/calendar"}>
                <div className='icon-container'>
                    <div className={pathname === "/calendar" ? 'icon-pressed' : 'icon-subcontainer'}>
                        <IconButton
                            disabled
                            aria-label="calendario"
                            title="Calendario"
                        >
                            <CalendarMonthOutlinedIcon style={pathname === '/calendar' ? {color: '#cac6d7'} : {color: '#43396f'}} />
                        </IconButton>
                    </div>
                </div>

            </Link>
            <Link to={"/statistics"}>
            <div className='icon-container'>
                <div className={pathname === "/statistics" ? 'icon-pressed' : 'icon-subcontainer'} >
                    <IconButton
                        disabled
                        aria-label="configuracion"
                        title="Configuración"
                    >
                        <AssessmentOutlinedIcon style={pathname === '/statistics' ? {color: '#cac6d7'} : {color: '#43396f'}} />
                    </IconButton>
                </div>
            </div>

        </Link>
            <Link to={"/settings"}>
                <div className='icon-container'>
                    <div className={pathname === "/settings" ? 'icon-pressed' : 'icon-subcontainer'} >
                        <IconButton
                            disabled
                            aria-label="configuracion"
                            title="Configuración"
                        >
                            <SettingsOutlinedIcon style={pathname === '/settings' ? {color: '#cac6d7'} : {color: '#43396f'}} />
                        </IconButton>
                    </div>
                </div>
            </Link>
        </div>
    </>
    )        
}