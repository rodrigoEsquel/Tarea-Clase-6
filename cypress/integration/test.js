/// <reference types="Cypress" />

const URL = "127.0.0.1:8080";

context('Calculador de Familiares', () => {
  before( () => {
    cy.visit(URL);
  });

  describe('verifica carga de la pagina', () => {

    it('carga el titulo', () => {
      cy.get('h1').contains('Calculador de Edades y Sueldos de Familiares');
    })
    
    it('carga el navbar', () => {
      cy.get('nav').should('have.length',1);
    })
    
    it('carga el formulario', () => {
      cy.get('button').should('have.length',1);
      cy.get('input').should('have.length',1);
    })

  })
})



