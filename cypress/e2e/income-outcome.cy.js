import { faker } from '@faker-js/faker';

describe('Income and Outcome', () => {
  const loginData = {
    email: 'pedronieto.2005+23@gmail.com',
    password: 'Abc123456',
  };

  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.login(loginData);
    cy.get(':nth-child(11) > #TDD-menu-store').click();
    cy.get(':nth-child(2) > .nav-link').click();
  });

  it('Should create a income/outcome', () => {
    cy.get('.d-flex > .btn-primary').click();
    cy.get('.modal-footer > :nth-child(2) > .btn').click();
    cy.get('.input-group-text').click();
    cy.get('.ngb-dp-today > .btn-light').click();
    cy.get('#expenseName').type('Consulta');
    cy.get('#categorySearch').type('Consultas');
    cy.get('.w-100 > #typeahead-focus').click();
    cy.get('ngb-highlight').click();
    cy.get(':nth-child(7) > easy-typeahead > #typeahead-focus')
      .type('Consulta')
      .type('{enter}');
    cy.get('#valueExpense').type('5000');
    cy.get('#radio1').click();
    cy.get(':nth-child(2) > .row > :nth-child(3) > .form-control').type('0');
    cy.get(
      '.d-flex > .ng-select-container > .ng-value-container > .ng-input'
    ).click();
    cy.get('.d-flex > .ng-select-container').type('Pix').type('{enter}');
    cy.get(
      ':nth-child(3) > :nth-child(1) > :nth-child(1) > .form-control'
    ).type(faker.finance.accountNumber());
    cy.get(
      ':nth-child(3) > :nth-child(1) > :nth-child(2) > .form-control'
    ).type(faker.string.numeric({ length: 9 }));
    cy.get(':nth-child(1) > div.d-flex > .mb-3 > input').selectFile(
      'cypress/fixtures/img1.png',
      { force: true }
    );
    cy.get('.modal-footer > .d-flex > :nth-child(2) > .btn').click();
    cy.contains('div', 'Receita salva com sucesso!').should('be.visible');
  });

  it('Should edit a income/outcome', () => {
    cy.get(':nth-child(6) > .btn').click();
    cy.get('#expenseName').clear().type('Consulta 02');
    cy.get('.modal-footer > .d-flex > :nth-child(2) > .btn').click();
    cy.wait(1000);
    cy.contains('div', 'Receita salva com sucesso!').should('be.visible');
  });

  it('Should validate the graph income value', () => {
    cy.get('[for="optDoghnut1"]').click();
    cy.contains('div > div > span', 'R$ 50,00').should('be.visible');
    cy.contains('div > div > div', ' R$ 50,00 ').should('be.visible');
  });

  it('Should validate the graph income value', () => {
    cy.get('[for="optDoghnut1"]').click();
    cy.contains('div > div > span', 'R$ 50,00').should('be.visible');
    cy.contains('div > div > div', ' R$ 50,00 ').should('be.visible');
  });

  it('Shoud validate the balancete download', () => {
    cy.get('.d-flex > .btn-outline-primary').click();
    cy.task('listFiles', 'cypress/downloads').then((files) => {
      const downloadedFileName = files[0];
      const filePath = `cypress/downloads/${downloadedFileName}`;

      cy.task('fileExists', filePath).then((fileExists) => {
        expect(fileExists).to.be.true;
      });
    });
  });

  it('Should use the search bar to search a specific income/outcome', () => {
    cy.get('.input-group > .form-control').type('Consulta');
    cy.get('tbody > :nth-child(2) > :nth-child(1)').should(
      'have.text',
      'Consulta 02'
    );
  });

  it('Should remove a income/outcome', () => {
    cy.get(':nth-child(6) > .btn').click();
    cy.get('.me-4 > .btn').click();
    cy.get('app-confirmation').should('be.visible');
    cy.get('.d-flex > h2').should(
      'have.text',
      'Deseja realmente excluir esta transação?'
    );
    cy.get(
      'app-confirmation > .modal-footer > .d-flex > :nth-child(2) > .btn'
    ).click();
  });
});
