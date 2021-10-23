const { createYield, idText } = require("typescript")

describe('Logged in operations', () => {



    let makeName = 'New make';
    let modelName = 'New model';

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
    });

    it('Add model', () => {

        // Make sure we are on make list
        cy.get('[href="/make-list"]').click();

        // Finde new make
        cy.contains(makeName).click();

        cy.contains('Add new model').click();

        // Type new name
        cy.get('form input[name="name"]').clear();
        cy.get('form input[name="name"]').type(modelName);
        // Go back to list
        cy.get('[href="/make-list"]').click();

        // Wait for make list to be fetched from server
        cy.wait(4000);
        // Test if new make has been removed
        cy.contains(modelName).should('exist');
        cy.contains(makeName).click();
        cy.contains(modelName).should('exist');

    });

    it('Remove model', () => {

        // Make sure we are on make list
        cy.get('[href="/make-list"]').click();

        cy.contains(modelName).click();
        // Test if new make has been removed

        cy.contains('Delete').click();

        cy.contains(modelName).should('exist');
        // Go back to list
        cy.get('[href="/make-list"]').click();
        // Wait for make list to be fetched from server
        cy.wait(4000);

        cy.contains(modelName).should('not.exist');
    });

    
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

    it('Log out', () => {
        cy.contains('Log out').click();
        cy.contains('Log in').should('exist');
    });
})


describe('Logged out operations', ()=>{

    it('Add make and edit disabled', () => {

        cy.visit('/');
        
        cy.contains('Add new make').should('not.exist');
        cy.contains('TestMake').click();
        cy.wait(4000);
        cy.contains('Delete').should('not.exist');
        cy.contains('Edit').should('not.exist');
    });

    it('Add model and edit disabled', () => {
        cy.visit('/');
        cy.contains('TestMake').click();
        cy.wait(4000);
        cy.contains('Add new model').should('not.exist');

        cy.contains('Test Model').click();
        cy.wait(4000);
        cy.contains('Delete').should('not.exist');
        cy.contains('Edit').should('not.exist');
    });
});