function testConseguirMaximo() {
  console.assert(
    conseguirMaximo([-1, 3, -5, 7]) === 7,
    "Conseguir maximo no verifico calcular el valor maximo de los elementos "
  );
}
function testConseguirMedio() {
  console.assert(
    conseguirMedio([-1, 3, -5, 7]) === 1,
    "Conseguir medio no verifico calcular el valor medio de los elementos "
  );
}
function testConseguirMinimo() {
  console.assert(
    conseguirMinimo([-1, 3, -5, 7]) === -5,
    "Conseguir minimmo no verifico calcular el valor minimo de los elementos "
  );
}

testConseguirMaximo();
testConseguirMedio();
testConseguirMinimo();
