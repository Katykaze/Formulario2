//fincion nif -----------------> katy
function esNif(cadenaNif) {

    let regexp = /[0-9]{8}[A-Z]{1}$/i;
    let regexp2 = /^[XYZLKM][0-9]{7}[A-Z]$/i;
    if (!regexp.test(cadenaNif) && !regexp2.test(cadenaNif)) {
        return 0;
    } else {
        calculoCaracterControl = cadenaNif.substr(0, 8);
        let cambio = "";
        if (calculoCaracterControl.charAt(0) == "Y") {
            cambio = calculoCaracterControl.replace("Y", "1");
        }
        else if (calculoCaracterControl.charAt(0) == "Z") {
            cambio = calculoCaracterControl.replace("Z", "2");
        } else if (calculoCaracterControl.charAt(0) == "X" || calculoCaracterControl.charAt(0) == 'K' ||
            calculoCaracterControl.charAt(0) == "L" || calculoCaracterControl.charAt(0) == "M") {
            let primeraLetra = calculoCaracterControl.charAt(0);
            cambio = calculoCaracterControl.replace(primeraLetra, "0");
        } else {
            cambio = calculoCaracterControl;
        }
        let arr = new Array();
        arr = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];
        let posicion = 0;
        posicion = parseInt(cambio) % 23;
        if (cadenaNif.substr(-1) != arr[posicion]) {
            //console.log("el nif no es correcto, el caracter de control es erroneo");
            return 2;
        }
        if (!cambio >= 100000) {
            //console.log("Se ha introducido un DNI, se ha pasado un número de entre 6 y 8 dígitos con un valor mínimo de 100000.");
            return 3;
        }
    }

    return 1;
}

//funcion cif ----------------------> katy
function esCif(cadenaCif) {

    let sumaPares = 0;
    let sumaImpares = 0;
    let regexp = /^[AHJUV]{1}[0-9]{8}$/i;
    let regexp2 = /^[PQRSW]{1}[0-9]{7}[A-Z]{1}$/i;
    if (!regexp.test(cadenaCif) && !regexp2.test(cadenaCif)) {
        return 0; //no es valido ya que no cumple las expresiones regulares 
    } else {
        for (let i = 1; i < 8; i++) {
            if (i % 2 == 1) {
                //al introducir una cadena, es nesario realizar parseInt para las operaciones
                let num = parseInt(cadenaCif[i]) * 2;
                if (num > 9) {
                    //el num%10 me va a dar el primer digito
                    //el ultimo numero siempre sera 1
                    sumaImpares += 1 + num % 10;
                } else {
                    sumaImpares += num;
                }
            } else {
                sumaPares += parseInt(cadenaCif[i]);
            }
        }
        //calculamos el resultado final realizando la suma de pares e impares, el modulo del mismo y restamos 10
        let resultado = 10 - ((sumaImpares + sumaPares) % 10);
        if (resultado == 10) {
            resultado = 0;
        }
        //segun el formato que sea modificamos la ultima letra de la cadena o bien segun el resultado será una letra 
        if (regexp.test(cadenaCif)) {
            //formato1.includes(cadenaCif[0])
            if (resultado == cadenaCif[8]) {
                return 1; //cif correcto
            }
        }
        if (regexp2.test(cadenaCif)) {
            let arr = new Array();
            arr = ['J', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
            if (cadenaCif[8] == arr[resultado]) {
                return 1;
            }
        }
    }
    return 2; //cif erroneo o caracter de control erroneo
}

//funcion nif cif juntos -------------------------> katy
function nif_Cif(cadena){
    let n2 = "Se ha introducido un NIF erróneo.El carácter de control es erróneo ";
    let n1="Se ha introducido un NIF correcto";
    let n3="Se ha introducido un DNI,se ha pasado un número de entre 6 y 8 dígitos con un valor mínimo de 100000 ";
    let c1="Se ha introducido un CIF correcto ";
    let c2="Se ha introducido un cif erróneo.El carácter de control es erróneo ";
    if(esNif(cadena)== 2){
        return n2;
    }else if(esNif(cadena)==3){
        return n3;
    }else if(esNif(cadena)==1){
        return n1;
    }
    if(esCif(cadena)==0){
        return 0;
    }else if(esCif(cadena)==2){
        return c2;
    }else{
        return c1;
    }  
}

//console.log(nif_Cif("V31261"));
//funcion codigos de control -----------------> JHON

//funcion calculoIbanEspaña -------------------------> cris

//funcion comprobarIban-----------------------------> cris 

