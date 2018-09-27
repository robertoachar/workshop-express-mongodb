# Rotas

Rotas são responsáveis por definir os endereços e os métodos HTTP utilizados para interagir com determinado recurso.

Quando queremos recuperar uma lista de usuários da aplicação, fazemos uma requisição `GET` na rota `/api/users`. Quando queremos adicionar um usuário na aplicação, fazemos uma requisição `POST` para a mesma rota `/api/users`. A API precisa estar preparada para entender qual método foi utilizado e qual o endereço solicitado para poder entregar o recurso apropriado.

Uma das funcionalidades mais interessantes do Express é a capacidade de definir as rotas através de módulos, ou seja, não precisamos definir todas as rotas em um mesmo arquivo.

## Criando a rota principal

Para criar o módulo com a rota principal, crie o arquivo `router.js`.

```javascript
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hello Router' });
});

module.exports = router;
```

Esse módulo exporta o objeto `router` que aceita requisições `GET` no endereço `/` e responde um JSON `{ message: 'Hello Router' }`.

## Integração com o Express

Para integrar a rota principal com o Express, edite o arquivo `app.js`.

```javascript
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('@robertoachar/express-cors');
const express = require('express');
const helmet = require('helmet');

const { catchAll, notFound } = require('./error');

const app = express();
const router = require('./router'); // importar a rota principal

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router); // integrar a rota principal

app.use(notFound);
app.use(catchAll);

module.exports = app;
```

## Validando a rota principal

Abra o Postman e faça uma requisição `GET` em `http://localhost:3000/`.

```json
{
  "message": "Hello Router"
}
```

## Mundo Real

Para aplicações simples não há necessidade de criar um módulo para as rotas, elas podem ser definidas no mesmo local do Express (`app.js`).

Para aplicações de médio e grande porte, é uma boa prática modularizar as rotas para facilitar a criação de novas rotas e a manutenção das rotas existentes, além de manter as rotas separadas por domínios.

## Resumo

- Implementamos o módulo da rota principal
- Aprendemos a funcionalidade e composição das rotas
