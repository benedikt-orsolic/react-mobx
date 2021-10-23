const { createYield } = require("typescript")

describe('Log in operations', () => {



    let makeName = 'New make';

    it('Log in', () => {
        cy.visit('/login');
        cy.get(':nth-child(1) > input').type('ben.edikt.orsolic@gmail.com');
        cy.get(':nth-child(2) > input').type('1waFcD6i');
        cy.get('[type="submit"]').click();

        // Cypress firefox doesn't redirect after login whilest regular firefox does.
        cy.get(':nth-child(1) > a').click();
    });

    it('Add make', () => {

        // Click add new make
        cy.get('[href="/make/edit/undefined"]').click();
        // Type new name
        cy.get('form input[name="name"]').clear();
        cy.get('form input[name="name"]').type(makeName);

        // Go back to list
        cy.get('[href="/make-list"]').click();
        
        // Wait for make list to be fetched from server
        cy.wait(4000);
        // Test if new make has been removed
        cy.contains(makeName).should('exist');
    })

    it('Remove make', () => {

        // Make sure we are on make list
        cy.get('[href="/make-list"]').click();

        // Finde new make
        cy.contains(makeName).click();
        // Delete new make
        cy.get('input[type="submit"').click();
        
        // Wait for make list to be fetched from server
        cy.wait(4000);
        // Test if new make has been removed
        cy.contains(makeName).should('not.exist');
    });
})