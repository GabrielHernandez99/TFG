import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

export const NavBar= (user)=> {
    return(
      <>
    <Navbar className='navBackground' expand="lg">
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav>
        <Nav.Link as={Link} to="/">Inicio</Nav.Link>
        {user.user.rol === "user" ? <Nav.Link as={Link} to='/comparador'>Comparador</Nav.Link> : <Nav.Link as={Link} to='/offerManagement'>Gestionar Ofertas</Nav.Link>}
        <Nav.Link as={Link} to="/simulador">Simulador</Nav.Link>
        <Nav.Link as={Link} to="/checker">Cerrar Sesión</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  </>
  )
}