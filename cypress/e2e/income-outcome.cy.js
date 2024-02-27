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

  it('⚡ Should populate the incomes and outcomes', () => {
    cy.get('.d-flex > .btn-primary').click();
    cy.get('.modal-footer > :nth-child(2) > .btn').click();
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

  it.skip('Should validate the graph income value', () => {
    //todo add canvas validation
  });

  it.skip('Should validate the graph outcome value', () => {
    cy.get('[for="optDoghnut2"]').click();
    //todo add canvas validation
  });

  it.skip('Shoud validate the balancete download', () => {
    cy.get('.d-flex > .btn-outline-primary').click();
    //todo add download validation
    const hoje = new Date();
    const diaAtual = hoje.getDate();
    const mesAtual = hoje.getMonth() + 1;
    const anoAtual = hoje.getFullYear();

    const umMesAtras = new Date();
    umMesAtras.setMonth(umMesAtras.getMonth() - 1);
    const diaMesAtras = umMesAtras.getDate();
    const mesMesAtras = umMesAtras.getMonth() + 1;
    const anoMesAtras = umMesAtras.getFullYear();

    const dataAtualFormatada = `${diaAtual}-${
      mesAtual < 10 ? '0' : ''
    }${mesAtual}-${anoAtual}`;
    const dataMesAtrasFormatada = `${diaMesAtras}-${
      mesMesAtras < 10 ? '0' : ''
    }${mesMesAtras}-${anoMesAtras}`;

    cy.readFile(
      `cypress/downloads/Balanço ${dataAtualFormatada} à ${dataMesAtrasFormatada}.xlsx`
    );
  });

  it('Should use the search bar to search a specific income/outcome', () => {
    cy.get('.input-group > .form-control').type('Consulta');
    cy.get('tbody > :nth-child(2) > :nth-child(1)').should(
      'have.text',
      'Consulta'
    );
  });

  it('⚡ Should remove the populated data', () => {
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
