import React from 'react'
import { useEffect, useState } from 'react'
import './NavBar.css'
import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { Auth } from '../AuthContext/AuthContext';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import SideBarMobile from '../SideBarMobile/SideBarMobile';



export default function NavBar() {
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 700;
  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResizeWindow);
    return () => {

      window.removeEventListener("resize", handleResizeWindow);
    };
  }, [])

  const { userLog, adminUser, userInfo, cerrarSesion } = useContext(Auth)
  const [hideMenu, setHideMenu] = useState(true)
  const [showAdminMenu, setShowAdminMenu] = useState(false)
  const [msgPerfil, setMsgPerfil] = useState('')
  const [openSideBar, setOpenSideBar] = useState(false)

  const [anchorEl, setAnchorEl] = React.useState(null);
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



  if (width > breakpoint) {
    return (
      <>
        {
          !hideMenu &&
          <div className="navbar-container">
            <div ><Link className='brand-container' to={"/"}>U-prop</Link></div>
            {
              userLog ?

                <>
                  <div className='logOut-btn-container'>

                    <ListItemIcon onClick={cerrarSesion}>
                      <Logout fontSize="small" /> Cerrar sesión
                    </ListItemIcon>
                  </div>
                </>
                :

                <span></span>

            }

          </div>


        }

      </>
    )
  }
  {/*************************************************************MOBILE RESPONSIVE -600PX******************************************************************************************/ }
  return (
    <>
      {
        !hideMenu &&
        <div className="navbar-container">
          <div onClick={handleOpenSideBar} >U-prop
          </div>
          {


            userLog ?

              <>

                <div className='logOut-btn-container'>

                  <ListItemIcon onClick={cerrarSesion}>
                    <Logout fontSize="small" /> Cerrar sesión
                  </ListItemIcon>
                </div>

              </>
              :

              <span></span>

          }

        </div>


      }

      {
        userLog ?
          <>
            {
              <>
                {
                  openSideBar &&
                    <div className=' sideBarMobile-container-inNavBar'>
                      <SideBarMobile />

                    </div>
                    
                }
                
              </>
              
            }
          </>
          :
          <span></span>
}


    </>
  )
}