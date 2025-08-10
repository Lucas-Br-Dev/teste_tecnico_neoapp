describe('Teste do carregamento inicial (Resposta da API) e navegação pelo site', () => {

  beforeEach('Aguardar resposta da API', () => {
    cy.visit('http://localhost:3000/')
    cy.intercept('GET', 'https://gateway.marvel.com/v1/public/comics*').as('getGibis')
    cy.wait('@getGibis')
  })

  it('Esperar resposta da api e renderizar o grid dos gibis', () => {

    cy.get('[data-cy="list-main-grid"]').should('be.visible')

  })

  it('Verificar se o carrinho realmente inicia vazio e renderiza o gibi apos clicar em Comprar', () => {

    cy.get('[data-cy="cart-icon"]').should('be.visible').click()

    cy.get('h1').should('contain.text', 'The cart is empty')

    cy.get('[data-cy="button-buy-grid"]').first().click()

    cy.get('[data-cy="button-alert"]').click()

    cy.get('[data-cy="coupon-input"]').should('be.visible')
  })

  it('Verificar funcionaliades do cart (carrinho de compras)', () => {

    cy.get('[data-cy="cart-icon"]').should('be.visible').click()

    cy.get('[data-cy="button-buy-grid"]').first().should('be.visible').click()

    cy.get('[data-cy="button-alert"]').click()

    cy.get('[data-cy="cart-selector-add"]').should('be.visible').click()

    cy.get('.ItemCart__Qtd-sc-de580d41-6').should('contain.text', '2')

    cy.get('[data-cy="cart-selector-trash"]').should('be.visible').click()

    cy.get('h1').should('contain.text', 'The cart is empty')

  })

  it('Verificar se o cupom de desconto funciona corretamente', () => {

    cy.get('[data-cy="cart-icon"]').should('be.visible').click()

    cy.get('[data-cy="button-buy-grid"]').first().should('be.visible').click()

    cy.get('[data-cy="button-alert"]').click()

    cy.document().then(doc => {
      const existe = doc.querySelector('[data-cy="rare-element"]') !== null
      if (existe) {
        cy.get('[data-cy="coupon-input"]').clear().type('RARE20)')
      } else {
        cy.get('[data-cy="coupon-input"]').clear().type('COMM15')
      }
    })

    cy.get('[data-cy="coupon-input"]').should('be.disabled')

  })

  it('Renderizar o Modal do Gibi individualmente apos clicar na capa ou botao de (See more) do mesmo', () => {

    cy.get('[data-cy="thumbnail-gibi"]').first().should('be.visible').click()

    cy.get('[data-cy="button-buy-modal"]').should('be.visible')

    cy.get('[data-cy="bottom-return"]').click()

    cy.get('[data-cy="list-main-grid"]').should('be.visible')

    cy.get('[data-cy="modal-button-seemore"]').first().should('be.visible').click()

    cy.get('[data-cy="button-buy-modal"]').should('be.visible')

  })
})

describe('Teste de erro da API', () => {

  it('Verificar se o Alert de erro aparece quando a API falha', () => {
  
    cy.visit('http://localhost:3000/');

    cy.intercept('GET', 'https://gateway.marvel.com/v1/public/comics*', {
      statusCode: 500,
      body: {}
    }).as('getGibisError');

    cy.visit('http://localhost:3000/');

    cy.wait('@getGibisError');

    cy.get('[data-cy="button-alert"]').should('be.visible').click();

    let reloaded = false;

    cy.on('window:before:load', () => {
      reloaded = true;
    });

    cy.wait(1000).then(() => {
      expect(reloaded).to.be.true;
    });

  })
})