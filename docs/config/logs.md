# Registro de aplicações

Uma das funcionalidades básicas de qualquer aplicação é a capacidade de exibir os registros de execução da aplicação. As opções de registro mais utilizadas são: `info` (informações), `warning` (avisos) e `error` (erros).

## Winston

**Winston** é uma biblioteca de registros e foi projetada para realizar o registro das informações da aplicação de forma **assíncrona**, respeitando a arquitetura do Node.js.

Para mais informações sobre o Winston, acesse [https://github.com/winstonjs/winston](https://github.com/winstonjs/winston).

## Instalando o Winston

Para instalar o Winston, abra o Terminal e digite:

```bash
$ npm i winston
```

Esse comando instala o Winston como dependência no `package.json`.

```json
  "dependencies": {
    "winston": "3.1.0"
  }
```

## Utilizando o Winston

Para utilizar o Winston no projeto, edite o arquivo `index.js`.

```javascript
const winston = require('winston');

winston.info('Hello Winston');
```

Salve o arquivo e aguarde o Nodemon reiniciar a aplicação. Assim que a aplicação for reiniciada, a seguinte informação é exibida no Terminal.

```text
[winston] Attempt to write logs with no transports {"message":"Hello Winston","level":"info"}
```

O **Winston** foi projetado para trabalhar com transportes. Um transporte é uma opção de armazenamento dos registros das aplicações. Esses armazenamentos podem ser um arquivo de texto, uma conexão com o banco de dados ou uma simples saída no `stdout`.

## Centralizando o registro de aplicações

Uma técnica muito interessante para realizar o registro de aplicações é separar a lógica em um módulo e reutilizá-lo em toda a aplicação. Os benefícios do módulo de registros são:

- Padronizar as informações dos registros
- Facilidade para adicionar ou alterar os transportes
- Possibilidade de trocar a biblioteca de registros

## Criando o módulo de registro de aplicações

Como o Winston trabalha com transportes, devemos configurar no mínimo um transporte. Nesse treinamento iremos utilizar o tipo de tranporte `Console` que é parecido com as funcionalidades do `console` do Node.js.

Para mais informações sobre os transportes do Winston, acesse: [https://github.com/winstonjs/winston#transports](https://github.com/winstonjs/winston#transports).

Para criar o módulo de registro de aplicações, crie o arquivo `logger.js`.

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [new winston.transports.Console()]
});

module.exports = logger;
```

Esse módulo exporta o objeto `logger` com as funções do Winston e pode ser utilizado por toda a aplicação.

Para utilizar o módulo na aplicação, edite o arquivo `index.js`.

```javascript
const logger = require('./logger');

logger.info('Hello Winston');
```

Salve o arquivo e aguarde o Nodemon reiniciar a aplicação. Assim que a aplicação for reiniciada, a seguinte informação é aprensentada no Terminal.

```bash
info: Hello Winston
```

## Mundo Real

### console

Embora o `console` seja a opção mais utilizada pela maioria dos desenvolvedores, ela pode impactar no desempenho da aplicação.

O Node.js foi contruído para trabalhar com instruções **assíncronas** e é extremamente importante respeitar essa arquitetura. Em algumas situações, o `console` pode se comportar de forma **síncrona**, fazendo com que a execução do Node.js seja bloqueada até que o `console` finalize sua execução.

O `console` pode ser utilizado no ambiente de desenvolvimento, mas **não deve** ser utilizado no ambiente de produção. Existem outras formas de realizar o registro das atividades da aplicação, sem utilizar o `console`.

Para mais informações sobre a arquitetura do Node.js, acesse o [Guia oficial do Node.js](https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/).

### ESLint

Utilize o ESLint para não permitir a utilização do `console`. Quando a análise estática for realizada, o ESLint irá sinalizar quais arquivos estão violando a regra. Os arquivos iniciais desse treinamento já estão com essa regra configurada.

Caso você não esteja utilizando as configurações do ESLint fornecidas por esse treinamento e queira habilitar a regra manualmente, edite o arquivo `eslintrc.json`.

```json
  "rules": {
    "no-console": "error"
  }
```

### Custo

O registro de aplicações, mais conhecidos como `logs`, são registros como qualquer outro e eles consomem espaço em disco. Evite registrar informações desnecessárias para não impactar no custo do projeto. Dependendo da quantidade de `logs` de uma aplicação, o armazenamento do `log` custa mais caro que a própria aplicação.

Existem maneiras de reduzir o custo dos `logs` de uma aplicação, reduzindo a quantidade de registros que devem ser retidos. Essa parametrização varia de provedor para provedor.

## Resumo

- Implementamos o módulo de registro de aplicações
- Aprendemos os benefícios de utilizar módulos nas aplicações
- Entendemos a importância de **não utilizar** instruções **síncronas** para não bloquear a execução do Node.js
- Conhecemos uma alternativa ao `console` para realizar o registro de aplicações de forma **assíncrona**
