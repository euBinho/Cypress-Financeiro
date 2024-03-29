describe('Editar categorias - Casos de teste', () => {
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


  it('Valida se o título aparece na tela', () => {
    cy.contains('h1', 'Editar Categorias').should('be.visible');
    cy.contains('h4', 'Edite abaixo as categorias que serão usadas na criação e separação de Receitas e Despesas.').should('be.visible');
    cy.contains('h2 > a', 'Editar Categorias').should('be.visible');
  });

  it.only('Adição de uma categoria', () => {
    cy.get('.ml-auto > .btn').click();

    cy.contains('div > h2', 'Nova Categoria').should('be.visible');
    cy.contains('div > label', 'Categoria e Cor de Identificação').should('be.visible');
    cy.contains('div > button', 'Cancelar').should('be.visible');
    cy.contains('div > button', 'Salvar').should('be.visible');

    cy.get('#categorySearch').should('have.text', '').type('Retornos');
    cy.get('.col-1 > .color-picker').click();
    cy.get(':nth-child(5) > .d-flex > .color').click();
    cy.contains('div > button', 'Salvar').click();

    cy.contains('div', 'Categoria cadastrada com sucesso!').should(
      'be.visible'
    );

    cy.contains('button', 'Adicionar').click();
    cy.contains('div > h2', 'Nova Transação').should('be.visible');
    cy.contains('div > h4', 'Escolha qual tipo de transação você deseja adicionar.').should('be.visible');
    cy.contains('div > button', 'Adicionar Receita').should('be.visible').click();

  });




  // it.only('Valida obrigatoriedade dos campos', () => {
  //   cy.contains('button', 'Adicionar').click();
  //   cy.contains('div > h2', 'Nova Transação').should('be.visible');
  //   cy.contains('div > h4', 'Escolha qual tipo de transação você deseja adicionar.').should('be.visible');
  //   cy.contains('div > button', 'Adicionar Receita').should('be.visible').click().wait(2000);
  //   cy.get('.modal-footer > .d-flex > :nth-child(2) > .btn').click();
  //   cy.contains('label', 'Conta*').should('be.visible')
  //     .siblings('input').should('have.value', '')
  //     .siblings()
  //     .eq(1)
  //     .find('div:contains(" Campo Obrigatório ")')
  //     .should('be.visible')
  //   cy.get('#valueExpense').should('have.value', '').and('have.attr', 'placeholder', 'R$')
  // });




  it('Adição de categoria já existente', () => {
    cy.get('.ml-auto > .btn').click();

    cy.contains('div > h2', 'Nova Categoria').should('be.visible');
    cy.contains('div > label', 'Categoria e Cor de Identificação').should('be.visible');
    cy.contains('div > button', 'Cancelar').should('be.visible');
    cy.contains('div > button', 'Salvar').should('be.visible');

    cy.get('#categorySearch').should('have.text', '').type('Retornos');
    cy.get('.col-1 > .color-picker').click();
    cy.get(':nth-child(5) > .d-flex > .color').click();
    cy.contains('div > button', 'Salvar').click();

    cy.contains('div', 'Já existe uma categoria com esse nome').should(
      'be.visible'
    );
  });

  it('Edição de uma categoria', () => {
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

    cy.contains('div', 'Categoria atualizada com sucesso!').should(
      'be.visible'
    );
  });

  it('Exclusão de uma categoria', () => {
    cy.get(
      ':nth-child(3) > :nth-child(3) > .d-flex > :nth-child(1) > .btn'
    ).click();
    cy.get('app-confirmation').should('be.visible');
    cy.get('.d-flex > h2').should(
      'have.text',
      'Deseja realmente excluir esta categoria?'
    );
    cy.get('.modal-footer > .d-flex > :nth-child(2) > .btn').click();

    cy.contains('div', 'Categoria excluída com sucesso!').should('be.visible');
  });

  it('Pesquisa de categoria', () => {
    cy.get('.input-group > .form-control').type('Assinatura');
    cy.get('tbody > tr > :nth-child(2)').should(
      'have.text',
      'Assinatura Easy Health PRO (Automático)'
    );
  });
});

describe('Editar categorias - Validação de campos', () => {
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

  it('Validação de campos obrigatórios', () => {
    cy.get('.ml-auto > .btn').click();
    cy.get('.modal-footer > :nth-child(2) > .btn').click();
    cy.get('form-error > :nth-child(1) > div').should(
      'have.text',
      ' Campo Obrigatório '
    );
    cy.contains('div', 'Preencha os campos antes de continuar!').should(
      'be.visible'
    );
  });
});
