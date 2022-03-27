/// <reference types="Cypress" />

const URL = "127.0.0.1:8080";

context('Calculador de Familiares', () => {
  before( () => {
    cy.visit(URL);
  });

  describe('Verifica carga de la pagina', () => {

    it('carga el titulo', () => {
      cy.get('h1').contains('Calculador de Edades y Sueldos de Familiares');
    });    

    it('carga el navbar', () => {
      cy.get('nav').should('have.length',1);
    });    

    it('carga el formulario', () => {
      cy.get('button').should('have.length',1);
      cy.get('input').should('have.length',1);
    });

  });

  describe('Agrega Familiares', () => {

    it('maneja el formulario', () => {
      cy.get('input').type(5);
      cy.get('button').click();
    });
    
    it('aparecen botones de accion', () => {
      cy.get('#botones button').should('have.length',2);
    });

    it('genera inputs de edad', () => {
      cy.get('input.edad').should('have.length',5);
    });  

    it('genera inputs de sueldos ocultos', () => {
      cy.get('input.visually-hidden').should('have.length',5);
    });

  });

  
  describe('Calcula edad Familiares', () => {

    it('maneja el formulario', () => {
      cy.get('input').type(5);
      cy.get('button').click();
    });
    
    it('aparecen botones de accion', () => {
      cy.get('#botones button').should('have.length',2);
    });

    it('genera inputs de edad', () => {
      cy.get('input.edad').should('have.length',5);
    });  

    it('genera inputs de sueldos ocultos', () => {
      cy.get('input.visually-hidden').should('have.length',5);
    });

  });

});



