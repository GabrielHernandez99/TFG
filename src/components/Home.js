
import React, { useEffect, useState } from 'react';
import {ApiValues} from '../api/apiProcessor'
import { Table } from 'react-bootstrap';
import { ChartHome } from '../helpers/home/chartHome';
import { Buttons } from '../helpers/home/buttonsHome';
import '../index.css'

function Home ({user}){
  const precios=ApiValues("home");
  const APITimes=precios[0];
  const horasDelDia=precios[1];
  const [loading,setLoading]=useState(false);

  const [hours, setHours]=useState();
  const [time, setTime]=useState();

  const priceCheck=()=>{
    if(APITimes!==undefined){
      return (APITimes[hours].price/1000).toFixed(5)
    } else{
      return <></>
    }
  }
  const setTimeColor=(hora)=>{
    if(APITimes!==undefined){
      if(APITimes[hora]["is-cheap"]){
        return 'colorGreen'
      }
      else if(APITimes[hora]["is-under-avg"]){
        return 'colorYellow'
      }
      else{
        return 'colorRed';
      }
    } else {
      return <></>
    }
    
  }

  const tableGenerator = () => {
    if (APITimes !== undefined && horasDelDia !== undefined) {
      const table1 = horasDelDia.slice(0, Math.floor(horasDelDia.length / 2));
      const table2 = horasDelDia.slice(Math.floor(horasDelDia.length / 2));
      console.log(table1);
      console.log(table2);
      return (
        <>
          <table>
            <thead>
              <tr>
                <th>Hora</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>{table1.map((hora) => (
              <tr>
                <td>{hora}</td>
                <td>
                  <div className={setTimeColor(hora)}>
                    {(APITimes[hora].price / 1000).toFixed(5)} kWh
                  </div>
                </td>
              </tr>
            ))}</tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>Hora</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>{table2.map((hora) => (
              <tr>
                <td>{hora}</td>
                <td>
                  <div className={setTimeColor(hora)}>
                    {(APITimes[hora].price / 1000).toFixed(5)} kWh
                  </div>
                </td>
              </tr>
            ))}</tbody>
          </table>
        </>
      );
    } else {
      return <></>;
    }
  };
  
  const loadAPI=()=>{
    setLoading(false);
    return (precios=ApiValues("home"));
  }
  useEffect(()=>{
    if(precios.length===undefined){
      setLoading(true);
      setTimeout(()=> {loadAPI()},1000)
    }
    const h=new Date().getHours();
    const tiempo=new Date();
    const currentTime=tiempo.toLocaleDateString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    })
    setTime(currentTime);
    getCurrentHours(h); //Creamos una funcion que permita devolver el total de dias que tiene el mes y año actuales
  })
  
  const getCurrentHours = (hora) => {
    const nextHour=hora+1;
    const resultado=hora+"-"+nextHour;
    setHours(resultado);
  }
  const chartGenerator = () =>{
    if(APITimes!==undefined && horasDelDia!==undefined){
      return <ChartHome APITimes={APITimes} horasDelDia={horasDelDia}/>
    } else{
      return <></>
    }
  }
    return (
      <div>
        <br/>
      {loading && (
        <div className='loadingBackground'>
        <p className= 'loadingText'>Cargando datos...</p>
        </div>
     )}
     <div className='espacio'></div>
    <div className='homeScreen'>
      <div className='buttonContent'>
      <Buttons user={user}/>
      </div>
      <br/>
      <div className='chartContent'>
        <h3>Término de facturación de energía, en €/kWh por cada franja horaria: </h3>
        <br/>
        {chartGenerator()}
      </div>
      <br/>
      <div className='tableContent'>
        <h3>El precio de la luz, a {time}, es de: <strong>{priceCheck()}€/kWh</strong></h3>
      <div className='espacio'/>
      <Table className='widthHome'>
      {tableGenerator()}
      </Table>
    </div>
    </div>
    </div>
    )
  }
  export default Home;
  