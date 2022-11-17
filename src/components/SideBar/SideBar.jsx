import React from 'react'
import './sideBar.css'
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import IconButton from '@mui/material/IconButton';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useContext } from 'react';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';

import { Auth } from '../AuthContext/AuthContext';


export default function SideBar() {
    const [width, setWidth] = React.useState(window.innerWidth);
    const breakpoint = 700;
    const { userLog, adminUser, userInfo, cerrarSesion } = useContext(Auth)
    const [hideMenu, setHideMenu] = useState(true)
    const [showAdminMenu, setShowAdminMenu] = useState(false)
    const [msgPerfil, setMsgPerfil] = useState('')
    const [openSideBar, setOpenSideBar] = useState(false)

    const [anchorEl, setAnchorEl] = React.useState(null);
    useEffect(() => {
        const handleResizeWindow = () => setWidth(window.innerWidth);

        window.addEventListener("resize", handleResizeWindow);
        return () => {

            window.removeEventListener("resize", handleResizeWindow);
        };
    }, [])
    const open = Boolean(anchorEl);
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleOpenSideBar = () => {
        if (openSideBar === false) {
            setOpenSideBar(true)
        } else {
            setOpenSideBar(false)
        }

    }


    useEffect(() => {
        if (showAdminMenu) {
            setMsgPerfil('A')
        } else {
            setMsgPerfil('U')
        }
    }, [showAdminMenu])


    const initializeNavBar = () => {
        if (userLog === false) {
            setHideMenu(true)
        } else {
            setTimeout(() => {
                setHideMenu(false)
            }, 1000)

        }
    }
    useEffect(() => {
        initializeNavBar()
    }, [userLog])

    useEffect(() => {
        if (adminUser === true) {
            setShowAdminMenu(true)
        } else {
            setShowAdminMenu(false)
        }
    }, [adminUser])







    const { pathname } = useLocation();
    if (width > breakpoint) {

        return (
            <>
                {
                    !hideMenu &&
                    <>
                        {
                            userLog ?

                                <div className='sideBar-container'>
                                    <Link to={"/"}>
                                        <div className='icon-container'>
                                            <div className={pathname === "/" ? 'icon-pressed' : 'icon-subcontainer'} >

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
                                        <div className='icon-container'>
                                            <div className={pathname === "/userCreator" ? 'icon-pressed' : 'icon-subcontainer'} >
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
                                        <div className='icon-container'>
                                            <div className={pathname === "/calendar" ? 'icon-pressed' : 'icon-subcontainer'}>
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
                                    <div className='icon-container'>
                                        <div className={pathname === "/statistics" ? 'icon-pressed' : 'icon-subcontainer'} >
                                            <IconButton
                                                disabled
                                                aria-label="configuracion"
                                                title="Configuración"
                                            >
                                                <AssessmentOutlinedIcon />
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
                                                    <SettingsOutlinedIcon />
                                                </IconButton>
                                            </div>
                                        </div>

                                    </Link>

                                </div>
                                : <span></span>
                        }
                    </>
                }
            </>

        )
    }

}