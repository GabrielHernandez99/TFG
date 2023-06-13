import {useState} from 'react'
import {FormDialog} from '../helpers/simulator/modalHelpButton'
import { ResultModalForm } from '../helpers/simulator/modalSimulator';

 export const SimulatorForm = () => {
  //valores por defecto, a modo de prueba.
    const [consumoPunta,setConsumoPunta] = useState(0);
    const [consumoLlano,setConsumoLlano] = useState(0);
    const [consumoValle,setConsumoValle] = useState(0);
    const [potenciaPunta,setPotenciaPunta] = useState(0);
    const [potenciaValle,setPotenciaValle] = useState(0);
  
    return(
      <div>
        <br/>
        <h1>Simulador</h1>
        <p>Genere un simulador instantáneo de la factura de la luz a dia de hoy bajo las normas del PVPC:</p>
        <div className='verticalContent'>
        <br/>
          <div>
            <form class="row g-3">
              <div className='helpButton'>
                <div className='helpSeparator'>
                  <h2 className='subtitle'>Consumos</h2>
                </div>
                <FormDialog number={'1'}/>
              </div>
              <div class="col-md-4">
                <label for="inputConsumoPunta" class="form-label">Consumo Punta (kWh)</label>
                <input type="number" class="form-control" id="inputConsumoPunta" defaultValue={consumoPunta} onChange={ev => setConsumoPunta(ev.target.value)}/>
              </div>
              <div class="col-md-4">
                <label for="inputConsumoLlano" class="form-label">Consumo Llano (kWh)</label>
                <input type="number" class="form-control" id="inputConsumoLlano" defaultValue={consumoLlano} onChange={ev => setConsumoLlano(ev.target.value)}/>
              </div>
              <div class="col-md-4">
                <label for="inputConsumoValle" class="form-label">Consumo Valle (kWh)</label>
                <input type="number" class="form-control" id="inputConsumoValle" defaultValue={consumoValle} onChange={ev => setConsumoValle(ev.target.value)}/>
                
              </div>
              <div className='helpButton'>
              <div className='helpSeparator'>
                <h2 className='subtitle'>Potencias</h2> 
                </div>
                <FormDialog number={'2'}/>
              </div>
              <div class="col-md-4">
                <label for="inputPotenciaPunta" class="form-label">Potencia Punta (kW)</label>
                <input type="number" class="form-control" id="inputPotenciaPunta" defaultValue={potenciaPunta} onChange={ev => setPotenciaPunta(ev.target.value)}/>
              </div>
              <div class="col-md-4">
                <label for="inputPotenciaValle" class="form-label">Potencia Valle (kW)</label>
                <input type="number" class="form-control" id="inputPotenciaLlano" defaultValue={potenciaValle} onChange={ev => setPotenciaValle(ev.target.value)}/>
              </div>
            </form>
  <div className='espacio'></div>
    <ResultModalForm 
      consumoPunta={consumoPunta} consumoLlano={consumoLlano} consumoValle={consumoValle} potenciaPunta={potenciaPunta} potenciaValle={potenciaValle}
    />
            </div>
        </div>
      </div>
    );
  }