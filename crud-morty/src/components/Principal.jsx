import React from 'react'
import ModalPersonaje from './modals/ModalPersonaje'
import { useGetCharacter } from '../hooks/useGetCharacter'
import ItemsPages from './ItemsPages'
import PersonajeItem from './PersonajeItem'
import { Button } from 'react-bootstrap'
import '../assets/style/formulario.css'

const Principal = () => {

    const [showModalPersonaje, setModalPersonaje] = React.useState(false);
    const [personajeSelect, setPersonajeSelect] = React.useState({})
    const [filter, setFilter] = React.useState('/?name=&species=&status=&gender=&page=1')
    const [page, setPage] = React.useState(1)
    const [name, setName] = React.useState('')
    const [species, setSpecies] = React.useState('')
    const [status, setStatus] = React.useState('')
    const [gender, setGender] = React.useState('')


    const hendelSelect = (item) => {
        if (!showModalPersonaje) {
            setPersonajeSelect(item)
        }
        setModalPersonaje(!showModalPersonaje)
    }

    const newPage = (newPage) => {
        const index = page >= 10 ? 2 : 1
        const fill = filter.substring(0, filter.length - index) + newPage
        setPage(newPage)
        setFilter(fill)
    }

    const HendelSubmit = async (e) => {
        e.preventDefault()
        document.querySelector('#btnBuscar').disabled = true;
        await setPage(1)
        await setFilter(`/?${'name=' + name}&${'species=' + species}&${'status=' + status}&${'gender=' + gender}&page=1`)        
        document.querySelector('#btnBuscar').disabled = false;
    }

    const { characters, cargando } = useGetCharacter(filter)

    return (
        <div className="container">
            <ModalPersonaje
                showModal={showModalPersonaje}
                hendelModal={hendelSelect}
                personajeSelect={personajeSelect} />
            <h1 className="title text-center fw-bolder my-3 animate__animated animate__fadeIn">Busqueda de Personajes</h1>
            <form className="row g mt-3 mb-3 from-div rounded rounded animate__animated animate__fadeIn" onSubmit={HendelSubmit}>
                <div className="row align-self-center">
                    <div className="col-md-3 mt-2 form-floating">
                        <input type="text" className="form-control" id="name" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Nombre del personaje" />
                        <label htmlFor="name" className="forn-label">Nombre:</label>
                    </div>
                    <div className="col-md-2 mt-2 form-floating">
                        <select className="form-control form-select" id="status" value={status} onChange={(e) => { setStatus(e.target.value) }} placeholder="Estado" >
                            <option defaultValue></option>
                            <option value="Alive">Vivo</option>
                            <option value="Dead">Muerto </option>
                            <option value="unknown">Desconocido</option>
                        </select>
                        <label htmlFor="status" className="forn-label ">Estado:</label>
                    </div>
                    <div className="col-md-3 mt-2 form-floating">
                        <select type="text" className="form-control form-select" id="species" value={species} onChange={(e) => { setSpecies(e.target.value) }} placeholder="Especie" >
                            <option defaultValue></option>
                            <option value="Human">Humano</option>
                            <option value="Humanoid">Humanoide</option>
                            <option value="Animal">Animal</option>
                            <option value="Robot">Robot</option>
                            <option value="Disease">Enfermedad</option>
                            <option value="Alien">Alien </option>
                            <option value="Mythological Creature">Criatura Geometrica</option>
                            <option value="unknown">Desconocido</option>
                        </select>
                        <label htmlFor="species" className="forn-label ">Especie:</label>
                    </div>
                    <div className="col-md-2 mt-2 form-floating">
                        <select className="form-control form-select" aria-label="Default select example" id="gender" value={gender} onChange={(e) => { setGender(e.target.value) }} placeholder="Genero" >
                            <option defaultValue></option>
                            <option value="Female">Mujer </option>
                            <option value="Male">Hombre</option>
                            <option value="Genderless">Sin género</option>
                            <option value="unknown">Desconocido</option>

                        </select>
                        <label htmlFor="gender" className="forn-label ">Genero:</label>
                    </div>
                    <div className="d-flex justify-content-end bd-highlight col mt-2">
                        <div className='d-flex flex-column'>
                            <Button className="mb-1 px-5" id="btnBuscar" type="submit">Buscar</Button>
                            <Button className="mb-2 btn-dark" href="/opiniones">Opniones</Button>
                        </div>

                    </div>
                </div>
            </form>

            {cargando && <img src="https://gvhidra.gva.es/svn/genaro/tags/genaro-4_2_0/img/cargando.gif" className="mx-auto d-block" alt="Cargado" />}
            <div className="bg-gradient col-12 ">
                <ItemsPages
                    countPages={characters.countPages}
                    page={page}
                    newPage={newPage}
                />
                <div className="card-body table-responsive">
                    <table className="table table-striped  rounded">
                        <thead className="animate__animated animate__fadeIn">
                            <tr className=" text-center">
                                <th className="col-1 ">#</th>
                                <th className="col-1">Nombre</th>
                                <th className="col-1">Estado</th>
                                <th className="col-1">Especie</th>
                                <th className="col-1">Genero</th>
                                <th className="col-1">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                characters.ListCharacters.map((item, index) => (
                                    <PersonajeItem key={item.id}
                                        className={index % 2 === 0 ? 'table-active' : ''}
                                        item={item}
                                        hendelSelect={hendelSelect} />))
                            }
                        </tbody>
                    </table>
                    <ItemsPages
                        countPages={characters.countPages}
                        page={page}
                        newPage={newPage}
                    />
                </div>
            </div>
        </div>
    )
}

export default Principal