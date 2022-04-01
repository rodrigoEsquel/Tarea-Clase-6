/// <reference types='Cypress' />

const URL = '127.0.0.1:8080';

context('Calculador de Familiares', () => {
  before(() => {
    cy.visit(URL);
  });

  describe('Verifica carga de la pagina', () => {
    it('carga el titulo', () => {
      cy.get('h1').contains('Calculador de Edades y Sueldos de Familiares');
    });

    it('carga el navbar', () => {
      cy.get('nav').should('have.length', 1);
    });

    it('carga el formulario', () => {
      cy.get('button').should('have.length', 1);
      cy.get('input').should('have.length', 1);
    });
  });

  describe('Agrega Familiares', () => {
    it('maneja el formulario', () => {
      cy.get('input').type(5);
      cy.get('button').click();
    });

    it('aparecen botones de accion', () => {
      cy.get('#botones button').should('have.length', 2);
    });

    it('genera inputs de edad', () => {
      cy.get('input.edad').should('have.length', 5);
    });

    it('genera inputs de sueldos ocultos', () => {
      cy.get('input.visually-hidden').should('have.length', 5);
    });
  });

  describe('Calcula edad Familiares', () => {
    it('Rellena campos edad', () => {
      cy.get('input.edad').then(($inputsEdad) => {
        $inputsEdad.each((i, input) => {
          input.value = i * 10;
        });
        expect($inputsEdad.eq(0), 'Primer item edad').to.have.value(0);
        expect($inputsEdad.eq(1), 'Segundo item edad').to.have.value(10);
        expect($inputsEdad.eq(2), 'Tercer item edad').to.have.value(20);
        expect($inputsEdad.eq(3), 'Cuarto item edad').to.have.value(30);
        expect($inputsEdad.eq(4), 'Quinto item edad').to.have.value(40);
      });
    });

    it('Elimina input edad', () => {
      cy.get('input.edad').eq(0).clear().should('have.value', '');
    });

    it('Resuelve calculo', () => {
      cy.get('#boton-calcular').click();

      cy.get('#resultado-edad')
        .should('contain', 'Mayor edad es: 40')
        .should('contain', 'menor edad es: 10,')
        .should('contain', 'edad promedio: 25.');
    });
  });

  describe('Calcula sueldo Familiares', () => {
    it('Rellena campos sueldos', () => {
      cy.get('input.sueldo').then(($inputsSueldo) => {
        $inputsSueldo.each((i, input) => {
          input.value = i * 10000;
        });
        expect($inputsSueldo.eq(0), 'Primer item sueldo').to.have.value(0);
        expect($inputsSueldo.eq(1), 'Segundo item sueldo').to.have.value(10000);
        expect($inputsSueldo.eq(2), 'Tercer item sueldo').to.have.value(20000);
        expect($inputsSueldo.eq(3), 'Cuarto item sueldo').to.have.value(30000);
        expect($inputsSueldo.eq(4), 'Quinto item sueldo').to.have.value(40000);
      });
    });
  });
});
