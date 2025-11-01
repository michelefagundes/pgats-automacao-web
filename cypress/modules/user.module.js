const { faker } = require('@faker-js/faker');

export const UserModule = {
    registerUser(userName = faker.person.fullName(), userEmail = faker.internet.email(), password = faker.internet.password()) {
        cy.get('[data-qa="signup-name"]').type(userName);
        cy.get('[data-qa="signup-email"]').type(userEmail);
        cy.get('[data-qa="signup-button"]').click();
        cy.contains('Enter Account Information').should('be.visible');

        cy.get('#id_gender1').check();
        cy.get('[data-qa="password"]').type(password);
        cy.get('[data-qa="days"]').select('10');
        cy.get('[data-qa="months"]').select('May');
        cy.get('[data-qa="years"]').select('1990');
        cy.get('[data-qa="first_name"]').type('QA');
        cy.get('[data-qa="last_name"]').type('PGATS - Test');
        cy.get('[data-qa="address"]').type(faker.location.streetAddress());
        cy.get('[data-qa="state"]').type(faker.location.state());
        cy.get('[data-qa="city"]').type(faker.location.city());
        cy.get('[data-qa="zipcode"]').type(faker.location.zipCode());
        cy.get('[data-qa="mobile_number"]').type(faker.phone.number());
        cy.get('[data-qa="create-account"]').click();

        cy.contains('Account Created!').should('be.visible');
        cy.get('[data-qa="continue-button"]').click();
        cy.contains(`Logged in as ${userName}`).should('be.visible');
    }
};
