import Swal from 'sweetalert'
import { firebase } from '../firebase'
export const getListaOpiniones = async () => {

    try {
        const db = firebase.firestore()
        const data = await db.collection('OpinionesPersonajes').get()
        const listPersonajesRestult = data.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        return listPersonajesRestult
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ocurrio un error al consultar a la base de datos.'
        })
    }
}