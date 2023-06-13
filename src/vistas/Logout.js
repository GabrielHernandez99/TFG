import React from 'react'
import firebaseApp from "../api/firebase";
import {getAuth, signOut} from "firebase/auth"
import {Button} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
const auth=getAuth(firebaseApp);
function Logout({user}) {
    const navigate=useNavigate();
    const handleRedirect=()=>{
        signOut(auth).then(()=>navigate('/')).then(()=>window.location.reload())
    }
    return (
    <div className='content'>
        <br/>
        <div className='verticalContent'>
        <h1>Atencion, está a punto de cerrar sesión de: "{user.name}"</h1>
        <label>¿Confirmar?</label><br/>
        <Button onClick={handleRedirect}>Cerrar Sesión</Button>
        </div>
    </div>)
}
export default Logout