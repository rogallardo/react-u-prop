import React from 'react'
import './sideBarMobile.css'
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import IconButton from '@mui/material/IconButton';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';

 
export default function SideBarMobile() {
    const [width, setWidth] = React.useState(window.innerWidth);
    const breakpoint = 700;
    useEffect(() => {
        const handleResizeWindow = () => setWidth(window.innerWidth);

        window.addEventListener("resize", handleResizeWindow);
        return () => {

            window.removeEventListener("resize", handleResizeWindow);
        };
    }, [])

    const { pathname } = useLocation();
    if (width < breakpoint) {

        return (
            <div className='sideBarMobile-container'>
                <Link to={"/"}>
                    <div className='icon-container-Mobile'>
                        <div className={pathname === "/" ? 'icon-pressed-Mobile' : 'icon-subcontainer-Mobile'} >

                            <IconButton
                                disabled
                                aria-label="inicio"
                                title="Inicio"

                            >
                                <HomeOutlinedIcon />
                            </IconButton>
                        </div>
                    </div>

                </Link>
                <Link to={"/userCreator"}>
                    <div className='icon-container-Mobile'>
                        <div className={pathname === "/userCreator" ? 'icon-pressed-Mobile' : 'icon-subcontainer-Mobile'} >
                            <IconButton
                                disabled
                                aria-label="agregar"
                                title="Agregar usuario"
                            >
                                <PersonAddAltOutlinedIcon />
                            </IconButton>
                        </div>
                    </div>

                </Link>
                <Link to={"/calendar"}>
                    <div className='icon-container-Mobile'>
                        <div className={pathname === "/calendar" ? 'icon-pressed-Mobile' : 'icon-subcontainer-Mobile'}>
                            <IconButton
                                disabled
                                aria-label="calendario"
                                title="Calendario"
                            >
                                <CalendarMonthOutlinedIcon />
                            </IconButton>
                        </div>
                    </div>

                </Link>
                <Link to={"/statistics"}>
                                    <div className='icon-container-Mobile'>
                                        <div className={pathname === "/statistics" ? 'icon-pressed-Mobile' : 'icon-subcontainer-Mobile'} >
                                            <IconButton
                                                disabled
                                                aria-label="estadisticas"
                                                title="Estadísticas"
                                            >
                                                <AssessmentOutlinedIcon />
                                            </IconButton>
                                        </div>
                                    </div>

                                </Link>
                <Link to={"/settings"}>
                    <div className='icon-container-Mobile'>
                        <div className={pathname === "/settings" ? 'icon-pressed-Mobile' : 'icon-subcontainer-Mobile'} >
                            <IconButton
                                disabled
                                aria-label="configuracion"
                                title="Configuración"
                            >
                                <SettingsOutlinedIcon />
                            </IconButton>
                        </div>
                    </div>

                </Link>

            </div>
        )
    }

}