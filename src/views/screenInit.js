import {viewLogin} from './screenLogin.js';
import {viewRegister} from './screenRegister.js';
import {authGoogle} from '../models/user.js';

// se exporta la funcion para luego poder usarla en otro archivo
export const viewInit = ()=>{
    // se crea la primera vista
    document.getElementById("goContainer").innerHTML="";
    let initContent = document.createElement("div");
    initContent.className= "init-content";
    let logoInitContainer=  document.createElement("div");
    logoInitContainer.className = "logo-Container";
    logoInitContainer.innerHTML= `<img src="imgs/02_01.png" alt="Go!" id="img-logo" align="middle" height="30%" weight="30%"></img>`;
    let buttonsInit = document.createElement("div");
    buttonsInit.className = "buttons-Init";
    buttonsInit.innerHTML= `<button id ="initLogin">Iniciar sesion</button>` +
    `<button id ="initRegister">Registrarse</button>`+
    `<button id ="initGoogle">Iniciar con Google</button>`
    initContent.appendChild(logoInitContainer)
    initContent.appendChild(buttonsInit)
    document.getElementById("goContainer").appendChild(initContent).innerHTML
    // boton que abre la vista del login
    const btnInitLogin = document.getElementById("initLogin")
    // boton que abre formulario de registro
    const btnInitRegister = document.getElementById("initRegister")
    // boton que abre el inicio con google
    const btnInitGoogle = document.getElementById("initGoogle")
    btnInitLogin.addEventListener('click', ()=>{
        viewLogin()
       })
       
       btnInitRegister.addEventListener('click', ()=>{
        viewRegister()
       })
       btnInitGoogle.addEventListener('click', ()=>{
        authGoogle()
       })


    console.log(btnInitLogin);
    console.log(btnInitRegister);
    console.log(btnInitGoogle);
}