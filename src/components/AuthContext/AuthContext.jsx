import React from 'react'
import { useEffect, useState,  createContext } from 'react'
import { signOut, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { collection, getFirestore, addDoc, updateDoc, doc, deleteDoc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
export const Auth = createContext()
export default function AuthContext({ children }) {

    const [userLog, setUserLog] = useState(false)
    const [adminUser, setAdminUser] = useState(null)
    const [userInfo, setUserInfo] = useState(null)
    const [msgError, setMsgError] = useState(null)
    const auth = getAuth()


    const navigate = useNavigate()
  

    async function getRol(uid) {
        const db = getFirestore();
        const usersLogRef = doc(db, `usersLogin/${uid}`)
        const docuCifrada = await getDoc(usersLogRef)
        const docuNormalizada = docuCifrada.data()
        return docuNormalizada
    }
    function getRolAndSetUser(user) {
        getRol(user.uid).then((res => {
            const role = { ...res }
            const roleInfo = role.rol
            if (user) {
                setUserLog(true)
                const dataUser = {
                    uid: user.uid,
                    email: user.email,
                    rol: roleInfo
                }
                setUserInfo(dataUser)
               
            }

        }))
    }
    const initial = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
               
                    getRolAndSetUser(user)         
                }    
        })
    }
  useEffect(() => {
        initial()
    }, [])


    useEffect(() => {
        const des = { ...userInfo }
        const rol = des.rol
        if (rol === "admin") {
            setAdminUser(true)
        } else if (rol === "user"){
            setAdminUser(false)
        }
    }, [userInfo])

    const rol = "user"

    const cerrarSesion = () => {
        const p = new Promise((res, rej) => {
            async function singOutAndSettUserLog() {
                await signOut(auth)
                setUserLog(false)
                setAdminUser(null)
            }
            res(singOutAndSettUserLog())
        })
        p.then(res => navigate('/login'))

    }

    const regUser = async (e, auth, userEmail, userPass) => {
        e.preventDefault()
       const infoUsuario = await createUserWithEmailAndPassword(auth, userEmail, userPass)   
            .then((usuarioFirebase) =>{
                setTimeout(() => {
                    const db = getFirestore();
                const usersLogRef = doc(db, `usersLogin/${usuarioFirebase.user.uid}`)  
                setDoc(usersLogRef, {
                    email: usuarioFirebase.user.email,
                    rol: rol                   
                })  
                }, 1500);
                               
                logUser(auth,userEmail, userPass)
                return usuarioFirebase
            })
            .catch((e) => {
               
                if (e.code == 'auth/invalid-email') {
                    setMsgError('*Formato Email incorrecto')
                } else if (e.code == 'auth/weak-password') {
                    setMsgError('*La contraseña debe tener 6 caracteres o mas')
                }
            })
   
    }
    const logUser = async (auth, userEmail, userPass)=>{
        await  signInWithEmailAndPassword(auth, userEmail, userPass)
            .then( (r)=> {
                setUserLog(true)
             
                    navigate('/')
             
                
                })
            .catch(err=> {
                if (err.code == 'auth/wrong-password') {
                setMsgError('*Contraseña inválida')}
            })
        }
    const value = { userLog, adminUser, userInfo, cerrarSesion, regUser, msgError, logUser }

    return (
        <Auth.Provider value={value}>
            {children}
        </Auth.Provider>
    )
}
