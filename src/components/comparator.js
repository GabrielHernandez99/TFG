import {db} from '../api/firebase'
import {collection, getDocs} from "firebase/firestore";
import {useState, useEffect} from 'react'
import { ComparatorResult } from '../helpers/comparator/modalComparator';
import { useNavigate } from 'react-router-dom';
export const Comparador = ({user}) => {
    const {rol}=user;
    const [offers, setOffers]=useState([]);
    
    const [consumoPunta, setConsumoPunta]=useState(0);
    const [consumoLlano, setConsumoValle]=useState(0);
    const [consumoValle, setConsumoLlano]=useState(0);

    const [potenciaPunta, setPotenciaPunta]=useState(0);
    const [potenciaValle, setPotenciaValle]=useState(0);

    const [loading, setLoading]=useState(false);
    const getOffers= async () => {
        const data = await getDocs(collection(db,"Ofertas"));
        setOffers(data.docs.map((doc) => ({...doc.data(), id:doc.id})))
        setLoading(false);
        
    };
    const navigate=useNavigate();

    useEffect(()=> {
        setLoading(true);
        const timeoutData = setTimeout(() => {getOffers()},1000);
        return () => clearTimeout(timeoutData)
    },[])

    const checkValue = () => {
      if (loading){
        return <></>
      } else{
        return <ComparatorResult offers={offers} consumoPunta={consumoPunta} consumoLlano={consumoLlano}
         consumoValle={consumoValle} potenciaPunta={potenciaPunta} potenciaValle={potenciaValle}/>
      }
    }
    const checkRol = () =>{
      if(rol==="admin"){
        return navigate("/")
      }
    }

    return(
        <div>
          <br/>
          {checkRol()}
          {loading && (
          <div className='loadingBackground'>
            <p className= 'loadingText'>Cargando datos...</p>
          </div>
          )}
          <h1>Comparador</h1>
          <p>Compare su importe mensual con las ofertas de luz del Mercado Libre:</p>
          <div className='verticalContent'>
            <br/>
            <div>
              <form class="row g-3">
                <h2 className='subtitle'>Consumos</h2>
                <div class="col-md-4">
                  <label for="inputConsumoPunta" class="form-label">Consumo Punta (kWh)</label>
                  <input type="number" class="form-control" id="inputConsumoPunta" defaultValue={consumoPunta} onChange={ev => setConsumoPunta(ev.target.value)}/>
                </div>
                <div class="col-md-4">
                  <label for="inputConsumoValle" class="form-label">Consumo Llano (kWh)</label>
                  <input type="number" class="form-control" id="inputConsumoLlano" defaultValue={consumoLlano} onChange={ev => setConsumoLlano(ev.target.value)}/>
                </div>
                <div class="col-md-4">
                  <label for="inputConsumoLlano" class="form-label">Consumo Valle (kWh)</label>
                  <input type="number" class="form-control" id="inputConsumoValle" defaultValue={consumoValle} onChange={ev => setConsumoValle(ev.target.value)}/>
                </div>
                <h2 className='subtitle'>Potencias</h2> 
                <div class="col-md-4">
                  <label for="inputPotenciaPunta" class="form-label">Potencia Punta (kW)</label>
                  <input type="number" class="form-control" id="inputPotenciaPunta" defaultValue={potenciaPunta} onChange={ev => setPotenciaPunta(ev.target.value)}/>
                </div>
                <div class="col-md-4">
                  <label for="inputPotenciaValle" class="form-label">Potencia Valle (kW)</label>
                  <input type="number" class="form-control" id="inputPotenciaValle" defaultValue={potenciaValle} onChange={ev => setPotenciaValle(ev.target.value)}/>
                </div>
              </form>
                <div className='espacio'></div>
                {checkValue()}
              </div>
          </div>
        </div>
      );
    }