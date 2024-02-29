import { faker } from '@faker-js/faker';

describe.only('Resumo - Casos de teste', () => {
  const loginData = {
    email: 'pedronieto.2005+23@gmail.com',
    password: 'Abc123456',
  };

  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.login(loginData);
    cy.get(':nth-child(11) > #TDD-menu-store').click();
  });

  it('Adição de uma receita', () => {
    cy.get(':nth-child(1) > .card > .card-body > .btn').click();
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

    cy.get('.modal-footer > .d-flex > :nth-child(2) > .btn').click().wait(1000);
    cy.contains('div', 'Receita salva com sucesso!').should('be.visible');
  });

  it('Edição de uma receita', () => {
    cy.get('.positive > .d-flex > :nth-child(3)').click();
    cy.get(':nth-child(7) > easy-typeahead > #typeahead-focus')
      .type('Retorno')
      .type('{enter}');
    cy.get('.modal-footer > .d-flex > :nth-child(2) > .btn').click();
    cy.contains('div', 'Receita salva com sucesso!').should('be.visible');
  });

  it('Validação dos valores do card de receitas', () => {
    cy.get(':nth-child(1) > .card > .card-body > h2.card-title').should(
      'have.text',
      'Receitas do Mês'
    );
    cy.get(':nth-child(1) > .card > .card-body > .card-text').should(
      'have.text',
      'R$ 50,00 '
    );
  });

  it('Exclusão de uma receita', () => {
    cy.get(':nth-child(2) > .positive > .d-flex > .flex-grow-1')
      .should('have.text', ' R$ 50,00 ')
      .click();
    cy.get('.me-4 > .btn').click();
    cy.get(
      'app-confirmation > .modal-footer > .d-flex > :nth-child(2) > .btn'
    ).click();
  });

  it('Adição de uma despesa', () => {
    cy.get(':nth-child(2) > .card > .card-body > .btn').click();
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
    cy.contains('div', 'Despesa salva com sucesso!').should('be.visible');
  });

  it('Edição de uma despesa', () => {
    cy.get('.negative > .d-flex > :nth-child(3)').click();
    cy.get(':nth-child(7) > easy-typeahead > #typeahead-focus')
      .type('Retorno')
      .type('{enter}');
    cy.get('.modal-footer > .d-flex > :nth-child(2) > .btn').click().wait(1000);
    cy.contains('div', 'Despesa salva com sucesso!').should('be.visible');
  });

  it('Validação dos valores do card de despesas', () => {
    cy.get(':nth-child(2) > .card > .card-body > h2.card-title').should(
      'have.text',
      'Despesas do Mês'
    );
    cy.get(':nth-child(2) > .card > .card-body > .card-text').should(
      'have.text',
      'R$ 50,00 '
    );
  });

  it("Troca do modo de visão dos cars de 'Mês' para 'Ano'", () => {
    cy.get('[for="opt2"]').click();
    cy.get(':nth-child(1) > .card > .card-body > h2.card-title').should(
      'have.text',
      'Receitas do Ano'
    );
    cy.get(':nth-child(2) > .card > .card-body > h2.card-title').should(
      'have.text',
      'Despesas do Ano'
    );
  });

  it('Exclusão de uma despesa', () => {
    cy.get(':nth-child(2) > .negative > .d-flex > .flex-grow-1')
      .should('have.text', ' R$ 50,00 ')
      .click();
    cy.get('.me-4 > .btn').click();
    cy.get(
      'app-confirmation > .modal-footer > .d-flex > :nth-child(2) > .btn'
    ).click();
  });

  it('Edição/Exclusão de uma meta', () => {
    cy.get('.justify-content-between > :nth-child(2) > .btn').click();
    cy.get('#valueMonth').clear();
    cy.get('#valueYear').clear();
    cy.get('.modal-footer > :nth-child(2) > .btn').click();
  });

  it('Criação de uma meta', () => {
    cy.get('.progress-text').click();
    cy.get('#valueMonth').clear().type('100000');
    cy.get('#valueYear').clear().type('1200000');
    cy.get('.modal-footer > :nth-child(2) > .btn').click();
  });

  it('Ativação de todas as opções do gráfico', () => {
    cy.get('#expense').click();
    cy.get('#incoming').click();
  });

  it('Validação do preview da impressão', () => {
    cy.get(
      'app-sub-header-actions-financial > .d-flex > div > .btn-outline-primary'
    ).click();
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
      cy.get('@windowOpen').should('be.calledOnce');
    });
  });
});

describe('Resumo - Validação de campos', () => {
  const loginData = {
    email: 'pedronieto.2005+23@gmail.com',
    password: 'Abc123456',
  };

  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.login(loginData);
    cy.get(':nth-child(11) > #TDD-menu-store').click();
  });

  it('Validação de campos obrigatórios', () => {
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
