const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");

const expresiones = {
    nombre: /^[a-zA-Z0-9\_\-]{1,16}$/, // Letras, numeros, guion y guion_bajo
    apellido: /^[a-zA-Z0-9\_\-]{1,16}$/,
    //nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,20}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
    "usuario": false,
    "apellido": false,
    "contraseña":false,
    "correo": false,
    "telefono": false
}


const validarFormulario = (e) => {
    switch (e.target.name){
        case "usuario":
            validarCampo(expresiones.nombre, e.target, "usuario");
        break;
        case "apellido":
            validarCampo(expresiones.apellido, e.target, "apellido");
        break;
        case "contraseña":
            validarCampo(expresiones.password, e.target, "contraseña");
            validarPassword2();
        break;
        case "contraseña2":
            validarPassword2();
        break;
        case "correo":
            validarCampo(expresiones.correo, e.target, "correo");
        break;
        case "telefono":
            validarCampo(expresiones.telefono, e.target, "telefono");
        break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)){
        document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-incorrecto");
        document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-correcto");
        document.querySelector(`#grupo__${campo} i`).classList.add("fa-check-circle")
        document.querySelector(`#grupo__${campo} i`).classList.remove("fa-times-circle")
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove("formulario__input-error-activo")
        campos[campo] = true;
    }else{
        document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-incorrecto");
        document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-correcto");
        document.querySelector(`#grupo__${campo} i`).classList.remove("fa-check-circle")
        document.querySelector(`#grupo__${campo} i`).classList.add("fa-times-circle")
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add("formulario__input-error-activo")
        campos[campo] = false;
    }
};

const validarPassword2 = () => {
    const inputPassword = document.getElementById("contraseña");
    const inputPassword2 = document.getElementById("contraseña2");
    if(inputPassword.value !== inputPassword2.value){
        document.getElementById(`grupo__contraseña2`).classList.add("formulario__grupo-incorrecto");
        document.getElementById(`grupo__contraseña2`).classList.remove("formulario__grupo-correcto");
        document.querySelector(`#grupo__contraseña2 i`).classList.remove("fa-check-circle")
        document.querySelector(`#grupo__contraseña2 i`).classList.add("fa-times-circle")
        document.querySelector(`#grupo__contraseña2 .formulario__input-error`).classList.add("formulario__input-error-activo")
        campos["contraseña"] = false;
    }else{
        document.getElementById(`grupo__contraseña2`).classList.remove("formulario__grupo-incorrecto");
        document.getElementById(`grupo__contraseña2`).classList.add("formulario__grupo-correcto");
        document.querySelector(`#grupo__contraseña2 i`).classList.add("fa-check-circle")
        document.querySelector(`#grupo__contraseña2 i`).classList.remove("fa-times-circle")
        document.querySelector(`#grupo__contraseña2 .formulario__input-error`).classList.remove("formulario__input-error-activo")
        campos["contraseña"] = true;
    }
};


inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});    

formulario.addEventListener('submit', (e) =>{
    //e.preventDefault();
    e.defaultPrevented
    const terminos = document.getElementById("terminos");
    console.log(campos["usuario"]);
    console.log(campos["apellido"]);
    console.log(campos["contraseña"]);
    console.log(campos["correo"]);
    console.log(campos["telefono"]);
    if(campos["usuario"] && campos["apellido"] && campos["contraseña"] && campos["correo"] && campos["telefono"] && terminos.checked){
        console.log("Vamos bien ");       
    }else{
        document.getElementById("formulario__mensaje").classList.add("formulario__mensaje-activo")
        console.log("Vamos mal");
        e.preventDefault();
    }

})

