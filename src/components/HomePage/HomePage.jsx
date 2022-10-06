import React from 'react'
import './HomePage.css'
import { Link } from 'react-router-dom'

export default function HomePage() {
    return (
        <>
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

        </>

    )
}
