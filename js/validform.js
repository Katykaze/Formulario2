window.onload = inicio;
function inicio() {
    document.formulario.onsubmit = validForm;
    document.formulario.codpostal.oninput = cambioCodPos;
    document.formulario.onreset = limpiar;
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
    /*Jhon estuvo aqui */
    valido = validarCodControl() && valido;
    valido = validarNumCuenta() && valido;
    valido = validarNumTrabajadores() && valido;
    valido = validarNumFabrica() && valido;
    /*Hasta aqui estuvo Jhon*/
    valido = validarChecBox() && valido;
    valido = validarTelefono() && valido;
    valido = validarFecha() && valido;
    valido = validarCodBanco() && valido;
    valido = validarCodOficina() && valido;
    valido= validarIban() && valido;

    return valido;
}
//validacion de razon social
function validarRazon() {
    let valido = true;
    let razonF = document.formulario.nombre.value;
    let regExp = /^[a-zA-ZñÑáéíóúü][a-zA-ZñÑºªáéíóúü\-\.0-9 ]*[a-zA-ZñÑáéíóúü\.0-9]$/;
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
    let n2 = "Se ha introducido un NIF erróneo.El carácter de control es erróneo ";
    let n3="Se ha introducido un DNI,se ha pasado un número de entre 6 y 8 dígitos con un valor mínimo de 100000 ";
    let c2="Se ha introducido un cif erróneo.El carácter de control es erróneo ";
    let valido = true;
    let cifNif = document.formulario.cifnif.value;
    let resultado = nif_Cif(cifNif);
    //console.log(resultado);
    if (resultado ==n2 || resultado == n3 || resultado == c2 || resultado == 0) {
        document.formulario.error_nifcif.value = "Error,el nif  o cif no es correcto";
        document.formulario.error_nifcif.style = "visibility: visible";
        valido = false;
    } else {
        document.formulario.error_nifcif.style = "visibility: hidden";
    }
    return valido;
}
console.log(validNif_Cif("53909901V"));
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
        if (check[i].type == "checkbox") {
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
    let expregdir = /^[a-zA-ZñÑáéíóúü][a-zA-ZñÑºªáéíóúü\-\.0-9 ]*[a-zA-ZñÑáéíóúü0-9]$/i;
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
//----------------------    JHON    ----------------------------- //
function validarCodControl() {
    let valido = true;
    let codControl = document.formulario.codcontrol.value;
    let codBanco = document.formulario.codbanco.value;
    let numCuenta = document.formulario.numcuenta.value;
    let numSucursal = document.formulario.codoficina.value;
    let expreCodControl = /^\d{2}$/;
    if (!expreCodControl.test(codControl) || codControl != codigosControl(codBanco, numSucursal, numCuenta)) {
        document.formulario.error_codcon.value = "Error, El código de control debe ser numérico con dos dígitos, y válido";
        document.formulario.error_codcon.style = "visibility:visible";
        valido = false;
    } else {
        document.formulario.error_codcon.style = "visibility:hidden";
    }
    return valido;
}

function validarNumCuenta() {
    let valido = true;
    let numCuenta = document.formulario.numcuenta.value;
    let expreNumCuenta = /^\d{10}$/;
    if (!expreNumCuenta.test(numCuenta)) {
        document.formulario.error_numcu.value = "Error, El número de cuenta ha de ser numérico con 10 dígitos.";
        document.formulario.error_numcu.style = "visibility:visible";
        valido = false;
    } else {
        document.formulario.error_numcu.style = "visibility:hidden";
    }
    return valido;
}

function validarNumTrabajadores() {
    let valido = true;
    let numTrabajadores = document.formulario.numtrabajadores.value;
    let expreNumTrabajadores = /^((0{0,4}4[5-9])|(0{0,4}[5-9]\d)|(0{0,3}[1-9]\d{2})|(0{0,2}[1-9]\d{3})|(0?[1-9]\d{4})|([1-9]\d{5}))$/;
    if (!expreNumTrabajadores.test(numTrabajadores)) {
        document.formulario.error_numtrab.value = "Error, El valor mínimo va a ser 45 y puede tener hasta seis dígitos.";
        document.formulario.error_numtrab.style = "visibility:visible";
        valido = false;
    } else {
        document.formulario.error_numtrab.style = "visibility:hidden";
    }
    return valido;
}

function validarNumFabrica() {
    let valido = true;
    let numFabrica = document.formulario.numfabrica.value;
    let expreNumFabrica = /^((0{0,3}[2-9])|(0{0,2}[1-9]\d)|(0{0,2}[1-9]\d{2})|(0?[1-9]\d{2})|([1-9]\d{3}))$/;
    if (!expreNumFabrica.test(numFabrica)) {
        document.formulario.error_numfab.value = "Error, El valor mínimo va a ser 2 y tener hasta cuatro dígitos.";
        document.formulario.error_numfab.style = "visibility:visible";
        valido = false;
    } else {
        document.formulario.error_numfab.style = "visibility:hidden";
    }
    return valido;
}
//----------------------    FIN JHON    ------------------------- //
//------------------------ejercicios Cris-------------
function validarTelefono() {
    let valido = true;
    let tel = document.formulario.telefono.value;
    let regExptel = /^[9|8|6|7]\d{8}$/;

    if (!regExptel.test(tel)) {
        document.formulario.error_telefono.value = "Error, Debe tener 9 dígitos y comenzar por 9,8,6 o 7.";
        document.formulario.error_telefono.style = "visibility:visible";
        valido = false;
    } else {
        document.formulario.error_telefono.style = "visibility:hidden";
    }
    return valido;
}
function limpiar() {
    window.location.reload();
}
function validarFecha() {
    let valido = true;
    let fecha = document.formulario.fecha.value;
    let regExpfecha = /^(\d{1,2})*(\/|-)*(\d{1,2})*(\/|-)*(\d{4})$/;
    //(\d{1,2})
    if (!regExpfecha.test(fecha)) {

        document.formulario.error_fecha.value = "Error, La fecha es incorrecta. ";
        document.formulario.error_fecha.style = "visibility:visible";
        valido = false;
    } else {
        document.formulario.error_fecha.style = "visibility:hidden";
    }
    return valido;
}
function validarCodBanco() {
    let valido = true;
    let banco = document.formulario.codbanco.value;
    let regExpbanco = /^\d{4}$/
    if (!regExpbanco.test(banco)) {
        document.formulario.error_banco.value = "Error, El código de banco debe tener cuatro digitos.";
        document.formulario.error_banco.style = "visibility:visible";
        valido = false;
    } else {
        document.formulario.error_banco.style = "visibility:hidden";
    }
    return valido;
}
function validarCodOficina() {
    let valido = true;
    let ofi = document.formulario.codoficina.value;
    let regExpofi = /^\d{4}$/
    if (!regExpofi.test(ofi)) {
        document.formulario.error_oficina.value = "Error, El código de oficina debe tener cuatro digitos.";
        document.formulario.error_oficina.style = "visibility:visible";
        valido = false;
    } else {
        document.formulario.error_oficina.style = "visibility:hidden";
    }
    return valido;
}
function validarIban() {
    let valido = true;
    let iban = document.formulario.iban.value;
    let regExpiban = /([A-Za-z]{2}\d{2}[A-Za-z\d]{2,30})/;
    if (!regExpiban.test(iban)) {
        document.formulario.error_iban.value = "Error, Debe comenzar por dos letras, continuar con 2 digitos y el resto deben ser letras y digitos .";
        document.formulario.error_iban.style = "visibility:visible";
        valido = false;
    } else {
        document.formulario.error_iban.style = "visibility:hidden";
    }
    return valido;
}
