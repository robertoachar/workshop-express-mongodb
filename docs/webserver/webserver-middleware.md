# Middlewares

**Middlewares** são funcões que tem acesso aos objetos `req` (request) e `res` (response), respectivamente requisição e resposta. Os _middlewares_ podem executar qualquer tipo de código e realizar alterações nos objetos `req` e `res`, entre outros.

## Segurança

O Express é apenas um _framework_ que disponibiliza um servidor Web com um conjunto de recursos necessários para a criação de uma API robusta. Esse servidor precisa ser protegido e é tarefa do desenvolvedor configurar alguns _middlewares_ para elevar o nível de segurança do Express.

## Helmet

**Helmet** é um _middleware_ de segurança que ajuda a proteger o Express, fazendo ajustes nos cabeçalhos HTTP. Por padrão, o Helmet possui as seguintes proteções:

- [DNS Prefetch Control](https://helmetjs.github.io/docs/dns-prefetch-control) - `X-DNS-Prefetch-Control`
- [Frameguard](https://helmetjs.github.io/docs/frameguard) - `X-Frame-Options`
- [Hide Powered-By](https://helmetjs.github.io/docs/hide-powered-by) - `X-Powered-By`
- [HSTS](https://helmetjs.github.io/docs/hsts) - `Strict-Transport-Security`
- [IE No Open](https://helmetjs.github.io/docs/ienoopen) - `X-Download-Options`
- [Don't Sniff Mimetype](https://helmetjs.github.io/docs/dont-sniff-mimetype) - `X-Content-Type-Options`
- [XSS Filter](https://helmetjs.github.io/docs/xss-filter) - `X-XSS-Protection`

Para mais informações sobre o Helmet, acesse [https://helmetjs.github.io/](https://helmetjs.github.io/).

### Cabeçalho padrão do Express

Para visualizar os cabeçalhos da resposta, abra o Postman e faça uma requisição `GET` em `http://localhost:3000` e inspecione a aba `Headers`.

```text
Connection → keep-alive
Content-Length → 13
Content-Type → text/html; charset=utf-8
Date → Sat, 22 Sep 2018 21:07:27 GMT
ETag → W/"d-oPRzYb9qK1AQJa1lUfQSoZqXcws"
X-Powered-By → Express
```

### Instalando o Helmet

Para instalar o Helmet, abra o Terminal e digite:

```bash
$ npm i helmet
```

Esse comando instala o Helmet como dependência no `package.json`.

```json
  "dependencies": {
    "helmet": "3.13.0"
  }
```

### Integração com o Express

Para integrar o Helmet no Express, edite o arquivo `app.js`.

```javascript
const express = require('express');
const helmet = require('helmet'); // importar o Helmet

const app = express();

app.use(helmet()); // habilitar o Helmet

app.get('/', (req, res) => res.json({ message: 'Hello Express' }));

module.exports = app;
```

Para visualizar os cabeçalhos da resposta, abra o Postman e faça uma requisição `GET` em `http://localhost:3000` e inspecione a aba `Headers`.

```text
Connection → keep-alive
Content-Length → 13
Content-Type → text/html; charset=utf-8
Date → Sat, 22 Sep 2018 21:10:22 GMT
ETag → W/"d-oPRzYb9qK1AQJa1lUfQSoZqXcws"

--- Helmet ---

Strict-Transport-Security → max-age=15552000; includeSubDomains
X-Content-Type-Options → nosniff
X-DNS-Prefetch-Control → off
X-Download-Options → noopen
X-Frame-Options → SAMEORIGIN
X-XSS-Protection → 1; mode=block
```

O Helmet fez as alterações no cabeçalho e adicionou as proteções no Express. É importante notar que ele removeu o `X-Powered-By: Express`.

## CORS

**CORS** é o acrônimo para **Cross-Origin Resource Sharing** que significa **Compartilhamento de Recursos de Origem Cruzada**. CORS é uma especificação que define quais e como os recursos de um servidor podem ser acessados. Devemos configurar o CORS para elevar o nível de segurança da API. O CORS permite definir:

- Quais origens (domínios) podem realizar requisições
- Quais métodos podem ser utilizados
- Quais cabeçalhos são permitidos

Para mais informações sobre o CORS, acesse [MDN - CORS](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Controle_Acesso_CORS).

### Instalando o CORS

Para instalar o CORS, abra o Terminal e digite:

```bash
$ npm i @robertoachar/express-cors
```

Esse comando instala o CORS como dependência no `package.json`.

```json
  "dependencies": {
    "@robertoachar/express-cors": "1.0.2"
  }
```

### Intergração com o Express

Para integrar o CORS no Express, edite o arquivo `app.js`.

```javascript
const cors = require('@robertoachar/express-cors'); // importar o CORS
const express = require('express');
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(cors()); // habilitar o CORS

app.get('/', (req, res) => res.json({ message: 'Hello Express' }));

module.exports = app;
```

Para visualizar os cabeçalhos da resposta, abra o Postman e faça uma requisição `GET` em `http://localhost:3000` e inspecione a aba `Headers`.

```text
Access-Control-Allow-Headers → Authorization, Content-Type
Access-Control-Allow-Methods → GET, POST, PUT, PATCH, DELETE
Access-Control-Allow-Origin → *
```

Esse _middleware_ configura o CORS com as opções mais comuns utilizadas por APIs públicas. Ele permite acesso de quaquer origem, aceita os métodos `GET`, `POST`, `PUT`, `PATCH` e `DELETE`, e aceita os cabeçalhos `Authorization` e `Content-Type`.

::: tip Dica
Caso seu cenário não seja tão permissivo, você tem 02 opções:

1. Utilizar outro _middleware_.
2. Configurar o CORS direto no Express.

:::

## Desempenho

Outro fator que deve ser levado em conta na construção de uma aplicação é o desempenho. Existem diversas técnicas para melhorar o desempenho de uma aplicação. Uma delas é diminuir a quantidade de dados que é trafegado entre o cliente e o servidor.

## compression

**compression** é um _middleware_ de desempenho que auxilia o Express a comprimir os dados que são trafegados. O compression suporta `deflate` e `gzip`.

Para mais informações sobre o compression, acesse [https://github.com/expressjs/compression](https://github.com/expressjs/compression).

### Instalando o compression

Para instalar o compression, abra o Terminal e digite:

```bash
$ npm i compression
```

Esse comando instala o compression como dependência no `package.json`.

```json
  "dependencies": {
    "compression": "1.7.3"
  }
```

### Integração com o Express

Para integrar o compression no Express, edite o arquivo `app.js`.

```javascript
const compression = require('compression'); // importar o compression
const cors = require('@robertoachar/express-cors');
const express = require('express');
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(compression()); // habilitar o compression
app.use(cors());

app.get('/', (req, res) => res.json({ message: 'Hello Express' }));

module.exports = app;
```

## Utilidade

Os _middlewares_ não servem apenas para segurança e desempenho. Existem _middlewares_ que estendem as funcionalidades do Express e facilitam algumas tarefas.

## body-parser

**body-parser** é um _middleware_ de utilidades. Ele analisa (parse) a requisição antes de chegar nas rotas e disponibiliza o objeto `req.body` com os dados que foram enviados através das requisições. Ele suporta `application/json` e `application/x-www-form-urlencoded`.

Para mais informações sobre o body-parser, acesse [https://github.com/expressjs/body-parser](https://github.com/expressjs/body-parser).

### Instalando o body-parser

Para instalar o body-parser, abra o Terminal e digite:

```bash
$ npm i body-parser
```

Esse comando instala o body-parser como dependência no `package.json`.

```json
  "dependencies": {
    "body-parser": "1.18.3"
  }
```

### Integração com o Express

Para integrar o body-parser no Express, edite o arquivo `app.js`.

```javascript
const bodyParser = require('body-parser'); // importar o body-parser
const compression = require('compression');
const cors = require('@robertoachar/express-cors');
const express = require('express');
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false })); // application/x-www-form-urlencoded
app.use(bodyParser.json()); // application/json

app.get('/', (req, res) => res.json({ message: 'Hello Express' }));

module.exports = app;
```

## Mundo Real

::: danger Nota
Não existe "bala de prata", mas os _middlewares_ ajudam a melhorar a segurança.
:::

É importante você entender que toda aplicação Web está suscetível à ataques. E é mais importante ainda entender que é sua responsabilidade manter a aplicação segura.

Procure manter os middlewares de segurança sempre atualizados.

## Resumo

- Configuramos alguns middlewares no servidor Web
- Entendemos a importância de utilizar pelo menos os middlewares de segurança
