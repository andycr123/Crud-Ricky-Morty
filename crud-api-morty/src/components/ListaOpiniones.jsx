import React from 'react'
import PersonajeItem from './PersonajeItem'
import Swal from 'sweetalert2'
import { getListaOpiniones } from '../helpers/getListaOpiniones'
import ModalPersonaje from './modals/ModalPersonaje'
import { Button } from 'react-bootstrap'

const ListaOpiniones = () => {
    const [ListaPersonajes, setListaPersonajes] = React.useState([])
    const [personajeEditar, setPersonajeEditar] = React.useState({})
    const [showModalPersonaje, setModalPersonaje] = React.useState(false);
    const [flag,setFlag]=React.useState(0)
    React.useEffect(() => {
        const consultarLista = async () => {
            try {
                const result = await getListaOpiniones()
                setListaPersonajes(result)
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ocurrio un error al consultar a la base de datos.'
                })
            }
        }
        consultarLista()
    }, [flag])

    const hendelEditar = async (item) => {
        if (!showModalPersonaje) {
            setPersonajeEditar(item)
        }else{
            setPersonajeEditar({})
        }
        setModalPersonaje(!showModalPersonaje)
    }
    return (
        <div className="container">
            <ModalPersonaje
                hendelModal={hendelEditar}
                showModal={showModalPersonaje}
                personajeSelect={personajeEditar}
                edit={true}
                setFlag={setFlag}
            />
            <h1 className="title text-center fw-bolder my-3 animate__animated animate__fadeIn">Lista de Opiniones</h1>

            <div className="card-body table-responsive">
                <Button onClick={()=>{window.location.href='/'}}>Buscar Personaje</Button>
                <table className="table table-striped  rounded">
                    <thead className="animate__animated animate__fadeIn">
                        <tr className=" text-center">
                            <th className="col-1 ">#</th>
                            <th className="col-1">Nombre</th>
                            <th className="col-1">Estado</th>
                            <th className="col-1">Especie</th>
                            <th className="col-1">Genero</th>
                            <th className="col-1">Opiniones</th>
                            <th className="col-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ListaPersonajes.map(item => (
                                <PersonajeItem
                                    key={item.id}
                                    item={item}
                                    opinion={item.opinion}
                                    hendelSelect={hendelEditar}
                                    setFlag={setFlag}
                                />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListaOpiniones