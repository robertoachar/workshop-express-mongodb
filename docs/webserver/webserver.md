# Servidor Web

## Express

**Express** é um servidor Web rápido e leve que fornece um conjunto de recursos necessários para a criação de uma API robusta.

Para mais informações sobre o Express, acesse [https://expressjs.com/](https://expressjs.com/).

## Instalando o Express

Para instalar o Express, abra o Terminal e digite:

```bash
$ npm i express
```

Esse comando instala o Express como dependência no `package.json`.

```json
  "dependencies": {
    "express": "4.16.3",
  }
```

## Configurando o Express

Para adicionar os parâmetros de configuração do Express, edite o arquivo `.env`.

```yaml
NODE_ENV = development
DATABASE = mongodb://localhost:27017/workshop
PORT = 3000
```

Nessa configuração estamos definindo o número da porta que será utilizada pelo Express.

Para disponibilizar as informações do Express através do módulo de configurações, edite o arquivo `config.js`.

```javascript
/* eslint no-process-env: 0 */

require('dotenv').config();

const environment = ['NODE_ENV', 'DATABASE', 'PORT'];

environment.forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`${name}: ${process.env[name]}`);
  }
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  DATABASE: process.env.DATABASE,
  PORT: process.env.PORT
};
```

Para validar a configuração, edite o arquivo `index.js`.

```javascript
...
logger.info('Hello Express');
logger.info(`NODE_ENV: ${config.NODE_ENV}`);
logger.info(`DATABASE: ${config.DATABASE}`);
logger.info(`PORT: ${config.PORT}`);
```

O resultado da execução da aplicação pode ser visualizado no Terminal.

```text
info: Hello Express
info: NODE_ENV: development
info: DATABASE: mongodb://localhost:27017/workshop
info: PORT: 3000
info: MongoDB connected!
```

## Inicializando o Express

Para instanciar e exportar o Express, crie o arquivo `app.js`.

```javascript
const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('Hello Express'));

module.exports = app;
```

Esse módulo exporta o objeto `app`, uma instância do Express. Ele responde `Hello Express` quando a URL `/` (root) for acessada através do método `GET`.

Para inicializar o Express, edite o arquivo `index.js`.

```javascript
const mongoose = require('mongoose');

// importar o app
const app = require('./app');
const config = require('./config');
const logger = require('./logger');

mongoose.connect(
  config.DATABASE,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

mongoose.connection.on('connected', () => {
  logger.info('MongoDB connected!');
});

mongoose.connection.on('disconnected', () => {
  logger.warn('MongoDB disconnected!');
  process.exit(1);
});

mongoose.connection.on('error', (err) => {
  logger.error('MongoDB Error!', err.message);
  process.exit(1);
});

// inicializar o express na porta definida no arquivo .env
app.listen(config.PORT, () => {
  logger.info('Hello Express');
  logger.info(`NODE_ENV: ${config.NODE_ENV}`);
  logger.info(`DATABASE: ${config.DATABASE}`);
  logger.info(`PORT: ${config.PORT}`);
});
```

A função `listen()` inicializa o servidor web e começa a aceitar requisições na porta 3000.

O resultado da execução da aplicação pode ser visualizado no Terminal.

```text
info: Hello Express
info: NODE_ENV: development
info: DATABASE: mongodb://localhost:27017/workshop
info: PORT: 3000
info: MongoDB connected!
```

## Validando as configurações do Express

Para validar as configurações do Express através do Postman, abra o Postman, selecione a opção `GET`, informe a URL `http://localhost:3000` e clique em **Send**.

![Postman](/images/webserver/postman-localhost.png)

O `body` da resposta deve apresentar a seguinte saída.

```text
Hello Express
```

## Alterando o formato para JSON

Para alterar a saída para o formato JSON, edite o arquivo `app.js`.

```javascript
app.get('/', (req, res) => res.json({ message: 'Hello Express' }));
```

Realize a requisição novamente através do Postman e o formato da resposta deve ser JSON.

```json
{
  "message": "Hello Express"
}
```

## Mundo Real

Embora o Express seja um servidor Web robusto, ele **não deve** ser acessado diretamente através da Internet. O ideal é configurar um servidor Web mais robusto ainda e fazer um `proxy` para o Express. Eu recomendo a utilização do [NGINX](https://www.nginx.com/).

## Resumo

- Aprendemos a configurar e aceitar requisições do servidor Web
- Aprendemos a utilizar JSON como formato para a resposta das requisições
