/// <reference types="cypress"/>

beforeEach(() => {
    cy.visit('localhost:3000')
    cy.get('[name=name]').as('name')
    cy.get('[name=ingredients]').as('ingredients')
    cy.get('[name=description]').as('description')
    cy.get('[name=price]').as('price')
    cy.contains('ENVIAR').as('send')
})
describe('testing pizza app', () => {
    it('typing some elements', () => {
        cy.get('@name').type('Muza')
        cy.get('@ingredients').type('muzarrella, salsa de tomate, masa de pizza')
        cy.get('@description').type('Especialidad de la casa')
        cy.get('@price').type('300')
        cy.get('@send').click()
        cy.contains('X').click()
    })
})