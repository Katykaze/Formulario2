window.onload = inicio;
function inicio() {
    document.formulario.onsubmit = validForm;
    document.formulario.codpostal.oninput = cambioCodPos;
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
    valido = validar_direccion() && valido;
    valido = validar_localidad() && valido;
    valido = validar_codPostal() && valido;
    valido = validarChecBox() && valido;

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
    } else {
        document.formulario.error_razon.style = "visibility: hidden";
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
    else {
        document.formulario.error_codempresa.style = "visibility: hidden";
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
    } else {
        document.formulario.error_nifcif.style = "visibility: hidden";
    }
    return valido;
}
//console.log(validNif_Cif("53909901V"));
function botonSelect() {
    let valido = true;
    let radio = document.formulario.tipopersona.value;//nos devuelve un nodo con todos los tipopersona
    let tipo = document.formulario.tipo.value;//nos devuelve un nodo con todos los tipos
    if (tipo == "") {

        document.formulario.error_tipoemp.value = "Error,debes elegir un tipo de empresa";
        document.formulario.error_tipoemp.style = "visibility: visible";
        valido = false;

    } else {
        document.formulario.error_tipoemp.style = "visibility: hidden";
    }
    if (radio == "") {
        document.formulario.error_tipo.value = "Error,debes elegir un tipo de empresa";
        document.formulario.error_tipo.style = "visibility: visible";
        valido = false;
    } else {
        document.formulario.error_tipo.style = "visibility: hidden";
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
    if (counter < 2) {
        document.formulario.error_comunidad.value = "Error,debes elegir al menos dos comunidades";
        document.formulario.error_comunidad.style = "visibility: visible";
        valido = false;
    } else {
        document.formulario.error_comunidad.style = "visibility: hidden";
    }
    return valido;

}
function validarChecBox() {
    let valido = true;
    let check = document.formulario.sectores_economicos.elements;
    console.log(check);
    let counter = 0;
    for (let i = 0; i < check.length; i++) {
        if(check[i].type == "checkbox"){
            if (check[i].checked) {
                //console.log("----" + i);
                counter++;
            }
            
        }

        
    }
    if (counter < 1) {
        document.formulario.error_sectores.value = "Error, debe elegir al menos una opcion";
        document.formulario.error_sectores.style = "visibility: visible";
        valido = false;
    } else {
        document.formulario.error_sectores.style = "visibility: hidden";
    }
    return valido;
}
//----------------------fin parte Katy------------------------------------------------
//--------------------dani


function validar_direccion() {
    let valido = true;
    let dir = document.formulario.direccion.value.trim();
    let expregdir = /^[a-z](\w| |ª|º|\/|\.|\-)+\w$/i;
    if (!expregdir.test(dir)) {
        document.formulario.error_direccion.value = "Error, la direccion está mal escrita";
        document.formulario.error_direccion.style = "visibility: visible";
    }
    else {
        document.formulario.error_direccion.style = "visibility: hidden";
    }
    return valido;
}
//validar localidad
function validar_localidad() {
    let valido = true;
    var expregloc = /^[a-z]([a-z]|\s)+[a-z]$/i;
    let localidad = document.formulario.localidad.value.trim();
    if (!expregloc.test(localidad)) {
        document.formulario.error_localidad.value = "Error, la localidad está mal escrita";
        document.formulario.error_localidad.style = "visibility: visible";
    } else {
        document.formulario.error_localidad.style = "visibility: hidden";
    }
    return valido;
}
//validar codigo postal
function validar_codPostal() {
    let valido = true;
    let codpostal = document.formulario.codpostal.value.trim();
    let expregcodpos = /^([1-4]\d{4}|5[0-2]\d{3}|0?100\d|0?10[1-9]\d|0?1[1-9]\d{2}|0?[2-9]\d{3})$/i
    if (!expregcodpos.test(codpostal)) {
        document.formulario.error_codpos.value = "Error, codigo postal no valido";
        document.formulario.error_codpos.style = "visibility:visible";
        valido = false;
    } else {
        document.formulario.error_codpos.style = "visibility:hidden";
    }
    return valido;
}
//------------------------------fin dani
function cambioCodPos() {
    if (validar_codPostal()) {

        let codigoPostal = document.formulario.codpostal.value;
        let initial;
        if (codigoPostal.length == 4) {
            initial = parseInt(codigoPostal.substring(0, 1) - 1);
        } else {
            initial = parseInt(codigoPostal.substring(0, 2) - 1);
        }
        let provincias = ['Alava', 'Albacete', 'Alicante', 'Almería', 'Avila', 'Badajoz', 'Islas Baleares', 'Barcelona', 'Burgos', 'Cáceres',
            'Cádiz', 'Castellón', 'Ciudad Real', 'Córdoba', 'La Coruña', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara',
            'Guipúzcoa', 'Huelva', 'Huesca', 'Jaén', 'León', 'Lérida', 'La Rioja', 'Lugo', 'Madrid', 'Málaga', 'Murcia', 'Navarra',
            'Orense', 'Asturias', 'Palencia', 'Las Palmas', 'Pontevedra', 'Salamanca', 'Santa Cruz de Tenerife', 'Cantabria', 'Segovia', 'Sevilla', 'Soria', 'Tarragona',
            'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza', 'Ceuta', 'Melilla'];

        document.formulario.provincia.value = provincias[initial];
        //console.log(" es valido");   
    }

}