import React from 'react'
import './HomePage.css'
import { Link } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import { useContext, useState, useEffect } from 'react'
import { Auth } from '../AuthContext/AuthContext'
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';


export default function HomePage() {
    const navigate = useNavigate()
    const { userLog, adminUser, userInfo, cerrarSesion } = useContext(Auth)
    const [loading, setLoading] = useState(true)
    const initializeHomePage = () => {
        if (userLog === true) {
                setLoading(false)
        }

    }
    useEffect(() => {
        setTimeout(() => {
            initializeHomePage()
        }, 1000)
    }, [userLog])


    return (
        <>
            {
                !loading ?
                    <div className='homeApp-container'>
                        <div className='homeApp-subcontainer'>
                            <div className='titleApp-container'>
                                <h1 className='titleApp'>U-prop</h1>
                            </div>
                            <div className='btnsHome-container'>

                                <div className='btn-container-buscar'>
                                    <Link to="/UserList">
                                        <button>Buscar</button>
                                    </Link>
                                </div>
                                <div className='btn-container-añadirUsuario'>
                                    <Link to="/UserEdit">
                                        <button>Añadir</button>

                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className='loadingPage'>
                        <CircularProgress />
                    </div>

            }


        </>

    )
}
