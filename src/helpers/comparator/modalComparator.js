import { Modal, Button, Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { MoreInfoComparator } from './moreInfoComparator';
export const ComparatorResult= (props)=> {
  const {offers,consumoPunta,consumoValle,consumoLlano,potenciaPunta,potenciaValle}=props;
  console.log(offers)
  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const [show, setShow] = useState(false);
  const [days, setDays] = useState(0);

  const calculoImporteTotal = (oferta, isMoreInfo) => {
    const precioFijoPunta=potenciaPunta*oferta.potenciaPunta*days/365
    const precioFijoValle=potenciaValle*oferta.potenciaValle*days/365
    const margenComercializacion=potenciaPunta*3.113*days/365;
    const terminoFijo=precioFijoPunta+precioFijoValle+margenComercializacion;

    const precioVariablePunta= consumoPunta*oferta.consumoPunta;
    const precioVariableLlano= consumoLlano*oferta.consumoLlano;
    const precioVariableValle= consumoValle*oferta.consumoValle;
    const terminoVariable= precioVariablePunta+precioVariableLlano+precioVariableValle

    const impuesto= terminoFijo+terminoVariable*0.00050
    
    const equipo= 0.81;

    const iva=0.03*(terminoFijo+terminoVariable+impuesto)+0.07*(equipo);

    const total=terminoFijo+terminoVariable+impuesto+equipo+iva
    console.log(precioVariableValle)
    if(isMoreInfo){
      return <MoreInfoComparator days={days} consumoPunta={consumoPunta} consumoValle={consumoValle} consumoLlano={consumoLlano} potenciaPunta={potenciaPunta} potenciaValle={potenciaValle}
      precioFijoPunta={precioFijoPunta} precioFijoValle={precioFijoValle} margenComercializacion={margenComercializacion}
      terminoFijo={terminoFijo} precioVariablePunta={precioVariablePunta} precioVariableLlano={precioVariableLlano} precioVariableValle={precioVariableValle}
      terminoVariable={terminoVariable} impuesto={impuesto} equipo={equipo} iva={iva} total={total} oferta={oferta}/>
    }
    return total.toFixed(2);
    
  }

  useEffect(()=>{
    const getCurrentDays = (año, mes) => {
      setDays(new Date(año, mes, 0).getDate());
    };
  
    getCurrentDays(new Date().getFullYear(), new Date().getMonth()+1); //Creamos una funcion que permita devolver el total de dias que tiene el mes y año actuales
  },[])
  
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
          Comparar ahora
        </Button>
      <Modal fullscreen show={show} onHide={handleClose}>
        <Modal.Body>
            <div className='resultHeader'>
                Consumo Punta: {consumoPunta} Consumo Valle: {consumoValle}  
                Consumo Llano: {consumoLlano} Potencia Punta: {potenciaPunta} Potencia Valle: {potenciaValle}
            </div>
            <div className='listOffers'>
            <Table>
              <thead>
                <tr>
                  <th>Ofertante:</th>
                  <th>Nombre de Oferta:</th>
                  <th>Total a Pagar al mes:</th>
                  <th>¿Mas Información?</th>
                </tr>
              </thead>
              <tbody>
              {offers.map((oferta) => (
                <tr>
                  <td>{oferta.ofertante}</td>
                  <td>{oferta.nombre}</td>
                  <td>{calculoImporteTotal(oferta, false)}€</td>
                  <td>{calculoImporteTotal(oferta, true)}</td>                    
                </tr>
                ))}
              </tbody>
            </Table>
              </div>
            <div className='espacio'/>

            <div className='boton'>
                <Button variant="primary" onClick={handleClose}>Cerrar</Button>
            </div>
        </Modal.Body>
      </Modal>
    </>
  );
}