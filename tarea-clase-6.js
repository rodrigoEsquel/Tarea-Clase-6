/*
TAREA: Empezar preguntando cuánta gente hay en el grupo familiar.
Crear tantos inputs+labels como gente haya para completar la edad de cada integrante.
Al hacer click en "calcular", mostrar en un elemento pre-existente la mayor edad, la menor edad y el promedio del grupo familiar.

Punto bonus: Crear un botón para "empezar de nuevo" que empiece el proceso nuevamente, borrando los inputs ya creados (investigar cómo en MDN).

const nodoPagina = document.querySelector('body');
    const nuevoParrafo = document.createElement('p');
    const textoParrafo = document.createTextNode('Yeeee!');
    nuevoParrafo.appendChild(textoParrafo);
    nodoPagina.appendChild(nuevoParrafo);
*/

const $botonNumeroFamiliares = document.querySelector("#btn-numero-familiares");

$botonNumeroFamiliares.onclick = function (event) {
  event.preventDefault();
  
  function resetID(id) {
    document.querySelector(`#${id}`).innerHTML = "";
  }

  function resetResultados() {
    document.querySelector("#resultado-edad").innerHTML = "Aca van a aparecer los resultados!";
    document.querySelector("#resultado-sueldo").innerHTML = "";
  }

  function crearFamiliar(indice) {
    const contenedor = document.createElement("div");

    contenedor.appendChild(crearLabel(indice));
    contenedor.appendChild(crearInput("edad"));
    contenedor.appendChild(crearBotonAgregarSueldo(indice));
    contenedor.appendChild(crearBotonQuitarSueldo(indice));
    contenedor.appendChild(crearInput("sueldo",indice));

    document.querySelector("#familiares").appendChild(contenedor);
  }

  function crearLabel(indice) {
    const labelFamiliar = document.createElement("label");
    labelFamiliar.innerText = "Familiar " + String(indice + 1);
    return labelFamiliar;
  }

  function crearInput(tipoDato,indice = -1) {
    const inputFamiliar = document.createElement("input");
    inputFamiliar.type = "text";
    inputFamiliar.className = `${tipoDato}`;
    inputFamiliar.placeholder = `Ingresar ${tipoDato} del familiar`;
    inputFamiliar.classList.add("activo")
    if (indice >= 0) {
      inputFamiliar.id = `${tipoDato}-familiar-${indice}`;
      inputFamiliar.classList.replace("activo","oculto");
    }
    return inputFamiliar;
  }

  function crearBotonAgregarSueldo(indice) {
    const botonAgregarSueldo = document.createElement("button");
    botonAgregarSueldo.innerText = "Agregar sueldo";
    botonAgregarSueldo.id = `agregar-sueldo-familiar-${indice}`;
    botonAgregarSueldo.classList.add("activo");
    botonAgregarSueldo.onclick = function () {
      document.getElementById(`sueldo-familiar-${indice}`).classList.replace("oculto","activo");
      document.getElementById(`quitar-sueldo-familiar-${indice}`).classList.replace("oculto","activo");
      document.getElementById(`agregar-sueldo-familiar-${indice}`).classList.replace("activo","oculto");
    }
    return botonAgregarSueldo;
  }

  function crearBotonQuitarSueldo(indice) {
    const botonQuitarSueldo = document.createElement("button");
    botonQuitarSueldo.innerText = "Quitar sueldo";
    botonQuitarSueldo.id = `quitar-sueldo-familiar-${indice}`;
    botonQuitarSueldo.classList.add("oculto");
    botonQuitarSueldo.onclick = function () {
      document.getElementById(`sueldo-familiar-${indice}`).classList.replace("activo","oculto");
      document.getElementById(`quitar-sueldo-familiar-${indice}`).classList.replace("activo","oculto");
      document.getElementById(`agregar-sueldo-familiar-${indice}`).classList.replace("oculto","activo");
    }
    return botonQuitarSueldo;
  }

  resetID("familiares");
  resetID("botones");

  const numeroFamiliares = Number(document.querySelector("#numero-familiares").value);

  for (let i = 0; i < numeroFamiliares; i++) {    
    crearFamiliar(i);
  }

  const botonCalcular = document.createElement("button");
  botonCalcular.id = "boton-calcular";
  botonCalcular.innerText = "Calcular";
  botonCalcular.onclick = function () {

    function resolver(tipoCalculo) {
      const arrayElementos = document.querySelectorAll(`.activo.${tipoCalculo}`);
      document.querySelector(`#resultado-${tipoCalculo}`).innerText = `
      Mayor ${tipoCalculo} es: ${conseguirMaximo(arrayElementos)},
      menor ${tipoCalculo} es: ${conseguirMinimo(arrayElementos)},
      ${tipoCalculo} promedio: ${conseguirMedio(arrayElementos)}.
      `
    }

    function conseguirMaximo(arrayElementos) {
      let maximo = Number(arrayElementos[0].value);
      arrayElementos.forEach(element => {
        if (element.value > maximo) {
          maximo = element.value;
        }
      });
      return maximo;
    }

    function conseguirMedio(arrayElementos) {
      let suma = 0;
      let cantidad = 0;
      arrayElementos.forEach(element => {
        if (element.value !== "") {
          suma += element.value;
          cantidad++;
        }
      });
      if (cantidad > 0) {
        return suma / cantidad;
      } 
      return cantidad;
    }

    function conseguirMinimo(arrayElementos) {
      let minimo = Number(arrayElementos[0].value);
      arrayElementos.forEach(element => {
        if (element.value < minimo) {
          minimo = element.value;
        }
      });
      return minimo;
    }

    resolver("edad");
    resolver("sueldo");
  };
  document.querySelector("#botones").appendChild(botonCalcular);
  
  const botonReset = document.createElement("button");
  botonReset.innerText = "Reset";
  botonReset.onclick = function () {
    resetID("familiares");
    resetID("botones");
    resetResultados();
  };
  document.querySelector("#botones").appendChild(botonReset);
};

/*
TAREA:
Crear una interfaz que permita agregar ó quitar (botones agregar y quitar) inputs+labels para completar el salario anual de cada integrante de la familia que trabaje.
Al hacer click en "calcular", mostrar en un elemento pre-existente el mayor salario anual, menor salario anual, salario anual promedio y salario mensual promedio.

Punto bonus: si hay inputs vacíos, ignorarlos en el cálculo (no contarlos como 0).
*/
