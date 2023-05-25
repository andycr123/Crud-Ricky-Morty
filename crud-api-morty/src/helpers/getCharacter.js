import axios from 'axios'
import Swal from 'sweetalert'

export const getCharacter = async (filter) => {
    const result = await axios.get(`https://rickandmortyapi.com/api/character${filter}`).then((res) => {
        if (res.status === 200) {
            const listPersonajesRestult = res.data.results.map(({ image, id, gender, name, species, status }) => ({
                image,
                id,
                gender,
                name,
                species,
                status
            }))
            const result = {
                countPages: res.data.info.pages,
                ListCharacters:listPersonajesRestult
            }
            return result
        }
    }).catch((err) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message
        })
        console.error(err)
    })

    return result
}
