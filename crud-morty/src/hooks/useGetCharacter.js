import { useEffect, useState } from 'react'
import { getCharacter } from '../helpers/getCharacter'

export const useGetCharacter = (filter) => {

    const [estado, setEstado] = useState({
        characters: {
            ListCharacters:[],
            countPages:1
        },
        cargando: true
    })

    useEffect(() => {
        setTimeout(() =>
        getCharacter(filter)
                .then(characters => {
                    setEstado({
                        characters: characters,
                        cargando: false
                    });
                }), 500)
    }, [filter])

    return estado;

}