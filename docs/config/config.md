# Configurações

Outra funcionalidade básica de qualquer aplicação é a capacidade de carregar as configurações dinamicamente. As configurações podem ser: definição do ambiente de execução (`development` (desenvolvimento), `staging` (homologação), `test` (testes) e `production` (produção)), definição da porta de comunicação do servidor web, detalhes da conexão com o banco de dados, entre outras.

Essas configurações não devem ser informadas diretamente no código-fonte, elas devem ser carregadas dinamicamente durante a inicialização da aplicação para que os valores sejam compartilhados entre os módulos.

No Node.js, essas configurações são informadas através de variáveis de ambientes e carregadas pela aplicação através do objeto `process.env`.

## Dotenv

**Dotenv** é uma ferramenta que carrega as variáveis de ambiente dinamicamente do arquivo `.env` e disponibiliza os valores no objeto `process.env`.

Para mais informações sobre o Dotenv, acesse [https://www.npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv).

## Instalando o Dotenv

Para instalar o Dotenv, abra o Terminal e digite:

```bash
$ npm i dotenv
```

Esse comando instala o Dotenv como dependência no `package.json`.

```json
  "dependencies": {
    "dotenv": "6.0.0"
  },
```

## Utilizando o Dotenv

Para utilizar o Dotenv no projeto, crie o arquivo `.env`.

```yaml
NODE_ENV = development
```

Nesse arquivo estamos definindo a variável de ambiente `NODE_ENV` com o valor `development`.

Para utilizar as variáveis de ambiente na aplicação, edite o arquivo `index.js`.

```javascript
require('dotenv').config();

const logger = require('./logger');

logger.info('Hello dotenv');
logger.info(`NODE_ENV: ${process.env.NODE_ENV}`);
```

Essa aplicação apresenta o seguinte resultado na saída do Terminal.

```text
info: Hello dotenv
info: NODE_ENV: development
```

## Centralizando as configurações

Da mesma maneira como fizemos com o módulo de registro de aplicações, é importante separar as configurações em um módulo separado. Os benefícios do módulo de configurações são:

- Centralizar as informações das configurações
- Testar se todas as configurações foram informadas antes de iniciar a aplicação
- Possibilidade de trocar a biblioteca de configurações

## Restringindo as configurações

O primeiro passo para garantir que as configurações sejam disponibilizadas apenas pelo módulo de configurações, devemos adicionar um regra no ESLint para não permitir o uso do objeto `process.env`.

Para adicionar a regra no ESLint, edite o arquivo `.eslintrc.json`.

```json
{
  "extends": ["airbnb-base", "plugin:prettier/recommended"],
  "env": {
    "es6": true
  },
  "rules": {
    "no-process-env": "error"
  }
}
```

Para realizar a análise estática na aplicação, abra o Terminal e digite:

```bash
$ npm run lint
```

O resultado da análise estática apresenta 01 erro.

```text
/src/index.js
  6:26  error  Unexpected use of process.env  no-process-env

✖ 1 problem (1 error, 0 warnings)
```

::: tip Dica
A extensão ESLint do VS Code sublinha o código-fonte em vermelho e sinaliza que o uso do objeto `process.env` não é permitido.
:::

Pronto, acabamos de restringir o uso do objeto `process.env`. Agora precisamos centralizar as configurações em um módulo.

## Criando o módulo de configurações

Para criar o módulo de configurações, crie o arquivo `config.js`.

```javascript
// importar o dotenv e carregar as configurações do arquivo .env
require('dotenv').config();

// definir as variáveis de ambiente obrigatórias
const environment = ['NODE_ENV'];

// percorrer as variáveis de ambiente obrigatórias
// e disparar um erro caso ela não seja informada
environment.forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`${name}: ${process.env[name]}`);
  }
});

// exportar um objeto com as configurações
module.exports = {
  NODE_ENV: process.env.NODE_ENV
};
```

Realize a análise estática mais uma vez para ver o resultado. Para realizar a análise estática, abra o Terminal e digite:

```bash
$ npm run lint
```

O resultado da análise estática apresenta 04 erros.

```text
/src/config.js
   6:8   error  Unexpected use of process.env  no-process-env
   7:33  error  Unexpected use of process.env  no-process-env
  12:13  error  Unexpected use of process.env  no-process-env

/src/index.js
  6:26  error  Unexpected use of process.env  no-process-env

✖ 4 problems (4 errors, 0 warnings)
```

Como o módulo `config` é o único módulo em que é permitido utilizar `process.env`, nós precisamos criar uma exceção para o ESLint. Para criar uma exceção no ESLint e permitir o uso do objeto `process.env` apenas módulo `config`, adicione a seguinte linha no começo do arquivo `config.js`.

```javascript
/* eslint no-process-env: 0 */
```

Realize a análise estática mais uma vez para ver o resultado. Para realizar a análise estática, abra o Terminal e digite:

```bash
$ npm run lint
```

O resultado da análise estática apresenta apenas 01 erro.

```text
/src/index.js
  6:26  error  Unexpected use of process.env  no-process-env

✖ 1 problem (1 error, 0 warnings)
```

## Utilizando o módulo de configurações

Para utilizar o módulo de configurações na aplicação, edite o arquivo `index.js`.

```javascript
// importar os módulos de configurações e registro de aplicações
const config = require('./config');
const logger = require('./logger');

// imprimir Hello dotenv
logger.info('Hello dotenv');
// imprimir NODE_ENV: development
logger.info(`NODE_ENV: ${config.NODE_ENV}`);
```

Vamos entender detalhadamente o que será executado:

1. A aplicação inicia e importa os módulos de configurações e registro de aplicações.
2. Quando o módulo de configurações é importado, ele utiliza o `dotenv` para carregar as variáveis de ambiente do arquivo `.env` e disponibiliza os valores no objeto `process.env`.
3. O módulo de configurações verifica se as variáveis de ambiente obrigatórias foram informadas, caso contrário o módulo dispara um erro.
4. O módulo de configurações exporta um objeto que contém a propriedade `NODE_ENV` com o valor de `process.env.NODE_ENV`.
5. A aplicação utiliza o módulo de registro para imprimir `Hello dotenv` e o valor de `NODE_ENV`, que está definido como `development` no arquivo `.env`.

Realize a análise estática mais uma vez para ver o resultado. Para realizar a análise estática, abra o Terminal e digite:

```bash
$ npm run lint
```

O resultado da análise estática não apresenta erros.

## Mundo Real

Informar as configurações diretamente no código-fonte pode gerar problemas de segurança. Um exemplo seria se os detalhes de conexão com o banco de dados estivessem expostos no código-fonte, qualquer desenvolvedor com acesso ao código, teria acesso ao banco de dados.

### Protegendo as configurações

As configurações carregam informações sensíves (secretas) da aplicação e devem ser protegidas. O arquivo `.env` **não deve** ser enviado ao controle de versão para que essas informações não sejam reveladas.

::: tip Dica
O arquivo `.gitignore`, responsável por excluir arquivos e diretórios do controle de versão, já está configurado para ignorar o arquivo `.env`.
:::

O carregamento das configurações para o ambiente de produção será abordado no `Módulo de Implantação`.

::: tip Dica
Uma boa prática é adicionar um exemplo do arquivo `.env` no `README` do projeto para auxiliar outros desenvolvedores. Essa etapa será abordada no `Módulo de Documentação`.
:::

## Resumo

- Implementamos o módulo de configurações
- Entendemos a utilidade da análise estática, além de criar regras e exceções para o ESLint
- Entendemos a importância de **não utilizar** certas informações direto no código-fonte
- Entendemos a importância de **não versionar** o arquivo `.env`
