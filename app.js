// Coloco las variables al inicio del código. Sólo las inicializo
let listadoNumerosSecretos = [];
let numeroSecreto = -1;
let numeroUsuario = -1; 
let numeroMaximo = 10;
let intentos = 0;

// Proponemos que el número que se genere no se repita
function generarNumeroAleatorio() {
    // Si ya generé todos los números posibles, entonces doy un aviso
    if (listadoNumerosSecretos.length == numeroMaximo) {
        asignarTextoAElemento('h1', 'Felicitaciones! Jugaste con todos los números posibles!');
        asignarTextoAElemento('p', 'Recarga la página para jugar nuevamente');
        document.querySelector('#botonIntentar').setAttribute('disabled', 'true');
        document.querySelector('#botonNuevoJuego').setAttribute('disabled', 'true');    
    } else {
        // Si aún falta generar algún número, entonces genero un número aleatorio
        let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    
        if (listadoNumerosSecretos.includes(numeroGenerado)) {
            // Si el número ya fue generado, ya se jugó con dicho número. Entonces uso Recursividad para generar y retornar otro valor
            return generarNumeroAleatorio(); 
        } else {
            // Si el número nunca fue generado, entonces lo agrego al Array y juego con dicho número
            listadoNumerosSecretos.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

// Conviene que las funciones sean genéricas y se puedan reutilizar
function asignarTextoAElemento(selector, texto) {
    document.querySelector(selector).innerHTML = texto;
}

function verificarIntento() {
    // El valor ingresado por el usuario en un input es una cadena de texto. Convertir su tipo de dato
    numeroUsuario = parseInt(document.querySelector('#valorUsuario').value); 

    if (numeroUsuario === numeroSecreto) {
        // Uso el operador ternario para usar correctamente singular o plural
        asignarTextoAElemento('p', `Lo hallaste en ${intentos} ${intentos == 1 ? 'intento' : 'intentos'}! El número secreto era ${numeroSecreto}.`);
        setearCondicionesFinDeJuego();
    } else {
        if (numeroUsuario < numeroSecreto) {
            asignarTextoAElemento('p', 'El número secreto es mayor.');            
        } else {
            asignarTextoAElemento('p', 'El número secreto es menor.');
        }
        intentos++;
    }
}

function crearNuevoJuego() {
    setearCondicionesInicioDeJuego();
}

function setearCondicionesFinDeJuego() {
    // Limpio la caja de ingreso de valores y habilito/deshabilito botones
    document.querySelector('#valorUsuario').value = '';
    document.querySelector('#botonIntentar').setAttribute('disabled', 'true');
    document.querySelector('#botonNuevoJuego').removeAttribute('disabled');
}

function setearCondicionesInicioDeJuego() {
    // Habilito/deshabilito botones y creo número aleatorio
    document.querySelector('#botonIntentar').removeAttribute('disabled');
    document.querySelector('#botonNuevoJuego').setAttribute('disabled', 'true');

    asignarTextoAElemento('p', `Juguemos entre 1 y ${numeroMaximo}`);

    numeroSecreto = generarNumeroAleatorio();
    intentos = 1;
}

asignarTextoAElemento('h1', "Adivina un número secreto!");
setearCondicionesInicioDeJuego();
