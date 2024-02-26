Cypress.Commands.add('login', ({ email, password }) => {
  cy.visit('/login');
  cy.get('#TDD-LOGIN-username').type(email);
  cy.get('#TDD-LOGIN-password').type(password);
  cy.get('#TDD-login-submit').click();
});
