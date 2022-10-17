import React from 'react'
import './HomePage.css'
import { Link } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import { useContex, useState, useEffect } from 'react'
import { Auth } from '../AuthContext/AuthContext'
import CircularProgress from '@mui/material/CircularProgress';


export default function HomePage() {
    const [loading, setLoading] = useState(true)
    const initializeNavBar = () => {
        setTimeout(() => {
            setLoading(false)
        }, 1500)
    }
    useEffect(() => {
        initializeNavBar()
    }, [])


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
