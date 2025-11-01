const { faker } = require('@faker-js/faker');
import { BasePage } from '../../helpers/base.page';
import { AutomationExercisePage } from '../../helpers/automation-exercise.page';
import { UserModule } from '../modules/user.module';

const basePage = new BasePage();
const automationExercisePage = new AutomationExercisePage();

describe('Automation Exercise Test Suite', () => {
    beforeEach(() => {
        basePage.visitHomePage(); 
        cy.get(automationExercisePage.homePage).should('be.visible');
    });

    it('#1 register an user', () => {
        const randomUserName = faker.person.fullName();
        const randomUserEmail = faker.internet.email();
        const randomPass = faker.internet.password();

        cy.get(automationExercisePage.loginBtn).click(); 
        UserModule.registerUser(randomUserName, randomUserEmail, randomPass);
        basePage.deleteAccount();
    });

    it('#2 login user with correct email and password', () => {
        const userEmail = Cypress.env('USER_EMAIL');
        const userPass = Cypress.env('USER_PASSWORD');

        cy.get(automationExercisePage.loginBtn).should('be.visible').click();
        cy.get('[data-qa="login-email"]').type(userEmail);
        cy.get('[data-qa="login-password"]').type(userPass);
        cy.get('[data-qa="login-button"]').click();
        cy.contains(`Logged in as`).should('be.visible'); 
    });

    it('#3 login user with incorrect email and password', () => {
        cy.get('a[href="/login"]').should('be.visible').click(); 
        cy.get('[data-qa="login-email"]').type('aasksoksdoskf@gmail.com');
        cy.get('[data-qa="login-password"]').type('wrong-pass');
        cy.get('[data-qa="login-button"]').click();
        cy.contains('Your email or password is incorrect!').should('be.visible');
    });

    it('#4 logout user', () => {
        const userName = Cypress.env('USER_NAME');
        const userEmail = Cypress.env('USER_EMAIL');
        const userPass = Cypress.env('USER_PASSWORD');

        basePage.loginUser(userEmail, userPass);
        cy.contains(`Logged in as ${userName}`).should('be.visible');
        basePage.logoutUser();
        cy.get(automationExercisePage.homePage).should('be.visible');
    });

    it('#5 try to register an existent user', () => {
        basePage.visitHomePage();
        cy.get(automationExercisePage.loginBtn).click();
        cy.contains(automationExercisePage.newUserSignUpHeader).should('be.visible');
        const userName = Cypress.env('USER_NAME');
        const userEmail = Cypress.env('USER_EMAIL');
        cy.get(automationExercisePage.registerUserName).type(userName);
        cy.get(automationExercisePage.registerUserEmail).type(userEmail);
        cy.get(automationExercisePage.signUpBtn).click();
        cy.contains(automationExercisePage.emailAlreadyExistsHint).should('be.visible');
    });

    it('#6 validating contact us form', () => {
        basePage.visitHomePage();
        const randomName = faker.person.fullName();
        const randomEmail = faker.internet.email();
        const randomSubject = faker.lorem.sentence();
        const randomMessage = faker.lorem.paragraph();

        cy.get('a[href="/contact_us"]').click();
        cy.get('h2.title.text-center').should('be.visible');
        cy.get('[data-qa="name"]').type(randomName);
        cy.get('[data-qa="email"]').type(randomEmail);
        cy.get('[data-qa="subject"]').type(randomSubject);
        cy.get('[data-qa="message"]').type(randomMessage);

        cy.get('input[name="upload_file"]').attachFile('test-file.jpeg');

        cy.get('[data-qa="submit-button"]').click();
        cy.on('window:alert', (text) => {
            expect(text).to.equal('Success! Your details have been submitted successfully.');
        });
        cy.contains('Success! Your details have been submitted successfully.').should('be.visible');

        cy.get('a.btn.btn-success[href="/"]').click();

        cy.get(automationExercisePage.homePage).should('be.visible');
    });

    it('#8 verify products and products details page', () => {
        basePage.visitHomePage();
        cy.get('a[href="/products"]').click();
        cy.contains('All Products').should('be.visible');
        cy.get('.features_items').should('be.visible');
        cy.get('a[href="/product_details/1"]').click();

        cy.get('.product-information').should('be.visible');
        cy.get('.product-information h2').should('have.text', 'Blue Top');
        cy.get('.product-information p').contains('Category: Women > Tops').should('be.visible');
        cy.get('.product-information span span').should('have.text', 'Rs. 500');
        cy.get('.product-information p').contains('Availability: In Stock').should('be.visible');
        cy.get('.product-information p').contains('Condition: New').should('be.visible');
        cy.get('.product-information p').contains('Brand: Polo').should('be.visible');
    });

    it('#9 search product', () => {
        basePage.visitHomePage();
        cy.get('a[href="/products"]').click();
        cy.contains('All Products').should('be.visible');
        cy.get('#search_product').type('Blue Top');
        cy.get('#submit_search').click();
        cy.contains('Searched Products').should('be.visible');
        cy.get('.features_items').should('be.visible');
        cy.get('.features_items .productinfo').each(($el) => {
            cy.wrap($el).should('be.visible');
        });
    });

    it('#10 verify subscription in home page', () => {
        basePage.visitHomePage();
        const randomEmail = faker.internet.email();
    
        cy.scrollTo('bottom');

        cy.contains('h2', 'Subscription').should('be.visible');

        cy.get('#susbscribe_email').type(randomEmail);
        cy.get('#subscribe').click();
        cy.contains('You have been successfully subscribed!').should('be.visible');
    });

    it('#15 place order: register before checkout', () => {
        basePage.visitHomePage();
        const randomUserName = faker.person.fullName();
        const randomUserEmail = faker.internet.email();
        const randomPass = faker.internet.password();
        const cardName = faker.person.fullName();
        const cardNumber = faker.finance.creditCardNumber();
        const cardCVC = faker.finance.creditCardCVV();
        const cardExpMonth = '12';
        const cardExpYear = '2025';

        cy.get(automationExercisePage.loginBtn).click();

        cy.get(automationExercisePage.registerUserName).type(randomUserName);
        cy.get(automationExercisePage.registerUserEmail).type(randomUserEmail);
        cy.get(automationExercisePage.signUpBtn).click();
        cy.contains(automationExercisePage.enterAccountInfoHeader).should('be.visible');

        cy.get('#id_gender1').check();
        cy.get('[data-qa="password"]').type(randomPass);
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

        cy.contains(`Logged in as ${randomUserName}`).should('be.visible');

        cy.get('a[href="/products"]').click();
        cy.get('a[href="/product_details/1"]').click();
        cy.get('.product-information .btn.btn-default.cart').click();
        cy.get('p.text-center a[href="/view_cart"]').click();

        cy.contains('Shopping Cart').should('be.visible');
        cy.get('.btn.btn-default.check_out').click();
        cy.contains('Address Details').should('be.visible');
        cy.contains('Review Your Order').should('be.visible');

        cy.get('textarea[name="message"]').type('Please deliver between 9 AM and 5 PM.');
        cy.get('a[href="/payment"]').click();

        cy.get('[data-qa="name-on-card"]').type(cardName);
        cy.get('[data-qa="card-number"]').type(cardNumber);
        cy.get('[data-qa="cvc"]').type(cardCVC);
        cy.get('[data-qa="expiry-month"]').type(cardExpMonth);
        cy.get('[data-qa="expiry-year"]').type(cardExpYear);

        cy.get('[data-qa="pay-button"]').click();
        cy.contains('p', 'Congratulations! Your order has been confirmed!').should('be.visible');

        cy.get(automationExercisePage.deleteAccountBtn).click();
        cy.contains('Account Deleted!').should('be.visible');
        cy.get('[data-qa="continue-button"]').click();
    });
});