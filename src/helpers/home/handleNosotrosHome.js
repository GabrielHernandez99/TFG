
import { useState } from 'react';
import {Modal, Button} from 'react-bootstrap'
import logo from "../../images/Logo_name_black.png"

export const HandleNosotros=()=> {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <button className='buttonNosotros' onClick={handleShow}>
          Haga click a continuación para saber sobre nosotros
          
        </button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header className='modalHeader' closeButton>
            <Modal.Title>
            
              Sobre Nosotros:
              
            </Modal.Title>
            
          </Modal.Header>
          <Modal.Body>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat</p>
            </Modal.Body>
          <Modal.Footer className='footerModal'>
            
          <img src={logo} width="40%" height="40%" alt="logo"/>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar Ventana
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }