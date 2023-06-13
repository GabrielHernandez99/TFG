
import {useState} from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import {getFirestore, doc, getDoc} from "firebase/firestore";
import {getAuth, onAuthStateChanged} from "firebase/auth"

import firebaseApp from './api/firebase';
import {SimulatorForm} from './components/simulatorForm';
import {Comparador} from './components/comparator'
import {OfferManagement} from './components/offersCRUD'

import {NavBar} from './helpers/navbar'

import Logout from "./vistas/Logout";
import Login from "./vistas/Login";
import Home from "./components/Home"

import logo from "./images/Logotipo_name_white.png"

const auth= getAuth(firebaseApp)
const db=getFirestore(firebaseApp)

const LoginSession = () =>{
  const [user, setUser]=useState(null);
  async function getFullData(uid){
    const docuRef=doc(db, `Usuarios/${uid}`)
    const docuCifrada= await getDoc(docuRef);
    return docuCifrada.data();
  }
  function setUserWithFirebaseAndRol(usuario){ //llamada para conseguir el perfil

    getFullData(usuario.uid).then((user)=>{const userData= {
      uid: user.uid,
      name: user.nombre,
      password: user.contraseña,
      email: user.correo,
      rol: user.rol,
    };
    setUser(userData);
  }) //queremos que al enviar el uid a getRol, nos devuelva el propio rol
    
  }
  onAuthStateChanged(auth, (usuario) => {
    const userData=getFullData(usuario)
    if(userData){
      if(!user){
        setUserWithFirebaseAndRol(usuario);
      }
    } else {
      setUser(null);
    }
  })
  return (
    <div>
      {user ? <MainMenu user={user}/> : <Login/>}
    </div>
  )
}
const MainMenu= ({user}) =>{
  return (
  <div>
    <div className='title'>
    <header>
    <img src= {logo} alt="logo"></img>
      </header>
      <h2 className='welcomeName'>Bienvenido: {user.name}</h2>
    </div>
      <nav>
          <BrowserRouter>
          <NavBar user={user}/>
            <Routes>
              <Route path='/' element={<Home user={user}/>}/>
                <Route path='/comparador' element={<Comparador user={user}/>}/>
                <Route path='/offerManagement' element={<OfferManagement user={user}/>}/>
              <Route path='/simulador' element={<SimulatorForm/>}/>
              <Route path='/checker' element={<Logout user={user}/>}/>
              <Route path="*" element={<h1>Not Found</h1>}/>
            </Routes>
          </BrowserRouter>
      </nav>
      <div className='espacio'></div>
      <div>
      </div>
  </div>);
}

function App() {
  //usaremos html a pecho:
  return (
    <div>
      <LoginSession/>
    </div>
  );
}
export default App;
