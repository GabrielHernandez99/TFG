import { useState } from "react"
import {Modal, Button, Accordion} from "react-bootstrap"

export const MoreInfoComparator = (props) => {
    const [show, setShow]=useState(false);
    const {days,consumoPunta,consumoValle,consumoLlano,potenciaPunta,potenciaValle,
    precioFijoPunta, precioFijoValle, margenComercializacion,
    terminoFijo,precioVariablePunta, precioVariableLlano, precioVariableValle,
    terminoVariable,impuesto,equipo,iva,total,oferta} = props
    console.log(props)
    const handleShow=()=>setShow(true);
    const handleClose=()=>setShow(false);

    return(
        <>
        <Button onClick={handleShow}>
            Mas información dentro
        </Button>

        <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header className="modalHeader" closeButton>
                <Modal.Title>
                    Información de {oferta.nombre}
                </Modal.Title>
                </Modal.Header>
                <div className="resultHeader">
                    Precios de la Oferta:<br/>
                    Potencia Punta: {oferta.potenciaPunta}kW &nbsp;&nbsp; Potencia Valle: {oferta.potenciaValle}kW<br/>
                    Consumo Punta: {oferta.consumoPunta}kWh &nbsp;&nbsp; Consumo Valle: {oferta.consumoValle}kWh &nbsp;&nbsp; Consumo Llano: {oferta.consumoLlano}kWh
                </div>
                
                <Modal.Body>
                <Accordion defaultActiveKey={['0']} alwaysOpen>
                        <Accordion.Item eventKey="1">
                          <Accordion.Header>Término Fijo: {terminoFijo.toFixed(2)}€</Accordion.Header>
                          <Accordion.Body>
                          <strong>Precio Potencia = Potencia Contratada * Precio Potencia Luz * Dias del mes/ 365</strong> <br/>
                          <p>Precio Punta: ({potenciaPunta}kW * {oferta.potenciaPunta} €/kW día * {days}dias)/365 dias = {precioFijoPunta.toFixed(2)}€</p>
                          <p>Precio Valle:({potenciaValle}kW * 	{oferta.potenciaValle} €/kW día * {days}dias) / 365 dias = {precioFijoValle.toFixed(2)}€</p>
                          <strong>Margen de Comercialización Fijo = Potencia Contratada * 3.113€/kW día * Dias del mes/ 365</strong> <br/>
                          <p>Margen de Comercialización Fijo: ({potenciaPunta}kW * 3.113€/kW día * {days}dias) / 365 dias = {margenComercializacion.toFixed(2)}€</p>
                          <strong>Precio Término Fijo = Precio Punta + Precio Valle + Margen de Comercialización Fijo</strong>
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                          <Accordion.Header>Término Variable: {terminoVariable.toFixed(2)}€</Accordion.Header>
                          <Accordion.Body>
                          <strong>Precio Consumo = Consumo Punta * Precio de la luz</strong> <br/>
                          <p>Precio Punta: {consumoPunta}kWh * {oferta.consumoPunta}€/(kWh) = {precioVariablePunta.toFixed(2)}€</p>
                          <p>Precio Llano: {consumoLlano}kWh * {oferta.consumoLlano}€/(kWh) =  {precioVariableLlano.toFixed(2)}€</p>
                          <p>Precio Valle: {consumoValle}kWh * {oferta.consumoValle}€/(kWh) =  {precioVariableValle.toFixed(2)}€</p>
                          <strong>Precio Término Variable = Precio Punta + Precio Llano + Precio Valle</strong>
                          </Accordion.Body>
                        </Accordion.Item>
  
                        <Accordion.Item eventKey="1">
                          <Accordion.Header>Impuesto Eléctrico: {impuesto.toFixed(2)}€</Accordion.Header>
                          <Accordion.Body>
                            <strong>Impuesto = (Término Fijo + Término Variable) * 0.50%</strong><br/>
                            ({terminoFijo.toFixed(2)}€+{terminoVariable.toFixed(2)}€)*0.50%={impuesto.toFixed(2)}€
                          </Accordion.Body>
                        </Accordion.Item>
  
                        <Accordion.Item eventKey="1">
                          <Accordion.Header>Equipo de Medida: {equipo}€</Accordion.Header>
                          <Accordion.Body>El precio del alquiler mensual del contador, establecido como 0.81 €/mes
                          </Accordion.Body>
                        </Accordion.Item>
  
                        <Accordion.Item eventKey="1">
                          <Accordion.Header>IVA: {iva.toFixed(2)}€</Accordion.Header>
                          <Accordion.Body>Para el IVA, se realiza el 3% del resultado de la sumatoria de los terminos fijos, variables, y el impuesto;
                            y el 7% del equipo de medida.
                            En este caso sería: <br/>
                            <p>IGIC Reducido: 3% de {terminoFijo.toFixed(2)}€+{terminoVariable.toFixed(2)}€+{impuesto.toFixed(2)}€={(terminoFijo+terminoVariable+impuesto).toFixed(2)}€</p>
                            <p>IGIC Normal: 7% de {equipo.toFixed(2)}€ = {iva.toFixed(2)}€</p>
                            
                          </Accordion.Body>
                        </Accordion.Item>
  
                        <Accordion.Item eventKey="1">
                          <Accordion.Header>TOTAL FACTURA: {total.toFixed(2)}€</Accordion.Header>
                        </Accordion.Item>
                        <Accordion.Body>
                        {terminoFijo.toFixed(2)}€+{terminoVariable.toFixed(2)}€+{impuesto.toFixed(2)}€+{equipo.toFixed(2)}€+{iva}€
                        </Accordion.Body>
                      </Accordion>
                </Modal.Body>
        </Modal>
        </>
    )
}