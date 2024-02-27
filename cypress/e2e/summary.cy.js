import { faker } from '@faker-js/faker';

describe('Summary - Success test cases ', () => {
  const loginData = {
    email: 'pedronieto.2005+23@gmail.com',
    password: 'Abc123456',
  };

  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.login(loginData);
    cy.get(':nth-child(11) > #TDD-menu-store').click();
  });

  it('Should add a new income', () => {
    cy.get(':nth-child(1) > .card > .card-body > .btn').click();
    cy.get('.input-group-text').click();
    cy.get('.ngb-dp-today > .btn-light').click();
    cy.get('#expenseName').type('Consulta');
    cy.get('#categorySearch').type('Consultas');
    cy.get('.w-100 > #typeahead-focus').click();
    cy.get('ngb-highlight').click();
    cy.get('#valueExpense').type('5000');
    cy.get('#radio1').click();
    cy.get(':nth-child(2) > .row > :nth-child(3) > .form-control').type('0');
    cy.get(
      '.d-flex > .ng-select-container > .ng-value-container > .ng-input'
    ).click();
    //todo select payment method
    cy.get(
      ':nth-child(3) > :nth-child(1) > :nth-child(1) > .form-control'
    ).type(faker.finance.accountNumber());
    cy.get(
      ':nth-child(3) > :nth-child(1) > :nth-child(2) > .form-control'
    ).type(faker.string.numeric({ length: 9 }));
    //todo select file for image
    //todo select file for attachment

    cy.get('.modal-footer > .d-flex > :nth-child(2) > .btn').click();
    cy.get('.toast-body').should('be.visible');
    cy.get('.toast-body').should('have.text', 'Receita salva com sucesso!');
  });

  it('Should validate the income card value', () => {
    cy.get(':nth-child(1) > .card > .card-body > .card-text').should(
      'have.text',
      'R$ 50,00 '
    );
  });

  it('Should delete an income', () => {
    cy.get(':nth-child(2) > .positive > .d-flex > .flex-grow-1')
      .should('have.text', ' R$ 50,00 ')
      .click();
    cy.get('.me-4 > .btn').click();
    cy.get(
      'app-confirmation > .modal-footer > .d-flex > :nth-child(2) > .btn'
    ).click();
  });

  it('Should add a new outcome', () => {
    cy.get(':nth-child(2) > .card > .card-body > .btn').click();
    cy.get('.input-group-text').click();
    cy.get('.ngb-dp-today > .btn-light').click();
    cy.get('#expenseName').type('Consulta');
    cy.get('#categorySearch').type('Consultas');
    cy.get('.w-100 > #typeahead-focus').click();
    cy.get('ngb-highlight').click();
    cy.get('#valueExpense').type('5000');
    cy.get('#radio1').click();
    cy.get(':nth-child(2) > .row > :nth-child(3) > .form-control').type('0');
    cy.get(
      '.d-flex > .ng-select-container > .ng-value-container > .ng-input'
    ).click();
    cy.get(
      ':nth-child(3) > :nth-child(1) > :nth-child(1) > .form-control'
    ).type(faker.finance.accountNumber());
    cy.get(
      ':nth-child(3) > :nth-child(1) > :nth-child(2) > .form-control'
    ).type(faker.string.numeric({ length: 9 }));
    cy.get('.modal-footer > .d-flex > :nth-child(2) > .btn').click();
    cy.get('.toast-body').should('be.visible');
    cy.get('.toast-body').should('have.text', 'Despesa salva com sucesso!');
  });

  it('Should validate the outcome card value', () => {
    cy.get(':nth-child(2) > .card > .card-body > .card-text').should(
      'have.text',
      'R$ 50,00 '
    );
  });

  it('Should delete an outcome', () => {
    cy.get(':nth-child(2) > .negative > .d-flex > .flex-grow-1')
      .should('have.text', ' R$ 50,00 ')
      .click();
    cy.get('.me-4 > .btn').click();
    cy.get(
      'app-confirmation > .modal-footer > .d-flex > :nth-child(2) > .btn'
    ).click();
  });

  it('Should edit/clear a goal', () => {
    cy.get('.justify-content-between > :nth-child(2) > .btn').click();
    cy.get('#valueMonth').clear();
    cy.get('#valueYear').clear();
    cy.get('.modal-footer > :nth-child(2) > .btn').click();
  });

  it('Should create a goal', () => {
    cy.get('.progress-text').click();
    cy.get('#valueMonth').clear().type('100000');
    cy.get('#valueYear').clear().type('1200000');
    cy.get('.modal-footer > :nth-child(2) > .btn').click();
  });

  it('Should enable all options on the graphic', () => {
    cy.get('#expense').click();
    cy.get('#incoming').click();
  });

  it.skip('Should open the print preview of the financial information', () => {
    cy.get(
      'app-sub-header-actions-financial > .d-flex > div > .btn-outline-primary'
    ).click();
  });
});

describe('Summary - Fail test cases ', () => {
  const loginData = {
    email: 'pedronieto.2005+23@gmail.com',
    password: 'Abc123456',
  };

  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.login(loginData);
    cy.get(':nth-child(11) > #TDD-menu-store').click();
  });

  it("Should not allow to create a new income while the required fields aren't filled in", () => {
    cy.get('.d-flex > div > .btn-primary').click();
    cy.get('.modal-footer > :nth-child(2) > .btn').click();
    cy.get('.modal-footer > .d-flex > :nth-child(2) > .btn').click();
    cy.get(':nth-child(3) > form-error > :nth-child(1) > div').should(
      'have.text',
      ' Campo Obrigatório '
    );
    cy.get(':nth-child(4) > form-error > :nth-child(1) > div').should(
      'have.text',
      ' Campo Obrigatório '
    );
    cy.get(
      ':nth-child(2) > .row > :nth-child(1) > form-error > :nth-child(1) > div'
    ).should('have.text', ' Campo Obrigatório ');
    cy.get(
      ':nth-child(3) > :nth-child(1) > :nth-child(1) > form-error > :nth-child(1) > div'
    ).should('have.text', ' Campo Obrigatório ');
  });
});
