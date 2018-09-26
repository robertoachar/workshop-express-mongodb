# Reinício Automático

Quando estamos desenvolvendo um projeto, uma das tarefas que atrapalha a produtividade é reiniciar o projeto sempre que realizamos alguma alteração no código-fonte. Ferramentas de reinício automático foram criadas para solucionar esse problema.

## Nodemon

**Nodemon** é uma ferramenta que monitora as alterações realizadas no código-fonte e reinicia o projeto automaticamente.

Para mais informações sobre o Nodemon, acesse o site [https://nodemon.io/](https://nodemon.io/).

## Instalando o Nodemon

Para instalar o Nodemon, abra o Terminal e digite:

```bash
$ npm i -D nodemon
```

Esse comando instala o Nodemon como dependência de desenvolvimento no `package.json`.

```json
  "devDependencies": {
    "nodemon": "1.18.4"
  }
```

## Integração com o npm

Para utilizar o Nodemon através do npm, edite o arquivo `index.js`:

```js
console.log('Hello Node');
```

Altere o script `start` no arquivo `package.json`:

```json
  "scripts": {
    "start": "nodemon src/index.js"
  }
```

## Testando a integração com o npm

Para executar o Nodemon através do npm, abra o Terminal e digite:

```bash
$ npm start
```

Esse script executa o comando `nodemon src/index.js` e exibe a seguinte informação na saída do Terminal.

```bash
[nodemon] 1.18.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node src/index.js`
Hello Node
[nodemon] clean exit - waiting for changes before restart
```

Esse `log` informa que o Nodemon está em modo de monitoração, executou o comando `node src/index` e está aguardando novas alterações.

Faça uma alteração no código e salve para reiniciar o Nodemon.

```js
console.log('Hello Nodemon');
```

Assim que o arquivo for salvo, a seguinte informação é exibida na saída do Terminal.

```bash
[nodemon] restarting due to changes...
[nodemon] starting `node src/index.js`
Hello Nodemon
[nodemon] clean exit - waiting for changes before restart
```

Esse `log` informa que o projeto foi reiniciado, as novas alterações foram refletidas e ele continua monitorando os arquivos para novas alterações.

::: tip Dica
Para encerrar o Nodemon, pressione `Ctrl + C`.
:::

::: warning Forçar reinício
Raramente o Nodemon não consegue reiniciar o projeto automaticamente.

Para forçar o reinício, digite `rs` e pressione `Enter`.
:::

## Mundo Real

Embora seja uma ferramenta indispensável no ciclo de desenvolvimento, você **não deve** utilizar o Nodemon no ambiente de produção, pois ele não foi criado para esse propósito. Existem ferramentas específicas para esse cenário. Esse é o motivo de instalar o Nodemon como dependência de desenvolvimento do projeto.

No **Módulo de Implantação** veremos algumas alternativas que podem ser utilizadas para garantir que a aplicação seja reiniciada quando houver alteração no código-fonte ou falha.

## Resumo

- Aprendemos a configurar o reinício automático da aplicação
- Entendemos que o Nodemon **não deve** ser utilizado no ambiente de produção
