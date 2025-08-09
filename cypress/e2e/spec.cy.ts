describe('Teste do carregamento inicial (Resposta da API) e navegação pelo site', () => {

  beforeEach('Aguardar resposta da API',() => {
    cy.visit('http://localhost:3000/')
    cy.intercept('GET', 'https://gateway.marvel.com/v1/public/comics*').as('getGibis')
    cy.wait('@getGibis')
  })

  it('Esperar resposta da api e renderizar o grid dos gibis', () => {

    cy.get('.ListMain__Grid-sc-14a6596f-0').should('be.visible')

  })

  it('Verificar se o carrinho realmente inicia vazio e renderiza o gibi apos clicar em Comprar', () => {

    cy.get('.HeaderBar__Cart-sc-15e3c48a-2').should('be.visible').click()

    cy.get('h1').should('contain.text', 'The cart is empty')

    cy.get(':nth-child(2) > .GibiArea__Div-sc-ac34b54b-3 > .hdYFcv').click()

    cy.get(':nth-child(1) > .ItemCart__Detail-sc-a8c698aa-7').should('be.visible')

    cy.get('.ModalCart__Items-sc-caf45618-3').should('be.visible').and('contain.text', '1')
  })

  it('Verificar funcionaliades do cart (carrinho de compras)', () => {
    cy.get('.HeaderBar__Cart-sc-15e3c48a-2').should('be.visible').click()

    cy.get('h1').should('contain.text', 'The cart is empty')

    cy.get(':nth-child(1) > .GibiArea__Div-sc-ac34b54b-3 > .hdYFcv').click()

    cy.get('.ModalCart__Items-sc-caf45618-3').should('be.visible')

    cy.get(':nth-child(2) > :nth-child(2) > .ItemCart__Flex-sc-a8c698aa-3 > :nth-child(1)')
    .should('be.visible')
    .click()
    
    cy.get('.ModalCart__Items-sc-caf45618-3').should('contain.text', '2')


  })

  it('Renderiza o Gibi individualmente apos clicar na capa ou botao de (See more) do mesmo', () => {

    cy.get(':nth-child(1) > .GibiArea__Thumbnails-sc-ac34b54b-1').should('be.visible').click()

    cy.get('.SelectGibiModal__ModalArea-sc-2f58c34b-0').should('be.visible')

    cy.get('.SelectGibiModal__Arrow-sc-2f58c34b-7').should('be.visible').click()

    cy.get(':nth-child(1) > .GibiArea__Div-sc-ac34b54b-3 > .fQCiMl').should('be.visible').click()

    cy.get('.SelectGibiModal__ModalArea-sc-2f58c34b-0').should('be.visible')
  })



})