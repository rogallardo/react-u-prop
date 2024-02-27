import { getFirestore, doc, updateDoc, deleteDoc, getDoc, collection, addDoc } from 'firebase/firestore'
import CustomNotification from '../components/Alerts/CustomNotification'
import ConfirmDelete from '../components/Alerts/ConfirmDelete'

class UserService{
    async createUser(userCollection, newUser){
        try {
            const db = getFirestore();
            const usersDoc = collection(db, userCollection)
            const { id } = await addDoc(usersDoc, newUser)
            CustomNotification({ type: 'success', message: 'Usuario creado'})
            return id
        } catch (error) {
            console.log('error al crear usuario')
            CustomNotification({ type: 'error', message: 'No se pudo crear el usuario' })
            throw Error(error)
        }  

    }

    async updateUser(userCollection, id, updatedData){
        try {         
            const db = getFirestore()
            const userDocRef = doc(db, userCollection, id)
            await getDoc(userDocRef)
            // console.log(userDoc)  
            await updateDoc(userDocRef, updatedData)
            CustomNotification({ type: 'success', message: 'Usuario actualizado' })
            return {msg: 'ok'}
        } catch (error) {
            console.log('error actualizando')
            CustomNotification({ type: 'error', message: 'No se pudo actualizar el usuario' })
            throw Error(error)
        }
    }
    async deleteUser(userCollection, id) {
        try {
            const result = await new Promise((resolve, reject) => {
                ConfirmDelete({
                    onConfirm: async () => {
                        try {
                            const db = getFirestore()
                            const userDocRef = doc(db, userCollection, id)
                            await deleteDoc(userDocRef);
                            CustomNotification({ type: 'success', message: 'Usuario eliminado' });
                            resolve({ error: false }); 
                        } catch (error) {
                            CustomNotification({ type: 'error', message: 'No se pudo eliminar el usuario' });
                            resolve({ error: true }); 
                        }
                    },
                });
            });
    
            return result;
        } catch (error) {;
            CustomNotification({ type: 'error', message: 'No se pudo eliminar el usuario' });
            return { error: true };
        }
    }
}
const userService = new UserService()
export default userService
