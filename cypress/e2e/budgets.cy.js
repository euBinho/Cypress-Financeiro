describe('Budgets - Success test cases', () => {
  const loginData = {
    email: 'pedronieto.2005+23@gmail.com',
    password: 'Abc123456',
  };

  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.login(loginData);
    cy.get(':nth-child(11) > #TDD-menu-store').click();
    cy.get(':nth-child(9) > .nav-link').click();
  });

  it('Should create a budget', () => {
    cy.get('.ml-auto > .d-flex > div > .btn').click();
    cy.get(':nth-child(3) > .col-12 > .form-control').type(
      'Caixa para pílulas'
    );
    cy.get(':nth-child(4) > .col-12 > .form-control').type(
      'Nova caixa de pílulas para presentear pacientes'
    );
    cy.get(':nth-child(5) > .col-12 > .form-control').type('13999');
    cy.get(':nth-child(6) > .col-12 > .form-control').type('6 meses');
    cy.get('.modal-footer > :nth-child(2) > .btn').click();

    cy.get('.toast-body')
      .should('be.visible')
      .should('have.text', 'Produto/Serviço cadastrado com sucesso!');
  });

  it('Should edit a budget', () => {
    cy.get(':nth-child(5) > .d-flex > :nth-child(2) > .btn').click();

    cy.get(':nth-child(3) > .col-12 > .form-control')
      .clear()
      .type('Suporte para ampolas');
    cy.get(':nth-child(4) > .col-12 > .form-control')
      .clear()
      .type('Suporte para ampolas do laboratório');
    cy.get(':nth-child(5) > .col-12 > .form-control').clear().type('17999');
    cy.get(':nth-child(6) > .col-12 > .form-control').clear().type('12 meses');
    cy.get('.modal-footer > :nth-child(2) > .btn').click();

    cy.get('.toast-body')
      .should('be.visible')
      .should('have.text', 'Produto/Serviço cadastrado com sucesso!');
  });

  it('Should search for a budget', () => {
    cy.get('.form-control').type('Suporte para ampolas');
    cy.get('tbody > tr > :nth-child(1)').should(
      'have.text',
      'Suporte para ampolas'
    );
  });

  it('Should delete a budget', () => {
    cy.get(':nth-child(5) > .d-flex > :nth-child(1) > .btn').click();

    cy.get('app-confirmation').should('be.visible');
    cy.get('.d-flex > h2').should(
      'have.text',
      'Deseja realmente excluir este produto/serviço?'
    );
    cy.get('.modal-footer > .d-flex > :nth-child(2) > .btn').click();

    cy.get('.toast-body')
      .should('be.visible')
      .should('have.text', 'Produto/Serviço excluído com sucesso!');
  });
});

describe('Budgets - Fail test cases', () => {
  const loginData = {
    email: 'pedronieto.2005+23@gmail.com',
    password: 'Abc123456',
  };

  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.login(loginData);
    cy.get(':nth-child(11) > #TDD-menu-store').click();
    cy.get(':nth-child(9) > .nav-link').click();
  });

  it('Should not allow to create a budget while the required fields are not filled in', () => {
    cy.get('.ml-auto > .d-flex > div > .btn').click();
    cy.get('.modal-footer > :nth-child(2) > .btn').click();

    cy.get(':nth-child(3) > .col-12 > form-error > :nth-child(1) > div').should(
      'have.text',
      ' Campo Obrigatório '
    );
    cy.get(':nth-child(4) > .col-12 > form-error > :nth-child(1) > div').should(
      'have.text',
      ' Campo Obrigatório '
    );
    cy.get(':nth-child(5) > .col-12 > form-error > :nth-child(1) > div').should(
      'have.text',
      ' Campo Obrigatório '
    );
    cy.get(':nth-child(6) > .col-12 > form-error > :nth-child(1) > div').should(
      'have.text',
      ' Campo Obrigatório '
    );

    cy.get('.toast-body')
      .should('be.visible')
      .should('have.text', 'Preencha os campos antes de continuar!');
  });
});
