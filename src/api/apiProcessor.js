import React, { useEffect, useState } from 'react';
import axios from "axios"

export const ApiValues = (props) =>{
    const operation=props;
    const [valores, setValores]= useState([]);
    const [horas, setHoras]=useState();
    

    useEffect(()=>{
      const loadData= async () =>{
        try{
          await axios.get("https://api.preciodelaluz.org/v1/prices/all?zone=PCB")
          .then((response) =>{
            setValores(response.data);
            setHoras(["00-01","01-02","02-03","03-04","04-05","05-06","06-07","07-08","08-09","09-10","10-11",
            "11-12","12-13","13-14","14-15","15-16","16-17","17-18","18-19","19-20","20-21","21-22","22-23","23-24"]);
            
            
          })
          } catch(error){
            console.error(error)
          }
        }
        const timeoutData = setTimeout(() => {loadData();},1000);
        return () => clearTimeout(timeoutData);
    },[]);
    
    const DataManager=()=>{
      if(valores.length===0){
        return <></>
      } else{
        const horasBaratas=horas.filter(hora=>valores[hora]["is-cheap"]===true);
        const horasMedia=horas.filter(hora=>valores[hora]["is-under-avg"]===true).filter(hora=>valores[hora]["is-cheap"]===false);
        const horasCaras=horas.filter(hora=>valores[hora]["is-cheap"]===false && valores[hora]["is-under-avg"]===false);
        return GetPrices(horasBaratas,horasMedia,horasCaras)
      }    
    }

    //Operaciones para conseguir el precio medio de cada bloque horario
  const GetPrices=(horasBaratas,horasMedia,horasCaras)=>{
    const preciosValle= horasBaratas.map((hora)=>valores[hora].price/1000);
      const totalValle=preciosValle.reduce((acumulado, actual)=> acumulado+actual,0);
      const valle=totalValle/horasBaratas.length;

    const preciosLlano= horasMedia.map((hora)=>valores[hora].price/1000);
      const totalLlano=preciosLlano.reduce((acumulado, actual)=> acumulado+actual,0);
      const llano=totalLlano/horasMedia.length;

    const preciosPunta=horasCaras.map((hora)=>valores[hora].price/1000);
      const totalPunta=preciosPunta.reduce((acumulado, actual)=> acumulado+actual,0);
      const punta=totalPunta/horasCaras.length;
      
      if(operation==="home" && valores.length!==0){
        return ([valores,horas])
      }
      return ([valle,llano,punta]);
  }

    return(DataManager())
  }

  
  
  