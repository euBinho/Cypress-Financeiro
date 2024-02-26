describe('Edit Category - Success test cases', () => {
  const loginData = {
    email: 'pedronieto.2005+23@gmail.com',
    password: 'Abc123456',
  };

  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.login(loginData);
    cy.get(':nth-child(11) > #TDD-menu-store').click();
    cy.get(':nth-child(8) > .nav-link').click();
  });

  it('Should create a new category', () => {
    cy.get('.ml-auto > .btn').click();
    cy.get('#categorySearch').type('Retornos');
    cy.get('.col-1 > .color-picker').click();
    cy.get(':nth-child(5) > .d-flex > .color').click();
    cy.get('.modal-footer > :nth-child(2) > .btn').click();

    cy.get('.toast-body').should('be.visible');
    cy.get('.toast-body').should(
      'have.text',
      'Categoria cadastrada com sucesso!'
    );
  });

  it('Should edit a new category', () => {
    cy.get(
      ':nth-child(3) > :nth-child(3) > .d-flex > :nth-child(2) > .btn'
    ).click();

    cy.get('app-confirmation').should('be.visible');
    cy.get('.d-flex > h2').should(
      'have.text',
      'Todas as Receitas e Despesas que estão nessa categoria serão alteradas para esta nova categoria. Realmente deseja fazer essa mudança?'
    );
    cy.get('.modal-footer > .d-flex > :nth-child(2) > .btn').click();

    cy.get('#categorySearch').clear().type('Retornos clínicos');
    cy.get('.col-1 > .color-picker').click();
    cy.get(':nth-child(6) > .d-flex > .color').click();
    cy.get('.modal-footer > :nth-child(2) > .btn').click();

    cy.get('.toast-body').should('be.visible');
    cy.get('.toast-body').should(
      'have.text',
      'Categoria atualizada com sucesso!'
    );
  });

  it('Should delete a category', () => {
    cy.get(
      ':nth-child(3) > :nth-child(3) > .d-flex > :nth-child(1) > .btn'
    ).click();
    cy.get('app-confirmation').should('be.visible');
    cy.get('.d-flex > h2').should(
      'have.text',
      'Deseja realmente excluir esta categoria?'
    );
    cy.get('.modal-footer > .d-flex > :nth-child(2) > .btn').click();

    cy.get('.toast-body').should('be.visible');
    cy.get('.toast-body').should(
      'have.text',
      'Categoria excluída com sucesso!'
    );
  });

  it('Should search for a category', () => {
    cy.get('.input-group > .form-control').type('Assinatura');
    cy.get('tbody > tr > :nth-child(2)').should(
      'have.text',
      'Assinatura Easy Health PRO (Automático)'
    );
  });
});

describe('Edit Category - Success test cases', () => {
  const loginData = {
    email: 'pedronieto.2005+23@gmail.com',
    password: 'Abc123456',
  };

  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.login(loginData);
    cy.get(':nth-child(11) > #TDD-menu-store').click();
    cy.get(':nth-child(8) > .nav-link').click();
  });

  it('Should not allow to create a category while the input is not filled in', () => {
    cy.get('.ml-auto > .btn').click();
    cy.get('.modal-footer > :nth-child(2) > .btn').click();
    cy.get('form-error > :nth-child(1) > div').should(
      'have.text',
      ' Campo Obrigatório '
    );
    cy.get('.toast-body')
      .should('be.visible')
      .should('have.text', 'Preencha os campos antes de continuar!');
  });
});
