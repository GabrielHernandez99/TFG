import React, {useState} from 'react'
import {createUserWithEmailAndPassword} from "firebase/auth";
import {Button, Modal} from 'react-bootstrap'
import {auth, db} from '../api/firebase'
import {doc, setDoc} from "firebase/firestore"

export function Register(){
    const [show, setShow]=useState(false);

    const [nombre, setNombre]=useState('')
    const [email, setEmail] = useState('')
    const [password,setPassword]=useState('')
    const [rol, setRol]=useState('admin');
    const [error, setError]=useState('');

    const handleClose= () => {
      setError('')
      setShow(false)
    };
    const handleShow = () => setShow(true);
    const handleRegister= async () => {
        setError('')
        if(!nombre || !email || !password){
            setError('Por favor, rellene todos los campos')
            return
        }
        if(password.length<6){
            setError('La contraseña debe tener al menos 6 caracteres')
            return
          }
        const usuario=await createUserWithEmailAndPassword(auth, email,password)
        .then((user)=>{return user}).catch(()=>setError("Los datos introducidos son incorrectos. Vuelva a intentarlo"))
        const docuRef=doc(db,`Usuarios/${usuario.user.uid}`)
        setDoc(docuRef, {nombre: nombre, correo: email, contraseña: password, rol:rol, uid:usuario.user.uid})
    }
    return (
        <div>
            <Button variant='primary' onClick={handleShow}>
                ¿Nuevo Usuario? ¡Registrate!
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header className='modalHeader' closeButton>
                    <Modal.Title>Introduzca un nuevo usuario:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form class="row g-3">
                <div class="col-md-12">
                  <label for="nombre" class="form-label">Introduzca Nombre</label>
                  <input type="text" class="form-control" id="nombre" onChange={ev => setNombre(ev.target.value)}/>
                </div>
                <div class="col-md-12">
                  <label for="email" class="form-label">Introduzca Correo</label>
                  <input type="email" class="form-control" id="email" onChange={ev => setEmail(ev.target.value)}/>
                </div>
                <div class="col-md-12">
                  <label for="password" class="form-label">Contraseña</label>
                  <input type="password" class="form-control" id="password" onChange={ev => setPassword(ev.target.value)}/>
                  <p class="text-muted">Introduzca mínimo 6 caracteres</p>
                </div>
                <div class="col-md-12">
                <label for="rol" class="form-label">Tipo de Rol</label>
                <select value={rol} class="form-select" aria-label='Default select example' defaultValue={"admin"} onChange={ev => setRol(ev.target.value)}>
                    <option value="admin">Ofertante</option>
                    <option value="user">Usuario</option>
                </select>
                </div>
                {error && <p className='text-danger'>{error}</p>}
                <div class="col-md-2">
                <Button onClick={handleRegister}>Añadir</Button>
                </div>
              </form>
                <div className='espacio'></div>
                </Modal.Body>
            </Modal>
        </div>
    )
}