import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {Chart as chartjs} from "chart.js/auto"

export const ChartHome= (props) =>{
 const {APITimes, horasDelDia}=props;
 const [userData, setUserData]= useState({
    labels: horasDelDia.map((hora)=>hora),
    datasets: [{
        label: "Precios",
        data: horasDelDia.map((hora)=>APITimes[hora].price/1000),
        borderColor: "black",
        borderWidth: 2,
        backgroundColor: "#feae4b",
    }],
 })
 return (
    <div className='chartSize'>
        <Bar data={userData}/>
    </div>)
}