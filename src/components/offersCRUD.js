import {useState, useEffect} from 'react'
import {db} from '../api/firebase'
import {collection, getDocs, doc, addDoc, deleteDoc, updateDoc} from "firebase/firestore";
import {Accordion, Button, Table} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { ConfirmDeleteModal } from '../helpers/confirmDeleteModal';
export const OfferManagement = ({user}) =>{
    const {name, uid, rol}=user
    const [offers, setOffers]=useState([]);
    const [offersID, setOffersID]=useState("");
    const [offerNombre, setOfferNombre] = useState("");
    const [offerConsumoLlano, setOfferConsumoLlano]=useState("");
    const [offerConsumoPunta, setOfferConsumoPunta]=useState("");
    const [offerConsumoValle, setOfferConsumoValle]=useState("");
    const [offerPotenciaPunta, setOfferPotenciaPunta]=useState("");
    const [offerPotenciaValle, setOfferPotenciaValle]=useState("");

    const [updateFlag, setUpdateFlag]=useState(false);
    const [error, setError]=useState("");
    const navigate=useNavigate();
    const createOffer = async () =>{
      if(!offerNombre || !offerConsumoPunta || !offerConsumoLlano || !offerConsumoValle || !offerPotenciaPunta || !offerPotenciaValle){
        setError("Introduzca todos los campos obligatorios, incluidos 0 en caso de no existir en la oferta");
        return;
      }
        if(offersID.length < 1){
            await addDoc(collection(db,"Ofertas"), {
                ofertante:name,
                ofertanteID:uid,
                nombre:offerNombre,
                consumoPunta:offerConsumoPunta,
                consumoLlano:offerConsumoLlano,
                consumoValle:offerConsumoValle,
                potenciaPunta:offerPotenciaPunta,
                potenciaValle:offerPotenciaValle,
        })
      } else {
            //en caso de que se detecten datos nuevos de la oferta actual:
            const offerDoc = doc(db, "Ofertas",offersID);
            const valores ={
                ofertante:name,
                ofertanteID:uid,
                nombre:offerNombre,
                consumoPunta:offerConsumoPunta,
                consumoLlano:offerConsumoLlano,
                consumoValle:offerConsumoValle,
                potenciaPunta:offerPotenciaPunta,
                potenciaValle:offerPotenciaValle,
            };

                await updateDoc(offerDoc, valores)
        };
        
        setTimeout(getOffers,1000);
        resetForm();
        window.location.reload();
        
    }
    const updateOffer = (offer) =>{
        setOffersID(offer.id);
        setOfferNombre(offer.nombre);
        setOfferConsumoPunta(offer.consumoPunta)
        setOfferConsumoLlano(offer.consumoLlano)
        setOfferConsumoValle(offer.consumoValle)
        setOfferPotenciaPunta(offer.potenciaPunta)
        setOfferPotenciaValle(offer.potenciaValle)
        setUpdateFlag(true)

    }
    const resetForm = () => {
        setOffersID();
        setOfferNombre();
        setOfferConsumoPunta()
        setOfferConsumoLlano()
        setOfferConsumoValle()
        setOfferPotenciaPunta()
        setOfferPotenciaValle()
        setUpdateFlag(false)
        window.location.reload();
    }

    const deleteOffer=async (id) => {
        const offerDoc= doc(db, "Ofertas", id);
        await deleteDoc(offerDoc);
        setTimeout(getOffers,1000);

    }
    const getOffers= async () => {
        const data = await getDocs(collection(db,"Ofertas"));
        setOffers(data.docs.map((doc) => ({...doc.data(), id:doc.id})))
    };
    
    //Obligamos que los user no entren a offersCRUD
    const checkRol = () =>{
      if (rol==='user'){
        return navigate("/")
      }
    }
    useEffect(()=> {
        getOffers();
    },[])
    return (
      <>
      <br/>
      
    <div className="verticalContent">
    <br/>
      {checkRol()}
      <ul>
      <h3 className='titleInside'>Gestion de Ofertas</h3>
            {offers.length!==0 ? <h4>A continuacion se muestra sus ofertas, en caso de querer modificarlas:</h4> : <h4>No hay ninguna oferta a mostrar. Añada una nueva</h4>}
            {offers.map((ofertas) => {
              if(ofertas.ofertanteID===uid){
                return (
                  <>
                  <br/>
                  <Accordion defaultActiveKey={['0']} alwaysOpen>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>{ofertas.nombre}</Accordion.Header>
                      <Accordion.Body>
                      <Table className='table table-primary'>
                        <thead>
                          <tr>
                            <th>Nombre de oferta:</th>
                            <th>Consumo Punta:</th>
                            <th>Consumo Valle:</th>
                            <th>Consumo Llano:</th>
                            <th>Potencia Punta:</th>
                            <th>Potencia Valle:</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{ofertas.nombre}</td>
                            <td>{ofertas.consumoPunta} kWh</td>
                            <td>{ofertas.consumoValle} kWh</td>
                            <td>{ofertas.consumoLlano} kWh</td>
                            <td>{ofertas.potenciaPunta} kW</td>
                            <td>{ofertas.potenciaValle} kW</td>
                          </tr>
                        </tbody>
                        </Table>
                        <br />
                        <Button variant="outline-primary" onClick={() => { updateOffer(ofertas); } }>Actualizar</Button>{' '}
                        <ConfirmDeleteModal oferta={ofertas} onDelete={()=>deleteOffer(ofertas.id)}/>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion></>
                  );
                }
                return <></>
             })}
             </ul>
        
  <br/><br/>
  <hr style={{ background: "#6F38C5", height: "5px", border: "none",}}/>
  <hr style={{ background: "#47B5FF", height: "2px", border: "none", }}/>
    <div>
    <h3 className='titleInside'>Tambien puede añadir una nueva oferta con el siguiente formulario:</h3>
      <br/>
      <div className='formularioCRUD'>
        <form class="row g-3">
          <div class="col-md-8">
            <label for="inputNombre" class="form-label">Nombre de la Oferta</label>
            <input type="string" class="form-control" id="inputNombre" defaultValue={offerNombre} onChange={ev => setOfferNombre(ev.target.value)} required></input>
          </div>
              <h2 className='subtitle'>Consumos</h2>
          <div class="col-md-4">
            <label for="inputConsumoPunta" class="form-label">Consumo Punta (kWh)</label>
            <input type="number" class="form-control" id="inputConsumoPunta" defaultValue={offerConsumoPunta} onChange={ev => setOfferConsumoPunta(ev.target.value)}/>
          </div>
          <div class="col-md-4">
            <label for="inputConsumoLlano" class="form-label">Consumo Llano (kWh)</label>
            <input type="number" class="form-control" id="inputConsumoLlano" defaultValue={offerConsumoLlano} onChange={ev => setOfferConsumoLlano(ev.target.value)}/>
          </div>
          <div class="col-md-4">
            <label for="inputConsumoValle" class="form-label">Consumo Valle (kWh)</label>
            <input type="number" class="form-control" id="inputConsumoValle" defaultValue={offerConsumoValle} onChange={ev => setOfferConsumoValle(ev.target.value)} required/>
          </div>
            <h2 className='subtitle'>Potencias</h2>
            <label>Asigne los precios conforme al dia. Recomendamos que la cifra debe tener 3 cifras decimales</label> 
          <div class="col-md-4">
            <label for="inputPotenciaPunta" class="form-label">Potencia Punta (kW)</label>
            <input type="number" class="form-control" id="inputPotenciaPunta" defaultValue={offerPotenciaPunta} onChange={ev => setOfferPotenciaPunta(ev.target.value)}/>
          </div>
          <div class="col-md-4">
            <label for="inputPotenciaValle" class="form-label">Potencia Valle (kW)</label>
            <input type="number" class="form-control" id="inputPotenciaLlano" defaultValue={offerPotenciaValle} onChange={ev => setOfferPotenciaValle(ev.target.value)}/>
          </div>
          <div className='separator'/>
          {error && <p className='text-danger'>{error}</p>}
          <div class="col-md-4">
            <button type="button" class="btn btn-primary" onClick={createOffer}>Añadir oferta</button>
            {updateFlag === true ? <button type="button" class="btn btn-primary" onClick={resetForm}>Cancelar Actualización</button> : <></>}
          </div>
        </form>
      </div>
  </div>
  </div>
  </>
    )
}
