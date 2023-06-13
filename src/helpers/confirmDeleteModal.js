import {Button, Modal} from "react-bootstrap"
import { useState } from "react";

export const ConfirmDeleteModal = (props) =>{
  const {oferta, onDelete}=props
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = () =>{
    onDelete();
    handleClose();
  }
  return (
    <>
      <Button variant="outline-danger" onClick={handleShow}>Eliminar Oferta </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>Atención, está a punto de eliminar la oferta: "{oferta.nombre}" </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDelete}>Confirmar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}