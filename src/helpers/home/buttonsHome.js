
import { Link } from 'react-router-dom';
import { HandleNosotros } from './handleNosotrosHome';

export const Buttons = ({user}) =>{

    
    return(<>
    {(user.rol==='user' ? 
        <Link to={"/comparador"} >
            <div className='buttonHome'>
                <h3>Comparador</h3>
                <p>Realice una simulacion con las ofertas actuales del Mercado Eléctrico Libre</p>
            </div>
        </Link> :
        <Link to={"/offerManagement"}>
        <div className='buttonHome'>
            <h3>Gestionar ofertas</h3>
            <p>Analice, añada, edite, o elimine sus ofertas</p>
        </div>
        </Link>
        )}
        
        <Link to={"/simulador"}>
            <div className="buttonHome">
                <h3>Simulador</h3>
                <p>Compruebe con este simulador, el importe a pagar de la factura de la luz, el dia de hoy, bajo la regulación del PVPC</p>
            </div>
        </Link>
        <Link to={"/checker"}>
            <div className="buttonHome">
                <h3>Cerrar Sesión</h3>
                <p>Cierre su sesión actual</p>
            </div>
        </Link>
        <div className='buttonHome'>
                <h3>Sobre Nosotros</h3>
                <HandleNosotros/>
        </div>
    </>)
    
}