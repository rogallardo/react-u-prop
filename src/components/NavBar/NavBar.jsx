import React from 'react'
import { useEffect, useState } from 'react'
import './NavBar.css'
import { useContext } from 'react';
import { Auth } from '../AuthContext/AuthContext';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import SideBarMobile from '../SideBarMobile/SideBarMobile';
import SideBar from '../SideBar/SideBar';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';



export default function NavBar() {
  const { userLog, adminUser, userInfo, cerrarSesion } = useContext(Auth)
  const [hideMenu, setHideMenu] = useState(true)
  const [openSideBar, setOpenSideBar] = useState(false)
  const mobile = useMediaQuery('(max-width: 700px)')

  useEffect(() => {
    initializeNavBar()
  }, [userLog])

  const initializeNavBar = () => {
    if (!userLog) {
      return setHideMenu(true)
    }
    setHideMenu(false)
  }
  const handleOpenSideBar = () => {
    if (!openSideBar) {
      return setOpenSideBar(true)
    }
    setOpenSideBar(false)
  }


  return (
    <>
      {
        !mobile ?
          (

            !hideMenu ?
              (<>
                <SideBar />
                <div className="navbar-container">
                  <div >
                    <p className='brand-container' style={{marginLeft: '20px'}}>YouProp</p>
                  </div>
                  <div className='logOut-btn-container'>
                    <div onClick={cerrarSesion}>
                      <Logout />
                    </div>
                  </div>
                </div>
              </>)
              :
              (<span></span>)

          ) :
          (
            <>
              {
                !hideMenu ?
                  (
                    <>
                      {
                        openSideBar &&
                        <div onClick={handleOpenSideBar}>
                          <SideBarMobile />
                        </div>

                      }
                      <div className="navbar-container">
                        <div className='brand-container' onClick={handleOpenSideBar} style={{marginLeft: '20px'}} >
                          <i>
                            <MenuIcon />
                          </i>
                         
                        </div>
                        <div className='logOut-btn-container'>
                          <ListItemIcon onClick={cerrarSesion}>
                            <Logout fontSize="small" style={{color:'white'}}/>
                          </ListItemIcon>
                        </div>
                      </div>

                    </>
                  )
                  :
                  (<span></span>)
              }
            </>
          )
      }
    </>
  )
}

