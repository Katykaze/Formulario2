window.onload = inicio;
function inicio() {
    document.formulario.onsubmit = validForm;
}
function validForm() {
    //----llamando todas las funciones abajo y si se cumplen todas, enviar el formulario --> valido == true
    //[importante!!!!!! ---> invocar a las funciones de esta manera y en este orden, asi no se interrumpe la ejecucion de
    //las funciones y nos saltará siempre el error en caso de que los haya (ejemplo false = false && false --> dara false)
    //pero al estar la funcion antes, se ejecutara y saltara el error]<--------------------
    let valido = true;
    valido = validarRazon() && valido;
    valido = validarCodigoEmpresa() && valido;
    valido = botonSelect() && valido;
    valido = validarDesplegable() && valido;
    valido = validNif_Cif() && valido;

    return valido;
}
//validacion de razon social
function validarRazon() {
    let valido = true;
    let razonF = document.formulario.nombre.value;
    let regExp = /^[a-zA-ZñÑ][a-zA-ZñÑºª\-\.0-9 ]*[a-zA-ZñÑ\.0-9]$/;
    if (!regExp.test(razonF)) {
        document.formulario.error_razon.value = "Error. Debe empezar por una letra y terminar por letra dígito o punto. En su interior puede contener letras, dígitos y caracteres º ª - .";
        document.formulario.error_razon.style = "visibility: visible";
        valido = false;
    }
    return valido;
}
//validacion codigo de la empresa
function validarCodigoEmpresa() {
    let valido = true;
    let valorDelCampo = document.formulario.codempresa.value;
    let regExp = /[a-zA-ZñÑ0-9]{5,10}/;
    if (!regExp.test(valorDelCampo)) {
        document.formulario.error_codempresa.value = "Error. Debe contener letra o dígitos.Tamaño comprendido entre 5 y 10";
        document.formulario.error_codempresa.style = "visibility: visible";
        valido = false;
    }
    return valido;
}
//validacion de si nifcif es correcto
function validNif_Cif() {
    let valido = true;
    let cifNif = document.formulario.cifnif.value;
    let resultado = nif_Cif(cifNif);
    if (resultado == "n2" || resultado == "n3" || resultado == "c2" || resultado == 0) {
        document.formulario.error_nifcif.value = "Error,el nif  o cif no es correcto";
        document.formulario.error_nifcif.style = "visibility: visible";
        valido = false;
    }
    return valido;
}
//console.log(validNif_Cif("53909901V"));
////validar los radios: una funcion para validarlos todos los tipos radios y la funcion de iterateOverRadioGroups para recorrer y hacer el .checked
function iterateOverRadioGroups(listOfRadioButtons) {
    for (var i = 0; i < listOfRadioButtons.length; i++) {
        if (listOfRadioButtons[i].checked) {
            return true;
        }
    }
    return false;
}
function botonSelect() {
    let valido = true;
    let radio = document.formulario.tipopersona;//nos devuelve un nodo con todos los tipopersona
    let tipo = document.formulario.tipo;//nos devuelve un nodo con todos los tipos
    if (!iterateOverRadioGroups(radio)) {
        document.formulario.error_tipo.value = "Error,debes elegir un tipo de persona";
        document.formulario.error_tipo.style = "visibility: visible";
        valido = false;
    }
    if (!iterateOverRadioGroups(tipo)) {
        document.formulario.error_tipoemp.value = "Error,debes elegir un tipo de empresa";
        document.formulario.error_tipoemp.style = "visibility: visible";
        valido = false;
    }
    return valido;
}
//controlar en el apartado comunidades elegir minimo dos campos
function validarDesplegable() {
    let valido = true;
    let indice = document.formulario.comunidades.options;//nos devuelve un array con todas las opciones
    console.log(indice);
    let counter = 0;//contador para comparar si se cumple el minimo de 2 o no
    for (let i = 0; i < indice.length; i++) {

        if (indice[i].selected) {
            console.log("----" + i);
            counter++;
        }
    }
    if (counter < 2){
        document.formulario.error_comunidad.value = "Error,debes elegir al menos dos comunidades";
        document.formulario.error_comunidad.style = "visibility: visible";
        valido = false;
    }
    return valido;

}
//----------------------fin parte Katy------------------------------------------------
function validar_direccion() {
    let valido = true; 
    let dir= document.formulario.direccion.value.trim(); 
    let expregdir = /^[a-z](\w|ª|º|\/|\.|\-)+\w$/i;
    if (!expregdireccion.test(dir)) {
        document.formulario.error_direccion.value = "Error, la direccion está mal escrita"; 
        document.formulario.error_direccion.style = "visibility: visible";
    }
    return valido;
}
//validar localidad
function validar_localidad() {
    let valido = true; 
    var expregloc = /^[a-z]([a-z]|\s)+[a-z]$/i;
    let localidad = document.formulario.localidad.value.trim();
    if (expregloc.test(localidad)) {
    document.formulario.error_localidad.value = "Error, la localidad está mal escrita";
    document.formulario.error_localidad.style = "visibility: visible";
    }
    return valido;
}
//validar codigo postal
function validar_codPostal() {
    let valido = true; 
    let codPostal = document.formulario.codPostal.value.trim();
    let expregcodpos =/^(0?[1-9]|[1-4]\d|5[012])\d{3}$/i
    if (!expregcodpos.test(codPostal)) { 
        document.formulario.error_codpos.value= "Error, codigo postal no valido";
        document.formulario.error_codpos.style= "visibility:visible"; 
        valido = false;
}
return valido;
}