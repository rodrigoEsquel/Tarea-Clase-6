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

$botonNumeroFamiliares.onclick = function () {

if (Number(document.querySelector("#numero-familiares").value) > 0) {
  $botonNumeroFamiliares.disabled = true;

  const $body = document.querySelector("body");
  const $resultado = document.querySelector("#resultado");
  const $resultadoSueldo = document.querySelector("#resultado-sueldo");
  const numeroFamiliares = Number(document.querySelector("#numero-familiares").value);
  const nuevoFormulario = document.createElement("form");
  nuevoFormulario.id = "formularioExtra";

  for (let i = 0; i < numeroFamiliares; i++) {

    // Edades familiares

    const nuevoLabel = document.createElement("label");
    nuevoLabel.innerText = "Familiar " + String(i + 1);
    nuevoFormulario.appendChild(nuevoLabel);

    const nuevoInput = document.createElement("input");
    nuevoInput.type = "text";
    nuevoInput.className = "edad-familiar";
    nuevoInput.placeholder = "Ingresar la edad del familiar";
    nuevoFormulario.appendChild(nuevoInput);

    // Botones Sueldos

    const nuevoBotonAgregar = document.createElement("button");
    nuevoBotonAgregar.innerText = "Agregar sueldo";
    nuevoBotonAgregar.onclick = function () {
      if (!document.querySelector("#sueldo-" + (i + 1))) {
        const inputSueldo = document.createElement("input");
        inputSueldo.type = "text";
        inputSueldo.id = "sueldo-" + (i + 1);
        inputSueldo.placeholder = "Ingresar el sueldo del familiar";
        inputSueldo.className = "sueldo-familiar";
        nuevoFormulario.insertBefore(inputSueldo, nuevoBotonAgregar);
      }
      return false;
    };
    nuevoFormulario.appendChild(nuevoBotonAgregar);

    const nuevoBotonQuitar = document.createElement("button");
    nuevoBotonQuitar.innerText = "Quitar sueldo";
    nuevoBotonQuitar.id = "quitar-sueldo-" + (i + 1);
    nuevoBotonQuitar.onclick = function () {
      if (document.querySelector("#sueldo-" + (i + 1))) {
        nuevoFormulario.removeChild(
          document.querySelector("#sueldo-" + (i + 1))
        );
      }
      return false;
    };
    nuevoFormulario.appendChild(nuevoBotonQuitar);
    
  }

  const botonCalcular = document.createElement("button");
  botonCalcular.id = "boton-calcular";
  botonCalcular.innerText = "Calcular";
  botonCalcular.onclick = function () {
    const $arrayDeEdades = document.querySelectorAll(".edad-familiar");
    let minimo = Number.POSITIVE_INFINITY;
    let maximo = Number.NEGATIVE_INFINITY;
    let suma = 0;
    for (let i = 0; i < $arrayDeEdades.length; i++) {
      if (Number($arrayDeEdades[i].value) < minimo) {
        minimo = Number($arrayDeEdades[i].value);
      }
      if (Number($arrayDeEdades[i].value) > maximo) {
        maximo = Number($arrayDeEdades[i].value);
      }

      suma = suma + (Number($arrayDeEdades[i].value) || 0);

      let promedio = suma / $arrayDeEdades.length;
      $resultado.innerText = "La edad minima es " + minimo + " años, la maxima es " + maximo + " años, y el promedio es de " + promedio + " años.";
    }

    if (document.querySelectorAll(".sueldo-familiar")) {
      const $arrayDeSueldos = document.querySelectorAll(".sueldo-familiar");
      let minimoSueldo = Number.POSITIVE_INFINITY;
      let maximoSueldo = Number.NEGATIVE_INFINITY;
      let sumaSueldo = 0;
      let cantidadSueldo = 0;

      for (let i = 0; i < $arrayDeSueldos.length; i++) {
        if (Number($arrayDeSueldos[i].value) < minimoSueldo) {
          minimoSueldo = Number($arrayDeSueldos[i].value);
        }
        if (Number($arrayDeSueldos[i].value) > maximoSueldo) {
          maximoSueldo = Number($arrayDeSueldos[i].value);
        }
        if (Number($arrayDeSueldos[i].value) > 0) {
          sumaSueldo = sumaSueldo + Number($arrayDeSueldos[i].value);
          cantidadSueldo++;
        }
      }
      if (cantidadSueldo > 0) {
        let promedioSueldo = sumaSueldo / cantidadSueldo;
        $resultadoSueldo.innerText ="El sueldo minimo es $" + minimoSueldo + ", el sueldo maximo es $" + maximoSueldo + ", y el promedio es de $" + promedioSueldo + ".";
      }
    }

    return false;
  };
  nuevoFormulario.appendChild(botonCalcular);

  const botonReset = document.createElement("button");
  botonReset.id = "boton-reset";
  botonReset.innerText = "Reset";
  botonReset.onclick = function () {
    $body.removeChild(document.querySelector("#formularioExtra"));
    $botonNumeroFamiliares.disabled = false;
    $resultado.innerText = "Aca van a aparecer los resultados!";
    $resultadoSueldo.innerText = "";
    return false;
  };
  nuevoFormulario.appendChild(botonReset);

  $body.appendChild(nuevoFormulario);

  return false;
}
};

/*
TAREA:
Crear una interfaz que permita agregar ó quitar (botones agregar y quitar) inputs+labels para completar el salario anual de cada integrante de la familia que trabaje.
Al hacer click en "calcular", mostrar en un elemento pre-existente el mayor salario anual, menor salario anual, salario anual promedio y salario mensual promedio.

Punto bonus: si hay inputs vacíos, ignorarlos en el cálculo (no contarlos como 0).
*/
