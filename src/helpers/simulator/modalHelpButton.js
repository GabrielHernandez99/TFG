import React, {  useState } from 'react';
import {Button, Modal} from 'react-bootstrap';
export const FormDialog=({number})=> {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  switch (number){
    case '1':
      return (<>
        <Button className='circle' onClick={handleShow}>
          ?
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header className="modalHeader" closeButton>
            <Modal.Title>Referente a Consumos</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Puede conocer el consumo correspondiente al periodo de facturación especificado en su factura 
            en el detalle de facturación del término de energía, bajo el epígrafe “consumo” o “energía”, 
            que viene expresado en kWh.</Modal.Body>
        </Modal>
      </>);
      case '2':
        return(<>
        <Button className='circle' onClick={handleShow}>
        ?
      </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header className="modalHeader" closeButton>
              <Modal.Title>Referente a Potencias</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            Puede conocer la potencia que tiene contratada actualmente en el detalle de facturación del término de 
            potencia o en los datos del contrato de su factura, que viene expresado en kW.

            No se permiten consumos por encima de los 10kW
            </Modal.Body>
          </Modal>
        </>)
        default:
          return(<> </>);
  }
  
}