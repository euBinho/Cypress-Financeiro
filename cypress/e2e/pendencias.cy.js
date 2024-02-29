import { faker } from '@faker-js/faker';

describe('Pendências: Receitas atrasadas - Casos de teste', () => {
  const loginData = {
    email: 'pedronieto.2005+23@gmail.com',
    password: 'Abc123456',
  };

  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.login(loginData);
    cy.get(':nth-child(11) > #TDD-menu-store').click();
    cy.get(':nth-child(3) > .nav-link').click();
    cy.get(':nth-child(4) > .d-flex > .nav-link').click();
  });

  it('Adição de uma receita atrasada', () => {
    cy.get('.btn-success').click();
    cy.get('.input-group-text').click();
    cy.get(
      '[aria-label="segunda-feira, 26 de fevereiro de 2024"] > .btn-light'
    ).click();
    cy.get('#expenseName').type('Jalecos novos');
    cy.get('#categorySearch').click();
    cy.get('#ngb-typeahead-0-1').click();
    cy.get('.w-100 > #typeahead-focus').click();
    cy.get('ngb-highlight').click();
    cy.get(':nth-child(7) > easy-typeahead > #typeahead-focus')
      .type('Consulta')
      .type('{enter}');
    cy.get('#valueExpense').type('5000');
    cy.get(':nth-child(2) > .row > :nth-child(3) > .form-control').type('0');
    cy.get(
      '.d-flex > .ng-select-container > .ng-value-container > .ng-input'
    ).click();
    cy.get('.d-flex > .ng-select-container').type('Pix{enter}');
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

  it('Adição de uma receita atrasada para exclusão', () => {
    cy.get('.btn-success').click();
    cy.get('.input-group-text').click();
    cy.get(
      '[aria-label="segunda-feira, 26 de fevereiro de 2024"] > .btn-light'
    ).click();
    cy.get('#expenseName').type('Exclusão');
    cy.get('#categorySearch').click();
    cy.get('#ngb-typeahead-0-1').click();
    cy.get('.w-100 > #typeahead-focus').click();
    cy.get('ngb-highlight').click();
    cy.get(':nth-child(7) > easy-typeahead > #typeahead-focus')
      .type('Consulta')
      .type('{enter}');
    cy.get('#valueExpense').type('5000');
    cy.get(':nth-child(2) > .row > :nth-child(3) > .form-control').type('0');
    cy.get(
      '.d-flex > .ng-select-container > .ng-value-container > .ng-input'
    ).click();
    cy.get('.d-flex > .ng-select-container').type('Pix{enter}');
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

  it('Edição de uma receita atrasada', () => {
    cy.get('.date-width > .form-control').click();
    cy.get(
      '[aria-label="quinta-feira, 25 de janeiro de 2024"] > .custom-day'
    ).click();
    cy.get('.right > .btn > .ngb-dp-navigation-chevron').click();
    cy.get(
      '[aria-label="quinta-feira, 29 de fevereiro de 2024"] > .custom-day'
    ).click();

    cy.get('.input-group > .form-control').type('Jalecos novos');
    cy.get('tbody > tr > :nth-child(3)').should('have.text', 'Jalecos novos');

    cy.get('.pt-1 > .btn').click();
    cy.get('#expenseName').clear().type('Jalecos para nova contratação');
    cy.get('.modal-footer > .d-flex > :nth-child(2) > .btn').click();
    cy.contains('div', 'Receita salva com sucesso!').should('be.visible');
  });

  it('Filtrar por data e procurar uma receita atrasada', () => {
    cy.get('.date-width > .form-control').click();
    cy.get(
      '[aria-label="quinta-feira, 25 de janeiro de 2024"] > .custom-day'
    ).click();
    cy.get('.right > .btn > .ngb-dp-navigation-chevron').click();
    cy.get(
      '[aria-label="quinta-feira, 29 de fevereiro de 2024"] > .custom-day'
    ).click();

    cy.get('.input-group > .form-control').type(
      'Jalecos para nova contratação'
    );
    cy.get('tbody > tr > :nth-child(3)').should(
      'have.text',
      'Jalecos para nova contratação'
    );
  });

  it("Marcar o pagamento como 'Pago'", () => {
    cy.get('.date-width > .form-control').click();
    cy.get(
      '[aria-label="quinta-feira, 25 de janeiro de 2024"] > .custom-day'
    ).click();
    cy.get('.right > .btn > .ngb-dp-navigation-chevron').click();
    cy.get(
      '[aria-label="quinta-feira, 29 de fevereiro de 2024"] > .custom-day'
    ).click();

    cy.get('.input-group > .form-control').type(
      'Jalecos para nova contratação'
    );
    cy.get('tbody > tr > :nth-child(3)').should(
      'have.text',
      'Jalecos para nova contratação'
    );

    cy.get('#flexCheckDefault1').click();
    cy.get('.modal-title')
      .should('have.text', 'Receita Paga')
      .should('be.visible');
    cy.get('.modal-footer > :nth-child(2) > .btn').click();
    cy.contains('div', 'Salvo com sucesso').should('be.visible');
  });

  it('Exclusão de uma receita atrasada', () => {
    cy.get('.pt-1 > .btn').click();
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

  it('Validação do download de receitas atrasadas', () => {
    cy.get('.d-flex > .btn-outline-primary').click();
    cy.task('listFiles', 'cypress/downloads').then((files) => {
      const downloadedFileName = files[0];
      const filePath = `cypress/downloads/${downloadedFileName}`;

      cy.task('fileExists', filePath).then((fileExists) => {
        expect(fileExists).to.be.true;
      });
    });
  });
});

describe('Pendências: Receitas atrasadas - Validação de campos', () => {
  const loginData = {
    email: 'pedronieto.2005+23@gmail.com',
    password: 'Abc123456',
  };

  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.login(loginData);
    cy.get(':nth-child(11) > #TDD-menu-store').click();
    cy.get(':nth-child(3) > .nav-link').click();
    cy.get(':nth-child(4) > .d-flex > .nav-link').click();
  });

  it('Validação de campos obrigatórios', () => {
    cy.get('.btn-success').click();
    cy.get('.modal-footer > .d-flex > :nth-child(2) > .btn').click();
    cy.get(':nth-child(3) > form-error > :nth-child(1) > div')
      .should('be.visible')
      .should('have.text', ' Campo Obrigatório ');
    cy.get(':nth-child(4) > form-error > :nth-child(1) > div')
      .should('be.visible')
      .should('have.text', ' Campo Obrigatório ');
    cy.get(
      ':nth-child(2) > .row > :nth-child(1) > form-error > :nth-child(1) > div'
    )
      .should('be.visible')
      .should('have.text', ' Campo Obrigatório ');
    cy.get(
      ':nth-child(3) > :nth-child(1) > :nth-child(1) > form-error > :nth-child(1) > div'
    )
      .should('be.visible')
      .should('have.text', ' Campo Obrigatório ');
  });
});

describe('Pendências: Despesas atrasadas - Casos de teste', () => {
  const loginData = {
    email: 'pedronieto.2005+23@gmail.com',
    password: 'Abc123456',
  };

  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.login(loginData);
    cy.get(':nth-child(11) > #TDD-menu-store').click();
    cy.get(':nth-child(3) > .nav-link').click();
    cy.get(':nth-child(5) > .d-flex > .nav-link').click();
  });

  it('Adição de uma despesa atrasada', () => {
    cy.get('.btn-danger').click();
    cy.get('.input-group-text').click();
    cy.get(
      '[aria-label="segunda-feira, 26 de fevereiro de 2024"] > .btn-light'
    ).click();
    cy.get('#expenseName').type('Jalecos novos');
    cy.get('#categorySearch').click();
    cy.get('#ngb-typeahead-0-1').click();
    cy.get('.w-100 > #typeahead-focus').click();
    cy.get('ngb-highlight').click();
    cy.get(':nth-child(7) > easy-typeahead > #typeahead-focus')
      .type('Consulta')
      .type('{enter}');
    cy.get('#valueExpense').type('5000');
    cy.get(':nth-child(2) > .row > :nth-child(3) > .form-control').type('0');
    cy.get(
      '.d-flex > .ng-select-container > .ng-value-container > .ng-input'
    ).click();
    cy.get('.d-flex > .ng-select-container').type('Pix{enter}');
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

  it('Adição de uma despesa atrasada para exclusão', () => {
    cy.get('.btn-danger').click();
    cy.get('.input-group-text').click();
    cy.get(
      '[aria-label="segunda-feira, 26 de fevereiro de 2024"] > .btn-light'
    ).click();
    cy.get('#expenseName').type('Exclusão');
    cy.get('#categorySearch').click();
    cy.get('#ngb-typeahead-0-1').click();
    cy.get('.w-100 > #typeahead-focus').click();
    cy.get('ngb-highlight').click();
    cy.get(':nth-child(7) > easy-typeahead > #typeahead-focus')
      .type('Consulta')
      .type('{enter}');
    cy.get('#valueExpense').type('5000');
    cy.get(':nth-child(2) > .row > :nth-child(3) > .form-control').type('0');
    cy.get(
      '.d-flex > .ng-select-container > .ng-value-container > .ng-input'
    ).click();
    cy.get('.d-flex > .ng-select-container').type('Pix{enter}');
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

  it('Edição de uma despesa atrasada', () => {
    cy.get('.date-width > .form-control').click();
    cy.get(
      '[aria-label="quinta-feira, 25 de janeiro de 2024"] > .custom-day'
    ).click();
    cy.get('.right > .btn > .ngb-dp-navigation-chevron').click();
    cy.get(
      '[aria-label="quinta-feira, 29 de fevereiro de 2024"] > .custom-day'
    ).click();

    cy.get('.input-group > .form-control').type('Jalecos novos');
    cy.get('tbody > tr > :nth-child(3)').should('have.text', 'Jalecos novos');

    cy.get('.pt-1 > .btn').click().wait(1000);
    cy.get('#expenseName').clear().type('Jalecos para nova contratação');
    cy.get('.modal-footer > .d-flex > :nth-child(2) > .btn').click();
    cy.contains('div', 'Despesa salva com sucesso!').should('be.visible');
  });

  it('Filtrar por data e procurar uma despesa atrasada', () => {
    cy.get('.date-width > .form-control').click();
    cy.get(
      '[aria-label="quinta-feira, 25 de janeiro de 2024"] > .custom-day'
    ).click();
    cy.get('.right > .btn > .ngb-dp-navigation-chevron').click();
    cy.get(
      '[aria-label="quinta-feira, 29 de fevereiro de 2024"] > .custom-day'
    ).click();

    cy.get('.input-group > .form-control').type(
      'Jalecos para nova contratação'
    );
    cy.get('tbody > tr > :nth-child(3)').should(
      'have.text',
      'Jalecos para nova contratação'
    );
  });

  it("Marcar o pagamento como 'Pago'", () => {
    cy.get('.date-width > .form-control').click();
    cy.get(
      '[aria-label="quinta-feira, 25 de janeiro de 2024"] > .custom-day'
    ).click();
    cy.get('.right > .btn > .ngb-dp-navigation-chevron').click();
    cy.get(
      '[aria-label="quinta-feira, 29 de fevereiro de 2024"] > .custom-day'
    ).click();

    cy.get('.input-group > .form-control').type(
      'Jalecos para nova contratação'
    );
    cy.get('tbody > tr > :nth-child(3)').should(
      'have.text',
      'Jalecos para nova contratação'
    );

    cy.get('#flexCheckDefault1').click();
    cy.get('.modal-title')
      .should('have.text', 'Receita Paga')
      .should('be.visible');
    cy.get('.modal-footer > :nth-child(2) > .btn').click();
    cy.contains('div', 'Salvo com sucesso').should('be.visible');
  });

  it('Exclusão de uma despesa atrasada', () => {
    cy.get('.pt-1 > .btn').click();
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

  it('Validação do download de despesas atrasadas', () => {
    cy.get('.d-flex > .btn-outline-primary').click();
    cy.task('listFiles', 'cypress/downloads').then((files) => {
      const downloadedFileName = files[0];
      const filePath = `cypress/downloads/${downloadedFileName}`;

      cy.task('fileExists', filePath).then((fileExists) => {
        expect(fileExists).to.be.true;
      });
    });
    cy.get('.d-flex > .btn-outline-primary');
  });
});

describe('Pendências: Despesas atrasadas - Validação de campos', () => {
  const loginData = {
    email: 'pedronieto.2005+23@gmail.com',
    password: 'Abc123456',
  };

  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.login(loginData);
    cy.get(':nth-child(11) > #TDD-menu-store').click();
    cy.get(':nth-child(3) > .nav-link').click();
    cy.get(':nth-child(5) > .d-flex > .nav-link').click();
  });

  it('Validação de campos obeigatórios', () => {
    cy.get('.btn-danger').click();
    cy.get('.modal-footer > .d-flex > :nth-child(2) > .btn').click();
    cy.get(':nth-child(3) > form-error > :nth-child(1) > div')
      .should('be.visible')
      .should('have.text', ' Campo Obrigatório ');
    cy.get(':nth-child(4) > form-error > :nth-child(1) > div')
      .should('be.visible')
      .should('have.text', ' Campo Obrigatório ');
    cy.get(
      ':nth-child(2) > .row > :nth-child(1) > form-error > :nth-child(1) > div'
    )
      .should('be.visible')
      .should('have.text', ' Campo Obrigatório ');
    cy.get(
      ':nth-child(3) > :nth-child(1) > :nth-child(1) > form-error > :nth-child(1) > div'
    )
      .should('be.visible')
      .should('have.text', ' Campo Obrigatório ');
  });
});

describe('Pendências: Receitas futuras - Casos de teste', () => {
  const loginData = {
    email: 'pedronieto.2005+23@gmail.com',
    password: 'Abc123456',
  };

  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.login(loginData);
    cy.get(':nth-child(11) > #TDD-menu-store').click();
    cy.get(':nth-child(3) > .nav-link').click();
    cy.get(':nth-child(6) > .d-flex > .nav-link').click();
  });

  it('Adição de uma receita futura', () => {
    cy.get('.btn-success').click();
    cy.get('.input-group-text').click();
    cy.get('.right > .btn > .ngb-dp-navigation-chevron').click();
    cy.get(
      '[aria-label="terça-feira, 26 de março de 2024"] > .btn-light'
    ).click();
    cy.get('#expenseName').type('Jalecos novos');
    cy.get('#categorySearch').click();
    cy.get('#ngb-typeahead-0-1').click();
    cy.get('.w-100 > #typeahead-focus').click();
    cy.get('ngb-highlight').click();
    cy.get(':nth-child(7) > easy-typeahead > #typeahead-focus')
      .type('Consulta')
      .type('{enter}');
    cy.get('#valueExpense').type('5000');
    cy.get(':nth-child(2) > .row > :nth-child(3) > .form-control').type('0');
    cy.get(
      '.d-flex > .ng-select-container > .ng-value-container > .ng-input'
    ).click();
    cy.get('.d-flex > .ng-select-container').type('Pix{enter}');
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

  it('Edição de uma receita futura', () => {
    cy.get('.pt-1 > .btn').click().wait(1000);
    cy.get('#expenseName').clear().type('Jalecos para nova contratação');
    cy.get('.modal-footer > .d-flex > :nth-child(2) > .btn').click();
  });

  it('Filtrar por data e procurar uma receita futura', () => {
    cy.get('.date-width > .form-control').click();
    cy.get('.ngb-dp-today > .custom-day').click();
    cy.get('.right > .btn > .ngb-dp-navigation-chevron').click();
    cy.get(
      '[aria-label="quinta-feira, 28 de março de 2024"] > .custom-day'
    ).click();

    cy.get('.input-group > .form-control').type(
      'Jalecos para nova contratação'
    );
    cy.get('tbody > tr > :nth-child(3)').should(
      'have.text',
      'Jalecos para nova contratação'
    );
  });

  it("Marcar o pagamento como 'Pago'", () => {
    cy.get('#flexCheckDefault1').click();
    cy.contains('div', 'Salvo com sucesso').should('be.visible');
  });

  it('Remoção de uma receita futura', () => {
    cy.get('.pt-1 > .btn').click();
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

  it('Validação do download de receitas futuras', () => {
    cy.get('.d-flex > .btn-outline-primary').click();
    cy.task('listFiles', 'cypress/downloads').then((files) => {
      const downloadedFileName = files[0];
      const filePath = `cypress/downloads/${downloadedFileName}`;

      cy.task('fileExists', filePath).then((fileExists) => {
        expect(fileExists).to.be.true;
      });
    });
  });
});

describe('Pendências: Receitas futuras - Validação de campos', () => {
  const loginData = {
    email: 'pedronieto.2005+23@gmail.com',
    password: 'Abc123456',
  };

  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.login(loginData);
    cy.get(':nth-child(11) > #TDD-menu-store').click();
    cy.get(':nth-child(3) > .nav-link').click();
    cy.get(':nth-child(6) > .d-flex > .nav-link').click();
  });

  it('Validação de campos obrigatórios', () => {
    cy.get('.btn-success').click();
    cy.get('.modal-footer > .d-flex > :nth-child(2) > .btn').click();
    cy.get(':nth-child(3) > form-error > :nth-child(1) > div')
      .should('be.visible')
      .should('have.text', ' Campo Obrigatório ');
    cy.get(':nth-child(4) > form-error > :nth-child(1) > div')
      .should('be.visible')
      .should('have.text', ' Campo Obrigatório ');
    cy.get(
      ':nth-child(2) > .row > :nth-child(1) > form-error > :nth-child(1) > div'
    )
      .should('be.visible')
      .should('have.text', ' Campo Obrigatório ');
    cy.get(
      ':nth-child(3) > :nth-child(1) > :nth-child(1) > form-error > :nth-child(1) > div'
    )
      .should('be.visible')
      .should('have.text', ' Campo Obrigatório ');
  });
});

describe('Pendências: Despesas futuras - Casos de teste', () => {
  const loginData = {
    email: 'pedronieto.2005+23@gmail.com',
    password: 'Abc123456',
  };

  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.login(loginData);
    cy.get(':nth-child(11) > #TDD-menu-store').click();
    cy.get(':nth-child(3) > .nav-link').click();
    cy.get('.nav > :nth-child(7) > .d-flex').click();
  });

  it('Adição de uma despesa futura', () => {
    cy.get('.btn-danger').click();
    cy.get('.input-group-text').click();
    cy.get('.right > .btn > .ngb-dp-navigation-chevron').click();
    cy.get('[aria-label="quinta-feira, 28 de março de 2024"]').click();
    cy.get('#expenseName').type('Jalecos novos');
    cy.get('#categorySearch').click();
    cy.get('#ngb-typeahead-0-1').click();
    cy.get('.w-100 > #typeahead-focus').click();
    cy.get('ngb-highlight').click();
    cy.get(':nth-child(7) > easy-typeahead > #typeahead-focus')
      .type('Consulta')
      .type('{enter}');
    cy.get('#valueExpense').type('5000');
    cy.get(':nth-child(2) > .row > :nth-child(3) > .form-control').type('0');
    cy.get(
      '.d-flex > .ng-select-container > .ng-value-container > .ng-input'
    ).click();
    cy.get('.d-flex > .ng-select-container').type('Pix{enter}');
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

  it('Edição de uma despesa futura', () => {
    cy.get('.pt-1 > .btn').click().wait(1000);
    cy.get('#expenseName').clear().type('Jalecos para nova contratação');
    cy.get('.modal-footer > .d-flex > :nth-child(2) > .btn').click();
  });

  it('Filtrar por data e procurar uma receita futura', () => {
    cy.get('.date-width > .form-control').click();
    cy.get('.ngb-dp-today > .custom-day').click();
    cy.get('.right > .btn > .ngb-dp-navigation-chevron').click();
    cy.get(
      '[aria-label="quinta-feira, 28 de março de 2024"] > .custom-day'
    ).click();

    cy.get('.input-group > .form-control').type(
      'Jalecos para nova contratação'
    );
    cy.get('tbody > tr > :nth-child(3)').should(
      'have.text',
      'Jalecos para nova contratação'
    );
  });

  it("Marcar o pagamento como 'Pago'", () => {
    cy.get('#flexCheckDefault1').click();
    cy.contains('div', 'Salvo com sucesso').should('be.visible');
  });

  it('Exclusão de uma despesa futura', () => {
    cy.get('.pt-1 > .btn').click();
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

  it('Validação do download de despesas futuras', () => {
    cy.get('.d-flex > .btn-outline-primary').click();
    cy.task('listFiles', 'cypress/downloads').then((files) => {
      const downloadedFileName = files[0];
      const filePath = `cypress/downloads/${downloadedFileName}`;

      cy.task('fileExists', filePath).then((fileExists) => {
        expect(fileExists).to.be.true;
      });
    });
  });
});

describe('Pendências: Despesas futuras - Validação de campos', () => {
  const loginData = {
    email: 'pedronieto.2005+23@gmail.com',
    password: 'Abc123456',
  };

  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.login(loginData);
    cy.get(':nth-child(11) > #TDD-menu-store').click();
    cy.get(':nth-child(3) > .nav-link').click();
    cy.get('.nav > :nth-child(7) > .d-flex').click();
  });

  it('Validação de campos obrigatórios', () => {
    cy.get('.btn-danger').click();
    cy.get('.modal-footer > .d-flex > :nth-child(2) > .btn').click();
    cy.get(':nth-child(3) > form-error > :nth-child(1) > div')
      .should('be.visible')
      .should('have.text', ' Campo Obrigatório ');
    cy.get(':nth-child(4) > form-error > :nth-child(1) > div')
      .should('be.visible')
      .should('have.text', ' Campo Obrigatório ');
    cy.get(
      ':nth-child(2) > .row > :nth-child(1) > form-error > :nth-child(1) > div'
    )
      .should('be.visible')
      .should('have.text', ' Campo Obrigatório ');
    cy.get(
      ':nth-child(3) > :nth-child(1) > :nth-child(1) > form-error > :nth-child(1) > div'
    )
      .should('be.visible')
      .should('have.text', ' Campo Obrigatório ');
  });
});

describe('Limpeza do teste', () => {
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

  //todo limpar dados pós testes
  // it('Limpa os dados do teste', () => {
  //   cy.get(':nth-child(6) > .btn').click({ multiple: true });
  //   cy.get('.me-4 > .btn').click();
  //   cy.get('app-confirmation').should('be.visible');
  //   cy.get('.d-flex > h2').should(
  //     'have.text',
  //     'Deseja realmente excluir esta transação?'
  //   );
  //   cy.get(
  //     'app-confirmation > .modal-footer > .d-flex > :nth-child(2) > .btn'
  //   ).click();
  // });
});
