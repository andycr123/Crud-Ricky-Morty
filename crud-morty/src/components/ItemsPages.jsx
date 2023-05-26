import React from 'react'
import { Card, Nav } from 'react-bootstrap'

const ItemsPages = ({ countPages, page, newPage }) => {
    return (
        <>
            <Card.Footer className="scrollbar animate__animated animate__fadeIn">
                <Nav aria-label="Page navigation">
                    <ul className="pagination pagination">
                        {
                            Array.from(Array(countPages)).map((item, index) => (
                                <li className={page === index + 1 ? 'active page-item' : 'page-item'} key={index + 1}>
                                    <span className="page-link" role="button" onClick={() => { newPage(index + 1) }}>{index + 1}</span>
                                </li>
                            ))
                        }
                    </ul>
                </Nav>
            </Card.Footer>
        </>

    )
}

export default ItemsPages