# Banco de Dados

O banco de dados é o responsável por armazenar os dados da aplicação, além de disponibilizar funcionalidades para interagir com os dados, como consulta, inclusão, alteração e exclusão.

## MongoDB

**MongoDB** é um banco de dados de documentos. Ele armazena os dados de forma semelhante a um documento JSON. Seus campos e dados podem variar de documento para documento.

Para mais informações sobre o MongoDB, acesse [https://www.mongodb.com/](https://www.mongodb.com/).

## Mongoose

**Mongoose** é uma biblioteca de modelagem de dados que integra o MongoDB ao Node.js. É através dessa biblioteca que integraremos o servidor Web ao banco de dados.

Para mais informações sobre o Mongoose, acesse [https://mongoosejs.com/](https://mongoosejs.com/).

## Instalando o Mongoose

Para instalar o Mongoose no projeto, abra o Terminal e digite:

```bash
$ npm i mongoose
```

Esse comando instala o Mongoose como dependência no `package.json`.

```json
  "dependencies": {
    "mongoose": "5.2.17"
  }
```

## Configurando a conexão

Para adicionar os parâmetros de configuração do MongoDB, edite o arquivo `.env`.

```yaml
NODE_ENV = development
DATABASE = mongodb://localhost:27017/workshop
```

::: tip Dica
Se você optou por utilizar a mLab, utilize as informações de conexão fornecidas pelo serviço.
:::

Para disponibilizar as informações de conexão com o MongoDB através do módulo de configurações, edite o arquivo `config.js`.

```javascript
/* eslint no-process-env: 0 */

require('dotenv').config();

const environment = ['NODE_ENV', 'DATABASE'];

environment.forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`${name}: ${process.env[name]}`);
  }
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  DATABASE: process.env.DATABASE
};
```

Para validar a configuração, edite o arquivo `index.js`.

```javascript
const config = require('./config');
const logger = require('./logger');

logger.info('Hello MongoDB');
logger.info(`NODE_ENV: ${config.NODE_ENV}`);
logger.info(`DATABASE: ${config.DATABASE}`);
```

Os parâmetros de configuração devem ser exibidos no Terminal.

```text
info: Hello MongoDB
info: NODE_ENV: development
info: DATABASE: mongodb://localhost:27017/workshop
```

## Criando a conexão com o banco de dados

Para criar a conexão com o MongoDB, edite o arquivo `index.js`.

```javascript
// importar o mongoose
const mongoose = require('mongoose');

// importar os módulos de configuração e registro de aplicações
const config = require('./config');
const logger = require('./logger');

// conectar ao banco de dados utilizando os parâmetros
// informados através do módulo de configuração
mongoose.connect(
  config.DATABASE,
  { useNewUrlParser: true }
);

// configurar o Mongoose para utilizar Promises nativas
mongoose.Promise = global.Promise;

// configurar o evento de conexão e exibir uma mensagem na saída
mongoose.connection.on('connected', () => {
  logger.info('MongoDB connected!');
});

// configurar o evento de desconexão
// caso o banco de dados seja desconectado, exibir um aviso e encerrar o aplicação
mongoose.connection.on('disconnected', () => {
  logger.warn('MongoDB disconnected!');
  process.exit(1);
});

// configurar o evento de erro
// caso ocorra algum erro no banco de dados, exibir um erro e encerrar o aplicação
mongoose.connection.on('error', (err) => {
  logger.error('MongoDB Error!', err.message);
  process.exit(1);
});

logger.info('Hello MongoDB');
logger.info(`NODE_ENV: ${config.NODE_ENV}`);
logger.info(`DATABASE: ${config.DATABASE}`);
```

O resultado da execução da aplicação pode ser visualizado no Terminal.

```text
info: Hello MongoDB
info: NODE_ENV: development
info: DATABASE: mongodb://localhost:27017/workshop
info: MongoDB connected!
```

## Analisando a lógica da conexão

Há alguns pontos importantes por trás dessa lógica de conexão com o MongoDB.

- A mensagem de confirmação de conexão com o MongoDB foi exibida por último.

Isso acontece pois a execução do Node.js é **assíncrona**, ou seja, enquanto a conexão estava sendo estabelecida, a execução da aplicação continua. Só após a conexão se estabelecer, a mensagem de confirmação será exibida.

- Configuramos o registro do evento `error` com o `logger.error()` e o registro do evento `disconnected` com o `logger.warn()`.

Toda aplicação deveria possuir no mínimo 02 instâncias sendo executadas simultaneamente para que se 01 delas falhar, a outra assuma imediatamente. No caso de desconexão, só precisamos receber um `warning` (aviso) e esperar que a instância seja reciclada (finalizada e inicializada novamente).

No caso de um erro no banco de dados, o problema pode ser muito mais grave e requer uma atenção mais imediata. Quando há desconexão de uma das instâncias, normalmente acontece apenas com uma delas. Quando há erro no banco de dados, normalmente é um problema que afeta todas as instâncias. Nesse caso devemos utilizar o tipo de registro `error` (erro).

- Tanto no evento `disconnected` quanto no evento `error`, o mais correto é encerrar a aplicação para que ela seja reciclada. O processo de reciclagem depende da infraestrutura em que a aplicação foi implantada.

## Mundo Real

### Segurança

**Não utilize** o usuário `admin` para se conectar no banco de dados, crie um usuário específico para essa finalidade. Perder as credenciais do usuário comum já te trará muitos problemas, imagine perder as credenciais do usuário `admin`.

**Utilize** uma senha forte para o usuário da sua aplicação.

### Infraestrutura

Uma das coisas mais valiosas de uma aplicação são as informações do banco de dados. Se você não tem experiência suficiente para implantar sua própria instância de banco de dados, contrate um serviço na nuvem.

Se você optar por utilizar serviços na nuvem, **não utilize** os planos gratuitos, eles não estão preparados para isso. Contrate o serviço.

## Resumo

- Aprendemos a configurar e conectar a aplicação no banco de dados
- Entendemos a importância de monitorar os eventos do banco de dados para a tomada de decisão
- Entendemos as implicações de segurança e infraestrutura de um banco de dados
