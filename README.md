# Teste técnico Neo App
## Funcionalidades

- Listagem com paginação de todas as HQs
- Modal individual exibindo detalhes de cada HQ
- Carrinho de compras funcional
- Sistema de cupons de desconto aplicáveis para cada tipo de HQ
- Marcação de HQ's como "raros" setada aleatoriamente

## Detalhes Técnicos

- Projeto desenvolvido em **ReactJS**
- Estilização feita com **Styled Components**
- Uso de **HTML semântico** para melhor acessibilidade e SEO
- Componentização modular para melhor organização e manutenção do código
- Gerenciamento do estado do carrinho via **Context API** com **Reducer**
- Web design Responsivo
- Deploy na Vercel


## Tecnologias Utilizadas

- ReactJS
- Styled Components
- Context API + useReducer
- HTML5 semântico
- Testes automizados com Cypress


## Principais desafios

1. Realizar requisição para API e descobrir o formato da resposta  
2. Filtrar respostas da API conforme necessidade  
3. Mockar a resposta para selecionar aleatoriamente 10% dos itens
4. Cupom para items raros e comuns

### Resolução

( Utilizo a IA para acelerar a entrega do projeto e ajudar na resolução de dúvidas e problemas.  )
1. Não encontrei exemplos claros da resposta da API na documentação oficial, o que dificultou a implementação.  
- Busquei mais informações com apoio da IA para entender melhor a estrutura dos dados.  
- Para a requisição, utilizei Axios, pois a API exigia autenticação via hash MD5 e outros parâmetros específicos.

2. Verifiquei e identifiquei várias falhas na resposta da API, como:  
- Demora para retorno da requisição  
- Informações em branco ou nulas, como a falta de thumbnails, que quebravam o site por ausência de dados essenciais  
- Identifiquei um padrão nessas respostas “quebradas” e implementei uma filtragem para retornar apenas os dados válidos e completos

3. Mockar a resposta para selecionar aleatoriamente 10% dos itens:  
- Pensando na funcionalidade de selecionar itens por meio do INDEX do array, calculo o valor inteiro que corresponde a 10% dos HQ's
-  Utilizo o Math para gerar valores aleatorios inteiros e diferentes como [1, 4] onde
 estes irão corresponder a quantidade de 10% dos gibis e utilizado para selecionar o INDEX
- São passados para o index do array e atribuido um novo valor como (RARE: true;)
- Este ativa demais componentes e elementos no código.

4. Cupom para items raros e comuns
- Realizo uma validação no reducer do carrinho onde envio o cupom digitado (caso seja válido)
e aplico o desconto no item correto, de acordo com o cupom, se for cupom raro ou comum.
- Realizando o desconto dos items correspondente ao mesmo. 


Durante o desenvolvimento, enfrentei problemas relacionados à hidratação do site.  
Um dos problemas foi solucionado ao prefixar a prop do componente styled com o símbolo `$`, garantindo a correta passagem dos valores.
O layout foi atualizado varias vezes durante o desenvolvimento, mas é totalmente autoral.


CUPOMS:


(ITEMS RARO: RARE20) - 20%


(ITEMS COMUM: COMM15) - 15%
