import React, {useState} from 'react'
import {signInWithEmailAndPassword} from "firebase/auth";
import {Form, Button} from 'react-bootstrap'
import {auth} from '../api/firebase'
import {Register} from "./Register"
import logo from "../images/Logo.png"
function Login() {
    const [mail, setMail]= useState('')
    const [password, setPassword]=useState('')
    const [error,setError]=useState();
    
    function submitHandler (e){
        e.preventDefault(); //prevenimos que se actualice el evento
        setError('')
        signInWithEmailAndPassword(auth,mail,password)
            .catch(()=>setError("Correo o contraseña erroneos. Vuelva a intentarlo"))
                //login
    }
    return (
    <div className= "loginForm">
        <div className='loginTitle'>
        <h1 className='loginTitleSeparator'>Inicia Sesión</h1>
        <img src={logo} alt='Logo'/>
        </div>
        <div className='loginContent'> 
        <Form onSubmit={submitHandler}>
            <Form.Group className='mb-3'>
                <Form.Label>Correo:</Form.Label>
                <Form.Control type='email' id="email" placeholder='Correo Electronico' value={mail} onChange={e=>{setMail(e.target.value)}}></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>Contraseña:</Form.Label>
                <Form.Control type='password' id="password" placeholder='Contraseña' value={password} onChange={e=>{setPassword(e.target.value)}}></Form.Control>
            </Form.Group>
            <div className='espacio'></div>
            {error && <p className='text-danger'>{error}</p>}
            <Button type="submit">
            Iniciar Sesión
        </Button>
        </Form>
        <div className='espacio'/>
        <Register/>
        </div>
    </div>)
}

export default Login