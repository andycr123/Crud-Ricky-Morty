import { Button } from 'react-bootstrap'
import React from 'react'
import Swal from 'sweetalert2'
import { firebase } from '../firebase'

const PersonajeItem = ({ item, hendelSelect, opinion,setFlag }) => {
    let status
    if (item.status === 'Alive') {
        status = 'Vivo'
    } else if (item.status === 'Dead') {
        status = 'Muerto'
    } else if (item.status === 'unknown') {
        status = 'Desconocido'
    } else {
        status = item.status
    }

    let species
    if (item.species === 'Human') {
        species = 'Humano'
    } else if (item.species === 'Humanoid') {
        species = 'Humanoide'
    } else if (item.species === 'unknown') {
        species = 'Desconocido'
    } else if (item.species === 'Disease') {
        species = 'Enfermedad'
    } else if (item.species === 'Mythological Creature') {
        species = 'Criatura Geometrica'
    } else {
        species = item.species
    }

    let gender
    if (item.gender === 'Female') {
        gender = 'Mujer'
    } else if (item.gender === 'Male') {
        gender = 'Hombre'
    } else if (item.gender === 'unknown') {
        gender = 'Desconocido'
    } else if (item.gender === 'Genderless') {
        gender = 'Sin género'
    } else {
        gender = item.gender
    }

    const hendelDelete = async (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success mx-2',
                cancelButton: 'btn btn-danger mx-2'
            },
            buttonsStyling: false
        })

        const result = await swalWithBootstrapButtons.fire({
            title: `Seguro desea eliminar la opinion de ${item.name}?`,
            imageUrl: item.image,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si',
            cancelButtonText: 'No',
            reverseButtons: true
        })
        if (result.isConfirmed) {
            try {
                const db = firebase.firestore()
                await db.collection('OpinionesPersonajes').doc(id).delete()
                setFlag(Math.random())
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado',
                    text: 'La opinion se elimino Exitosamente.'
                })
            } catch (error) {
                console.error(error)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error
                })
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
                'Cancelado',
                'Oops...',
                'error'
            )
        }
    }

    return (
        <>
            <tr className="text-center animate__animated animate__fadeInDown" >
                <th className="col-1 "> <img src={item.image} alt={item.id} height="200" width="200" className="rounded mx-auto d-block" /></th>
                <th className="col-1 align-middle">{item.name}</th>
                <th className="col-1 align-middle">{status}</th>
                <th className="col-1 align-middle">{species}</th>
                <th className="col-1 align-middle">{gender}</th>
                {
                    opinion ?
                        (
                            <>
                                <th className="col-1 align-middle">{opinion}</th>
                                <th className="col-1 align-middle">
                                    <Button className="col-5 me-2 align-middle btn-warning" onClick={() => { hendelSelect(item) }}> Editar</Button>
                                    <Button className="col-5 align-middle btn-danger" onClick={()=>{hendelDelete(item.id)}}>Eliminar</Button>
                                </th>
                            </>
                        ) : (
                            <th className="col-1 align-middle">
                                <Button onClick={() => { hendelSelect(item) }}> Selecionar</Button>
                            </th>
                        )

                }

            </tr>
        </>
    )
}

export default PersonajeItem