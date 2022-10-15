import React from 'react'
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/300.css';
import { useState, useEffect, PureComponent } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './login.css'
import { collection, getFirestore, addDoc, updateDoc, doc, deleteDoc, setDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import NavBar from '../NavBar/NavBar';
import { useNavigate } from 'react-router-dom';
import { Email } from '@mui/icons-material';



export default function Login() {
    const navigate = useNavigate ()

    const [userEmail, setUserEmail] = useState('')
    const [userPass, setUserPass] = useState('')
    const [prueba, setPrueba] = useState('')
    const [msgError, setMsgError] = useState(null)


    const auth = getAuth()

    const handleUserEmail = (e) => {
        setUserEmail(e.target.value)
    }
    const handleUserPass = (e) => {
        setUserPass(e.target.value)
    }
    const rol = "user"
    //.then(r => navigate('/'))
   const regUser = async (e) => {
        e.preventDefault()
       const infoUsuario = await createUserWithEmailAndPassword(auth, userEmail, userPass)   
            .then((usuarioFirebase) =>{
                navigate('/')
                return usuarioFirebase
            })
            .catch((e) => {
               
                if (e.code == 'auth/invalid-email') {
                    setMsgError('*Formato Email incorrecto')
                } else if (e.code == 'auth/weak-password') {
                    setMsgError('*La contraseña debe tener 6 caracteres o mas')
                }
            })
             
            const db = getFirestore();
            const usersLogRef = doc(db, `usersLogin/${infoUsuario.user.uid}`)  
            setDoc(usersLogRef, {
                correo: infoUsuario.user.email,
                rol: rol
 
            })
    }

    const logUser = ()=>{
        signInWithEmailAndPassword(auth, userEmail, userPass)
        .then( (r)=> navigate('/'))
        .catch(err=> {
            if (err.code == 'auth/wrong-password') {
            setMsgError('*Contraseña inválida')}
        })
    }

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
                <button onClick={regUser} className='buttonReg-style-log' >Registrar usuario</button>
            </div>
            <div className='button-container-log'>
                <button onClick={logUser} className='buttonLog-style-log' >Iniciar sesión</button>
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
