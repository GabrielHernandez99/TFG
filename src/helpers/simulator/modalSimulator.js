import React, { useEffect, useState } from 'react';
import {Button, Modal, Accordion} from 'react-bootstrap';
import { ApiValues } from '../../api/apiProcessor';
export const ResultModalForm=(props)=>{
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
  
    const handleShow = () => {
        calculoDePrecios();
        calculoValores();
        setShow(true)
    };
    
    const [days, setDays]= useState(0);
    
    const [precioFijoPunta,setPrecioFijoPunta] = useState(0);
    const [precioFijoValle,setPrecioFijoValle] = useState(0);
    const [precioVariablePunta,setPrecioVariablePunta] = useState(0);
    const [precioVariableLlano,setPrecioVariableLlano] = useState(0);
    const [precioVariableValle,setPrecioVariableValle] = useState(0);
    const [margenComercializacion,setMargenComercialización] = useState(0);

    const [potenciaPuntaContratada, setPotenciaPuntaContratada]= useState(0);
    const [potenciaValleContratada, setPotenciaValleContratada]= useState(0);
  
    const [terminoFijo,setTerminoFijo] = useState(0);
    const [terminoVariable,setTerminoVariable] = useState(0);
    const [impuesto,setImpuesto] = useState(0);
    const [equipo,setEquipo] = useState(0);
    const [IGIC,setIGIC] = useState(0);

    const precios=ApiValues("simulator");

    const calculoPotenciaContratada = () => {
      setPotenciaPuntaContratada(0.0643*days)
      setPotenciaValleContratada(0.0026*days)
    }
    const calculoDePrecios = () => {
      setPrecioFijoPunta(props.potenciaPunta*potenciaPuntaContratada*days/365);
      setPrecioFijoValle(props.potenciaValle*potenciaValleContratada*days/365)
      setPrecioVariablePunta(props.consumoPunta*precios[2])
      setPrecioVariableLlano(props.consumoLlano*precios[1])
      setPrecioVariableValle(props.consumoValle*precios[0]);

      setMargenComercialización(props.potenciaPunta*3.113*days/365);
    }
    const calculoValores = () => {
      setTerminoFijo((props.potenciaPunta*potenciaPuntaContratada*days/365)+(props.potenciaValle*potenciaValleContratada*days/365)+ (props.potenciaPunta*3.113*days/365)); //Precio Fijo Punta + precioFijoValle
      setTerminoVariable((props.consumoPunta*precios[2])+((props.consumoLlano*precios[1]))+(props.consumoValle*precios[0])); //precioVariablePunta+precioVariableLlano+precioVariableValle
      setImpuesto(((props.potenciaPunta*potenciaPuntaContratada*days/365)+(props.potenciaValle*potenciaValleContratada*days/365)+ (props.potenciaPunta*3.113*days/365)+
                  (props.consumoPunta*precios[2])+((props.consumoLlano*precios[1]))+(props.consumoValle*precios[0]))*0.005); //(terminoFijo+terminoVariable)*0.005
      setEquipo(0.81);
      setIGIC(
              0.03*(((props.potenciaPunta*potenciaPuntaContratada*days/365)+(props.potenciaValle*potenciaValleContratada*days/365)+(props.potenciaPunta*3.113*days/365)+(props.consumoPunta*precios[2])+((props.consumoLlano*precios[1]))+(props.consumoValle*precios[0]))
              +
              (((props.potenciaPunta*potenciaPuntaContratada*days/365)+(props.potenciaValle*potenciaValleContratada*days/365)+
              (props.consumoPunta*precios[2])+((props.consumoLlano*precios[1]))+(props.consumoValle*precios[0]))*0.005))
              +0.07*(equipo)); 
      //(0.03*(terminoFijo+terminoVariable+impuesto))+0.07*(equipo)
    }
    useEffect(()=>{
      getCurrentDays(new Date().getFullYear(), new Date().getMonth()+1); //Creamos una funcion que permita devolver el total de dias que tiene el mes y año actuales
      calculoPotenciaContratada();
    })
    
    const getCurrentDays = (año, mes) => {
      setDays(new Date(año, mes, 0).getDate());
    }
    
    return(
      <>
        <div className='help'
        >
        <Button variant="primary" onClick={handleShow}>
          Simular ahora
        </Button>
        </div>
        <Modal show={show} onHide={handleClose} size='xl' centered>
          <Modal.Header className="modalHeader" closeButton>
            <Modal.Title>Resultado de la simulación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="resultHeader">
          <p>Consumo Punta:{props.consumoPunta}, Consumo Llano:{props.consumoLlano}, Consumo Valle:
                {props.consumoValle}, Potencia Punta: {props.potenciaPunta}, Potencia Valle: {props.potenciaValle}</p>
                </div>
                <p>Esto es un simulador, cuya información se calcula al mes. El precio de la luz figurado en el término variable, se calcula como el promedio de precios en el dia de hoy</p>
                <br/>
                  <Accordion defaultActiveKey={['0']} alwaysOpen>
                        <Accordion.Item eventKey="1">
                          <Accordion.Header>Término Fijo: {terminoFijo.toFixed(2)}€</Accordion.Header>
                          <Accordion.Body> 
                          <strong>Precio Potencia = Potencia Contratada * Precio Potencia Luz * Dias del mes/ 365</strong> <br/>
                          <p>Precio Punta: ({props.potenciaPunta}kW * {potenciaPuntaContratada} €/kW día * {days}dias)/365 dias = {precioFijoPunta.toFixed(2)}€</p>
                          <p>Precio Valle:({props.potenciaValle}kW * 	{potenciaValleContratada} €/kW día * {days}dias) / 365 dias = {precioFijoValle.toFixed(2)}€</p>
                          <strong>Margen de Comercialización Fijo = Potencia Contratada * 3.113€/kW día * Dias del mes/ 365</strong> <br/>
                          <p>Margen de Comercialización Fijo: ({props.potenciaPunta}kW * 3.113€/kW día * {days}dias) / 365 dias = {margenComercializacion.toFixed(2)}€</p>
                          <strong>Precio Término Fijo = Precio Punta + Precio Valle + Margen de Comercialización Fijo</strong> <br/>
                          <p>Precio Término Fijo: {precioFijoPunta.toFixed(2)}€ + {precioFijoValle.toFixed(2)}€ + {margenComercializacion.toFixed(2)}€ = {terminoFijo.toFixed(2)}€</p>
                          </Accordion.Body>
                        </Accordion.Item>
  
                        <Accordion.Item eventKey="1">
                          <Accordion.Header>Término Variable: {terminoVariable.toFixed(2)}€</Accordion.Header>
                          <Accordion.Body>
                          <strong>Precio Consumo = Consumo Punta * Precio de la luz</strong> <br/>
                          <p>Precio Punta: {props.consumoPunta}kWh * {precios[2]}€/(kWh) = {precioVariablePunta.toFixed(2)}€</p>
                          <p>Precio Llano: {props.consumoLlano}kWh * {precios[1]}€/(kWh) =  {precioVariableLlano.toFixed(2)}€</p>
                          <p>Precio Valle: {props.consumoValle}kWh * {precios[0]}€/(kWh) =  {precioVariableValle.toFixed(2)}€</p>
                          <strong>Precio Término Variable = Precio Punta + Precio Llano + Precio Valle</strong> <br/>
                          <p>Precio Término Variable: {precioVariablePunta.toFixed(2)}€ + {precioVariableLlano.toFixed(2)}€ + {precioVariableValle.toFixed(2)}€ = {terminoVariable.toFixed(2)}€</p>
                          </Accordion.Body>
                        </Accordion.Item>
  
                        <Accordion.Item eventKey="1">
                          <Accordion.Header>Impuesto Eléctrico: {impuesto.toFixed(2)}€</Accordion.Header>
                          <Accordion.Body>
                            <strong>Impuesto = (Término Fijo + Término Variable) * 0.50%</strong>
                             <br/>
                            Impuesto:({terminoFijo.toFixed(2)}€+{terminoVariable.toFixed(2)}€)*0.50%={impuesto.toFixed(2)}€
                          </Accordion.Body>
                        </Accordion.Item>
  
                        <Accordion.Item eventKey="1">
                          <Accordion.Header>Equipo de Medida: {equipo}€</Accordion.Header>
                          <Accordion.Body>El precio del alquiler mensual del contador, establecido como <strong>0.81 €/mes</strong>
                          </Accordion.Body>
                        </Accordion.Item>
  
                        <Accordion.Item eventKey="1">
                          <Accordion.Header>IGIC: {IGIC.toFixed(2)}€</Accordion.Header>
                          <Accordion.Body>Para el IGIC, se realiza el 3% del resultado de la sumatoria de los terminos fijos, variables, y el impuesto;
                            y el 7% del equipo de medida.
                            En este caso sería: <br/>
                            <p><strong>IGIC Reducido:</strong> 3% de {terminoFijo.toFixed(2)}€+{terminoVariable.toFixed(2)}€+{impuesto.toFixed(2)}€={(terminoFijo+terminoVariable+impuesto).toFixed(2)}€</p>
                            <p><strong>IGIC Normal:</strong> 7% de {equipo.toFixed(2)}€ = {IGIC.toFixed(2)}€</p>
                          </Accordion.Body>
                        </Accordion.Item>
  
                        <Accordion.Item eventKey="1">
                          <Accordion.Header>TOTAL FACTURA: {(terminoFijo+terminoVariable+impuesto+equipo+IGIC).toFixed(2)}€</Accordion.Header>
                        </Accordion.Item>
                        <Accordion.Body>
                        {terminoFijo.toFixed(2)}€+{terminoVariable.toFixed(2)}€+{impuesto.toFixed(2)}€+{equipo.toFixed(2)}€+{IGIC}€
                        </Accordion.Body>
                      </Accordion>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Salir
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
    
  };