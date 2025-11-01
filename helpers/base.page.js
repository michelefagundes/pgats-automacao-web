export class BasePage {
    visitHomePage() {
        cy.visit('/');
        cy.get('body').should('be.visible');  
    }

    loginUser(userEmail, password) {
        cy.get('a[href="/login"]').should('be.visible').click(); 
        cy.get('[data-qa="login-email"]').type(userEmail);
        cy.get('[data-qa="login-password"]').type(password);
        cy.get('[data-qa="login-button"]').click();
    }

    logoutUser() {
        cy.get('a[href="/logout"]').should('be.visible').click(); 
        cy.get('a[href="/"]').should('be.visible');
    }

    deleteAccount() {
        cy.get('a[href="/delete_account"]').should('be.visible').click(); 
        cy.contains('Account Deleted!').should('be.visible');
        cy.get('[data-qa="continue-button"]').click();
    }
}
