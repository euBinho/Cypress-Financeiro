import { faker } from '@faker-js/faker';

describe('Pendencies: Delayed incomes - Success test cases ', () => {
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

  it('Should create a delayed income', () => {
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

  it('Should edit a delayed income', () => {
    cy.get('.pt-1 > .btn').click();
    cy.get('#expenseName').clear().type('Jalecos para nova contratação');
    cy.get('.modal-footer > .d-flex > :nth-child(2) > .btn').click();
    cy.contains('div', 'Receita salva com sucesso!').should('be.visible');
  });

  it('Should filter by date and search a delayed income', () => {
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

  it('Should remove a delayed income', () => {
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

  it('Should download the delayed incomes', () => {
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

describe('Pendencies: Delayed incomes - Fail test cases', () => {
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

  it('Should not allow to create a delayed income until the required fields are filled in', () => {
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

describe('Pendencies: Delayed outcomes - Success test cases ', () => {
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

  it('Should create a delayed outcome', () => {
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

  it('Should edit a delayed outcome', () => {
    cy.get('.pt-1 > .btn').click().wait(1000);
    cy.get('#expenseName').clear().type('Jalecos para nova contratação');
    cy.get('.modal-footer > .d-flex > :nth-child(2) > .btn').click();
    cy.contains('div', 'Despesa salva com sucesso!').should('be.visible');
  });

  it('Should filter by date and search a delayed income', () => {
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

  it('Should remove a delayed outcome', () => {
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

  it('Should download the delayed outcomes', () => {
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

describe('Pendencies: Delayed outcomes - Fail test cases', () => {
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

  it('Should not allow to create a delayed outcome until the required fields are filled in', () => {
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

describe('Pendencies: Future incomes - Success test cases ', () => {
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

  it('Should create a future income', () => {
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

  it('Should edit a future income', () => {
    cy.get('.pt-1 > .btn').click().wait(1000);
    cy.get('#expenseName').clear().type('Jalecos para nova contratação');
    cy.get('.modal-footer > .d-flex > :nth-child(2) > .btn').click();
  });

  it('Should filter by date and search a future income', () => {
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

  it("Should mark the payment as 'Pago'", () => {
    cy.get('#flexCheckDefault1').click();
    cy.contains('div', 'Salvo com sucesso').should('be.visible');
  });

  it('Should remove a future income', () => {
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

  it('Should download the future incomes', () => {
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

describe('Pendencies: Future incomes - Fail test cases', () => {
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

  it('Should not allow to create a future income until the required fields are filled in', () => {
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

describe('Pendencies: Future outcomes - Success test cases ', () => {
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

  it('Should create a future outcome', () => {
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

  it('Should edit a future outcome', () => {
    cy.get('.pt-1 > .btn').click().wait(1000);
    cy.get('#expenseName').clear().type('Jalecos para nova contratação');
    cy.get('.modal-footer > .d-flex > :nth-child(2) > .btn').click();
  });

  it('Should filter by date and search a future income', () => {
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

  it("Should mark the payment as 'Pago'", () => {
    cy.get('#flexCheckDefault1').click();
    cy.contains('div', 'Salvo com sucesso').should('be.visible');
  });

  it('Should remove a future outcome', () => {
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

  it('Should download the future outcome', () => {
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

describe('Pendencies: Future outcomes - Fail test cases', () => {
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

  it('Should not allow to create a future outcome until the required fields are filled in', () => {
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
