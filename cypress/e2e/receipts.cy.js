import { faker } from '@faker-js/faker';

describe('Receipts: Generate receipts - Success test cases', () => {
  const loginData = {
    email: 'pedronieto.2005+23@gmail.com',
    password: 'Abc123456',
  };

  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.login(loginData);
    cy.get(':nth-child(11) > #TDD-menu-store').click();
    cy.get(':nth-child(10) > .nav-link').click();
    cy.get(':nth-child(11) > .d-flex > .nav-link').click();
  });

  it('Should generate a receipt', () => {
    cy.get('#typeahead-focus').type('Pedro Nieto');
    cy.get(':nth-child(5) > .input-group > .form-control').type(
      'Suporte para ampolas'
    );
    cy.get('#receivedValue').type('11999');
    cy.get(':nth-child(3) > .input-group > .form-control').type('11099777941');
    cy.get(':nth-child(6) > .input-group > .form-control').type('Palhoça');
    cy.get(':nth-child(4) > .input-group > .form-control').type(
      faker.string.numeric({ length: 12 })
    );
    cy.get(':nth-child(10) > .input-group > .form-control').type('11099777941');
    cy.get('#radio2').click();
    cy.get('#_0').click();
    cy.get('financial-receipt > :nth-child(2) > .d-flex').click();
  });
});

describe('Receipts: Generate receipts - Fail test cases', () => {
  const loginData = {
    email: 'pedronieto.2005+23@gmail.com',
    password: 'Abc123456',
  };

  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.login(loginData);
    cy.get(':nth-child(11) > #TDD-menu-store').click();
    cy.get(':nth-child(10) > .nav-link').click();
    cy.get(':nth-child(11) > .d-flex > .nav-link').click();
  });

  it('Should not allow a receipt to be generated whiel the required fields are not filled in', () => {
    cy.get(':nth-child(5) > .input-group > .form-control').click();
    cy.get('#receivedValue').click();
    cy.get(':nth-child(3) > .input-group > .form-control').click();
    cy.get(':nth-child(6) > .input-group > .form-control').click();
    cy.get(':nth-child(10) > .input-group > .form-control').click();
    cy.get('#radio2').click();
    cy.get('#_0').click();

    cy.get(':nth-child(5) > form-error > :nth-child(1) > div').should(
      'have.text',
      ' Campo Obrigatório '
    );
    cy.get('.col-xl-2 > form-error > :nth-child(1) > div').should(
      'have.text',
      ' Campo Obrigatório '
    );
    cy.get(':nth-child(3) > form-error > :nth-child(1) > div').should(
      'have.text',
      ' Campo Obrigatório '
    );
    cy.get(':nth-child(6) > form-error > :nth-child(1) > div').should(
      'have.text',
      ' Campo Obrigatório '
    );
    cy.get(':nth-child(10) > form-error > :nth-child(1) > div').should(
      'have.text',
      ' Campo Obrigatório '
    );
  });
});

describe('Receipts: History', () => {
  const loginData = {
    email: 'pedronieto.2005+23@gmail.com',
    password: 'Abc123456',
  };

  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.login(loginData);
    cy.get(':nth-child(11) > #TDD-menu-store').click();
    cy.get(':nth-child(10) > .nav-link').click();
    cy.get(':nth-child(12) > .d-flex > .nav-link').click();
  });

  it('Should create a receipt', () => {
    cy.get(':nth-child(10) > .nav-link').click();
    cy.get(':nth-child(11) > .d-flex > .nav-link').click();

    cy.get('#typeahead-focus').type('Pedro Nieto');
    cy.get(':nth-child(5) > .input-group > .form-control').type(
      'Suporte para ampolas'
    );
    cy.get('#receivedValue').type('11999');
    cy.get(':nth-child(3) > .input-group > .form-control').type('11099777941');
    cy.get(':nth-child(6) > .input-group > .form-control').type('Palhoça');
    cy.get(':nth-child(4) > .input-group > .form-control').type(
      faker.string.numeric({ length: 12 })
    );
    cy.get(':nth-child(10) > .input-group > .form-control').type('11099777941');
    cy.get('#radio2').click();
    cy.get('#_0').click();
    cy.get(':nth-child(2) > .d-flex > .btn').click();
  });

  it('Should visualize the receipt', () => {
    cy.get(':nth-child(6) > .d-flex > :nth-child(2) > .btn').click();
  });

  it('Should order and search a receipt', () => {
    cy.get('.ng-select-container').click();
    cy.contains('div.ng-options > span', 'Pagador').click();
    cy.get('.input-group > .form-control').type('Pedro Nieto');
    cy.get('tbody > :nth-child(2) > :nth-child(1)').should(
      'have.text',
      'Pedro Nieto'
    );
  });

  it('Should filter the receipt time period', () => {
    cy.get(
      ':nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(1) > .form-control'
    ).click();
    cy.get(
      '[aria-label="sexta-feira, 26 de janeiro de 2024"] > .custom-day'
    ).click();
    cy.get(
      '[aria-label="sábado, 27 de janeiro de 2024"] > .custom-day'
    ).click();
  });

  it('Should delete the receipt', () => {
    cy.get('.d-flex > :nth-child(1) > .btn').click();

    cy.get('app-confirmation').should('be.visible');
    cy.get('.d-flex > h2').should(
      'have.text',
      'Deseja realmente excluir este recibo?'
    );
    cy.get('.modal-footer > .d-flex > :nth-child(2) > .btn').click();
  });
});
