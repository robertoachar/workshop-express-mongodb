# Tratamento de Erros

É muito importante que as aplicações tenham um tratamento de erros adequado. As aplicações precisam ser capazes de responder por rotas não encontradas ou erros inesperados.

O protoloco HTTP possui códigos específicos para informar o _status_ da resposta de uma determinada requisição. Os intervalos de _status_ mais utilizados são:

- 200-299 - Respostas de sucesso
- 400-499 - Respostas de erro do Cliente
- 500-599 - Respostas de erro do Servidor

Para mais informações sobre HTTP Status, acesse [MDN - HTTP Status](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status).

Os 03 _status_ mais comuns utilizados são:

- [200 OK](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status/200)
- [404 Not Found](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status/404)
- [500 Internal Server Error](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status/500)

### 200 OK

O _status_ **200 OK** (Sucesso) indica que a requisição foi bem sucedida.

### 404 Not Found

O _status_ **404 Not Found** (Não Encontrado) indica que o servidor não encontrou o recurso solicitado.

### 500 Internal Server Error

O _status_ **500 Internal Server Error** (Erro Interno do Servidor) indica que o servidor encontrou um erro inesperado e não conseguiu atender a requisição.

## Criando o módulo de tratamento de erros

Para criar o módulo de tratamento de erros, crie o arquivo `error.js`.

```javascript
/* eslint no-unused-vars: 0 */

// importar o módulo de registro de aplicações
const logger = require('./logger');

// definir a função que fará o tratamento do erro 404
module.exports.notFound = (req, res, next) => {
  // registrar o erro no log
  logger.warn('Não encontrado');

  // criar o erro personalizado
  const error = new Error('Not Found');
  error.status = 404;

  // passar o objeto `error` para o próximo middleware
  next(error);
};

// definir a função que fará o tratamento do erro 500
module.exports.catchAll = (err, req, res, next) => {
  // verificar se é um erro conhecido ou um erro inesperado
  const status = err.status || 500;
  const message = err.message || 'Something broke!';

  // registrar o erro no log
  logger.error(message);

  // retornar o erro na resposta
  res.status(status).json({ error: { status, message } });
};
```

### Integração com o Express

Para integrar o módulo de tratamento de erros no Express, edite o arquivo `app.js`.

```javascript
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('@robertoachar/express-cors');
const express = require('express');
const helmet = require('helmet');

const { catchAll, notFound } = require('./error'); // importar o módulo de tratamento de erros

const app = express();

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.json({ message: 'Hello Express' }));

app.use(notFound); // utilizar o tratamento de erro 404
app.use(catchAll); // utilizar o tratamento de erro 500

module.exports = app;
```

O tratamento de erros no Express deve ser configurado após todas as outras rotas. Isso faz parte da arquitetura do Express. Primeiro deve ser feito o tratamento para o erro `404` e por último o tratamento para o erro `500`.

Para mais informações sobre o tratamento de erros no Express, acesse [http://expressjs.com/pt-br/guide/error-handling.html](http://expressjs.com/pt-br/guide/error-handling.html).

## Entendendo o tratamento de erros

Abra o Postman e faça uma requisição `GET` em `http://localhost:3000/hello`. O resultado deve ser o erro `404 Not Found`, pois essa rota não existe.

```json
{
  "error": {
    "status": 404,
    "message": "Not Found"
  }
}
```

Edite o arquivo `app.js`, crie outra rota logo abaixo da rota `/`, e dispare um erro propositalmente.

```javascript
...

app.get('/', (req, res) => res.json({ message: 'Hello Express' }));

// rota hello
app.get('/hello', (req, res) => {
  throw new Error('Deu pau');
});

...
```

Abra o Postman e faça uma requisição `GET` em `http://localhost:3000/hello`. O resultado deve ser o erro `500 Internal Server Error`, pois disparamos um erro proposital.

```json
{
  "error": {
    "status": 500,
    "message": "Deu pau"
  }
}
```

Edite novamente o arquivo `app.js` e altere a rota `/hello`.

```javascript
app.get('/', (req, res) => res.json({ message: 'Hello Express' }));

// rota hello
app.get('/hello', (req, res) => res.json({ message: 'Hello Express' }));
```

Abra o Postman e faça uma requisição `GET` em `http://localhost:3000/hello`. O resultado deve ser o _status_ `200 OK`, pois o Express encontrou a rota e conseguiu processar a requisição.

```json
{
  "message": "Hello Express"
}
```

::: tip Dica
Pode apagar a rota `/hello` pois não faz parte do escopo da aplicação.
:::

## Mundo Real

O tratamento de erros é muito importante para informar ao cliente qual o _status_ da requisição. O _status_ `404` é totalmente diferente do _status_ `500`. Isso precisa estar muito bem definido na aplicação.

**Não retorne** a mensagem de erro real da aplicação para o cliente. Essa mensagem pode conter informações sensíveis ou detalhes importantes da implementação de alguma funcionalidade da aplicação.

**Retorne** uma mensagem genérica e **registre** a mensagem de erro. Dessa forma você é capaz de entender o que aconteceu (ou não) e as informações da aplicação ficam protegidas.

Caso o registro da aplicação apresente a mensagem de erro genérica, é sinal de que faltou tratamento de erro em algum local da aplicação.

## Resumo

- Implementamos o módulo de tratamento de erros
- Entendemos o conceito e a importância do tratamento de erros
- Entendemos as implicações de retornar mensagens de erros reais para o cliente
