import React from 'react'
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/300.css';
import { useState, useEffect, PureComponent } from 'react'
import TextField from '@mui/material/TextField';

import './login.css'
import { collection, getFirestore, addDoc, updateDoc, doc, deleteDoc, setDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import NavBar from '../NavBar/NavBar';
import { useNavigate } from 'react-router-dom';
import { Email } from '@mui/icons-material';
import { useContext} from 'react'
import { Auth } from '../AuthContext/AuthContext'



export default function Login() {
    const navigate = useNavigate ()
    const { userLog, adminUser, userInfo, cerrarSesion, regUser, msgError, logUser } = useContext(Auth)
    const [userEmail, setUserEmail] = useState('')
    const [userPass, setUserPass] = useState('')
  
    const auth = getAuth()
   
    
    const submitReg = (e)=>{
        regUser(e, auth, userEmail, userPass)
    }
    const submitLog = ()=>{
        logUser(auth, userEmail, userPass)
    }
 
   

    const handleUserEmail = (e) => {
        setUserEmail(e.target.value)
    }
    const handleUserPass = (e) => {
        setUserPass(e.target.value)
    }
    const rol = "user"





    return (
        <>
       
        <div className='big-container-log'>
            <div className='form-container-log'>
                <div className='input-style-container-log'>
                    <TextField className='input-style-log' id="outlined-basic" label="Usuario" variant="outlined" onChange={handleUserEmail} type="email" value={userEmail} />
                </div>
                <div className='input-style-container-log'>
                    <TextField className='input-style-log' id="outlined-password-input" label="Password" type="password" autoComplete="current-password" onChange={handleUserPass} value={userPass} />
                </div>
            </div>
            <div className='button-container-log'>
                <button onClick={submitReg} className='buttonReg-style-log' >Registrar usuario</button>
            </div>
            <div className='button-container-log'>
                <button onClick={submitLog} className='buttonLog-style-log' >Iniciar sesión</button>
            </div>


            {
                msgError ?
                    <div className='button-container-log' >
                        <p className="msgError-text"> {msgError}</p>
                    </div>
                    :
                    <div></div>
            }


        </div>
        </>
    )
}
