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

    it('resultados vacios', () => {
      cy.get('#resultado-edad').should('have.value', '');
      cy.get('#resultado-sueldo').should('have.value', '');
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

  describe('Calcula sueldo familiares', () => {
    it('Activa campos de sueldos', () => {
      cy.get('[id^=agregar-sueldo-familiar]').then(($botonesSueldos) => {
        $botonesSueldos[1].click();
        $botonesSueldos[2].click();
        $botonesSueldos[3].click();
        $botonesSueldos[4].click();
      });
      cy.get('input.sueldo.activo').should('have.length', 4);
    });

    it('Rellena campos sueldos visibles', () => {
      cy.get('input.sueldo.activo').then(($inputsSueldo) => {
        $inputsSueldo.each((i, input) => {
          if (i !== 2) {
            input.value = i * 10000;
          }
        });
        expect($inputsSueldo.eq(0), 'Primer item sueldo').to.have.value(0);
        expect($inputsSueldo.eq(1), 'Segundo item sueldo').to.have.value(10000);
        expect($inputsSueldo.eq(2), 'Tercer item sueldo').to.have.value('');
        expect($inputsSueldo.eq(3), 'Cuarto item sueldo').to.have.value(30000);
      });
    });

    it('Elimina input sueldo', () => {
      cy.get('#quitar-sueldo-familiar-1').click();
      cy.get('input.sueldo.activo').should('have.length', 3);
    });

    it('Resuelve sin vacios', () => {
      cy.get('#boton-calcular').click();

      cy.get('#resultado-sueldo')
        .should('contain', 'Mayor sueldo es: 30000')
        .should('contain', 'menor sueldo es: 10000,')
        .should('contain', 'sueldo promedio: 20000');
    });
  });

  describe('Desmonte de elementos', () => {
    it('Desactiva campos de sueldos', () => {
      cy.get('[id^=quitar-sueldo-familiar].activo').then(($botonesSueldos) => {
        $botonesSueldos.each((i, input) => {
          input.click();
        });
      });
      cy.get('input.sueldo.activo').should('have.length', 0);
    });

    it('Calcula unicamente sueldos', () => {
      cy.get('#boton-calcular').click();
      cy.get('#resultado-sueldo').should('have.value', '');
    });

    it('Desactiva campos de sueldos', () => {
      cy.get('#boton-reset').click();
      cy.get('button').should('have.length', 1);
      cy.get('input.edad').should('have.length', 0);
      cy.get('input.sueldo').should('have.length', 0);
      cy.get('#resultado-edad').should('have.value', '');
      cy.get('#resultado-sueldo').should('have.value', '');
    });
  });
});
