import React from 'react'
import { useEffect, useState,  createContext } from 'react'
import { signOut, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { getFirestore,  doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
export const Auth = createContext()
export default function AuthContext({ children }) {

    const [userLog, setUserLog] = useState(false)
    const [adminUser, setAdminUser] = useState(null)
    const [userCollection, setUserCollection] = useState('usersDemo'); // Valor por defecto
    const [settingsCollection, setSettingsCollection] = useState('settingsDemo'); // Valor por defecto
    const [userInfo, setUserInfo] = useState('')
    const [msgError, setMsgError] = useState('')
    const auth = getAuth()
    const navigate = useNavigate()

    useEffect(() => {
        initial()
    }, [])
  

    const initial = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {      
              
               getRolAndSetUser(user) 
               return 
            }   
            navigate('/login')
        },
        ()=>{
            throw Error('Error getting session user')
        }
        )
    }
    async function getRol(uid) {
        const db = getFirestore();
        const usersLogRef = doc(db, `usersLogin/${uid}`)
        const docuCifrada = await getDoc(usersLogRef)
        const docuNormalizada = docuCifrada.data()
        return docuNormalizada
    }
    async function getRolAndSetUser(user) {   
        if (user) {
            const { rol } = await getRol(user.uid)
            const dataUser = {
                uid: user.uid,
                email: user.email,
                rol: rol
            }
            setUserInfo(dataUser)
            setUserLog(true)
            if (rol === "admin") {
                setAdminUser(true)
                setUserCollection('users')
                setSettingsCollection('settings')
            } else {
                setAdminUser(false)
                setUserCollection('usersDemo')
                setSettingsCollection('settingsDemo')
            }                
        }
    }
    const cerrarSesion = async () => {     
                await signOut(auth)
                setUserInfo('')
                setUserLog(false)
                setAdminUser(null)
                setMsgError('')
                navigate('/login')
               
    }
    const regUser = async (auth, userEmail, userPass) => {     
        try{        
            const userCreated = await createUserWithEmailAndPassword(auth, userEmail, userPass)
            const db = getFirestore();
            const userLogRef = doc(db, `usersLogin/${userCreated.user.uid}`)
            const rol = "user"
            setDoc(userLogRef, {
                email: userCreated.user.email,
                rol: rol                   
            })
            if(userCreated.user){
                logUser(auth,userEmail, userPass) 
            }                       
        }catch(error){             
            if (error.code == 'auth/invalid-email') {
                setMsgError('*Formato Email incorrecto')
            } else if (error.code == 'auth/weak-password') {
                setMsgError('*La contraseña debe tener 6 caracteres o mas')
            }
        }
    }
    const logUser = async (auth, userEmail, userPass)=>{
        try {
            await  signInWithEmailAndPassword(auth, userEmail, userPass) 
            setUserLog(true)            
            navigate('/') 
        } catch (error) {     
            if (error) {           
            setMsgError('Error al ingresar, intente nuevamente')}
        }
        
    }
    const value = { userCollection, settingsCollection, userLog, adminUser, userInfo, cerrarSesion, regUser, msgError, logUser }

    return (
        <Auth.Provider value={value}>
            {children}
        </Auth.Provider>
    )
}
