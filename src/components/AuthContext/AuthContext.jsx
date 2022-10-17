import React from 'react'
import { useEffect, useState, useContext, createContext } from 'react'
import { signOut, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { collection, getFirestore, addDoc, updateDoc, doc, deleteDoc, setDoc, getDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
export const Auth = createContext()
export default function AuthContext({ children }) {

    const initialDataUser = {
        uid: '',
        email: '',
        rol: 'user'
    }


    const [userLog, setUserLog] = useState(false)
    const [adminUser, setAdminUser] = useState(false)
    const [userInfo, setUserInfo] = useState(initialDataUser)
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
                if (userInfo === initialDataUser) {
                    getRolAndSetUser(user)
                }


            } else {
                setUserInfo(initialDataUser)
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
        } else {
            setAdminUser(false)
        }

    }, [userInfo])


    const cerrarSesion = () => {
        const p = new Promise((res, rej) => {
            async function singOutAndSettUserLog() {
                await signOut(auth)
                setUserLog(false)
                setAdminUser(false)
            }
            res(singOutAndSettUserLog())
        })
        p.then(res => navigate('/login'))

    }


    const value = { userLog, adminUser, userInfo, cerrarSesion }

    return (
        <Auth.Provider value={value}>
            {children}
        </Auth.Provider>
    )
}
