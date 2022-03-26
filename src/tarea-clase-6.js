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
    document.querySelector("#resultado-edad").innerHTML =
      "";
    document.querySelector("#resultado-sueldo").innerHTML = "";
  }

  function crearFamiliar(indice) {
    const contenedor = document.createElement("div");
    contenedor.className = "row my-1";

    contenedor.appendChild(crearLabel(indice));
    contenedor.appendChild(crearInput("edad"));
    contenedor.appendChild(crearBotonAgregarSueldo(indice));
    contenedor.appendChild(crearBotonQuitarSueldo(indice));
    contenedor.appendChild(crearInput("sueldo", indice));

    document.querySelector("#familiares").appendChild(contenedor);
  }

  function crearLabel(indice) {
    const labelFamiliar = document.createElement("label");
    labelFamiliar.innerText = "Familiar " + String(indice + 1);
    labelFamiliar.className = "col-2 fs-5";
    return labelFamiliar;
  }

  function crearInput(tipoDato, indice = -1) {
    const inputFamiliar = document.createElement("input");
    inputFamiliar.type = "text";
    inputFamiliar.className = `${tipoDato} activo col-4`;
    inputFamiliar.placeholder = `Ingresar ${tipoDato}`;
    if (indice >= 0) {
      inputFamiliar.id = `${tipoDato}-familiar-${indice}`;
      inputFamiliar.classList.replace("activo", "visually-hidden");
    }
    return inputFamiliar;
  }

  function conseguirValores(arrayElementos) {
    const arrayValores = [];
    arrayElementos.forEach((element, indice) => {
      if (element.value !== "") {
        arrayValores[indice] = element.value;
      }
    });
    return arrayValores;
  }

  function crearBotonAgregarSueldo(indice) {
    const botonAgregarSueldo = document.createElement("button");
    botonAgregarSueldo.innerText = "Agregar sueldo";
    botonAgregarSueldo.id = `agregar-sueldo-familiar-${indice}`;
    botonAgregarSueldo.className = "activo col-2 btn btn-outline-dark";
    botonAgregarSueldo.onclick = function () {
      document
        .getElementById(`sueldo-familiar-${indice}`)
        .classList.replace("visually-hidden", "activo");
      document
        .getElementById(`quitar-sueldo-familiar-${indice}`)
        .classList.replace("visually-hidden", "activo");
      document
        .getElementById(`agregar-sueldo-familiar-${indice}`)
        .classList.replace("activo", "visually-hidden");
    };
    return botonAgregarSueldo;
  }

  function crearBotonQuitarSueldo(indice) {
    const botonQuitarSueldo = document.createElement("button");
    botonQuitarSueldo.innerText = "Quitar sueldo";
    botonQuitarSueldo.id = `quitar-sueldo-familiar-${indice}`;    
    botonQuitarSueldo.className = "visually-hidden col-2 btn btn-outline-dark";
    botonQuitarSueldo.onclick = function () {
      document
        .getElementById(`sueldo-familiar-${indice}`)
        .classList.replace("activo", "visually-hidden");
      document
        .getElementById(`quitar-sueldo-familiar-${indice}`)
        .classList.replace("activo", "visually-hidden");
      document
        .getElementById(`agregar-sueldo-familiar-${indice}`)
        .classList.replace("visually-hidden", "activo");
    };
    return botonQuitarSueldo;
  }

  resetID("familiares");
  resetID("botones");

  const numeroFamiliares = Number(
    document.querySelector("#numero-familiares").value
  );

  for (let i = 0; i < numeroFamiliares; i++) {
    crearFamiliar(i);
  }

  const botonCalcular = document.createElement("button");
  botonCalcular.id = "boton-calcular";
  botonCalcular.innerText = "Calcular";
  botonCalcular.type = "button";
  botonCalcular.className = "col-1 btn btn-outline-success";
  botonCalcular.onclick = function () {
    function resolver(tipoCalculo) {
      let arrayValores = conseguirValores(
        document.querySelectorAll(`.activo.${tipoCalculo}`)
      );

      document.querySelector(`#resultado-${tipoCalculo}`).innerText = `
        Mayor ${tipoCalculo} es: ${conseguirMaximo(arrayValores)},menor ${tipoCalculo} es: ${conseguirMinimo(arrayValores)}, ${tipoCalculo} promedio: ${conseguirMedio(arrayValores)}.
        `;
    }

    resolver("edad");
    if (document.querySelectorAll(".activo.sueldo").length > 0) {
      resolver("sueldo");
    }
  };
  document.querySelector("#botones").appendChild(botonCalcular);

  const botonReset = document.createElement("button");
  botonReset.innerText = "Reset";
  botonReset.type = "button";
  botonReset.className = "col-1 btn btn-outline-danger";
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

function conseguirMaximo(arrayarrayValores) {
  let maximo =  Number.NEGATIVE_INFINITY;
  arrayarrayValores.forEach((element) => {
    if (element > maximo) {
      maximo = element;
    }
  });
  return maximo;
}

function conseguirMedio(arrayarrayValores) {
  let suma = 0;
  let cantidad = 0;
  arrayarrayValores.forEach((element) => {
    if (element !== "") {
      suma = suma + Number(element);
      cantidad++;
    }
  });
  if (cantidad > 0) {
    return (suma / cantidad);
  }
  return cantidad;
}

function conseguirMinimo(arrayarrayValores) {
  let minimo = Number.POSITIVE_INFINITY;
  arrayarrayValores.forEach((element) => {
    if (element < minimo) {
      minimo = Number(element);
    }
  });
  return minimo;
}
