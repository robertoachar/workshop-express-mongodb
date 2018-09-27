# Healthz

**Healthz** é uma técnica de monitoramento muito utilizada pelo time de **DevOps**. Ela consiste em verificar periodicamente a "saúde" (health) da aplicação. O termo _healthz_ foi introduzido pelo Google e é amplamente utilizado dentro da empresa.

O objetivo dessa técnica é fazer requisições periódicas em uma determinada rota da aplicação para certificar que a aplicação está disponível e funcional. Por convenção, utilizamos a rota `/healthz`.

## Criando a rota /healthz

Para criar a rota `/heathz`, edite o arquivo `router.js`.

```javascript
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'It works!' });
});

// rota healthz
router.get('/healthz', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
```

Abra o Postman e faça uma requisição `GET` em `http://localhost:3000/healthz`. O resultado deve ser o _status_ `200 OK`.

```text
OK
```

## Implementando a rota /healthz

Como a aplicação se conecta com um banco de dados, a API só pode ser considerada saudável se a comunicação com o banco também estiver. Não adianta receber requisições se não há comunicação com o banco.

Essa rota precisa decidir se a aplicação está ou não saudável e para isso é necessário validar se a conexão com o banco está funcionando.

Abra o arquivo `router.js` e altere a rota `/healthz`.

```javascript
router.get('/healthz', (req, res) => {
  mongoose.connection.db
    .admin()
    .ping()
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
});
```

A função `ping()` é utilizada para testar se um servidor está respondendo aos comandos. Quando a rota `/healthz` for solicitada, o Mongoose realiza um `ping` no banco de dados. Se a conexão estiver ativa, a rota retorna o _status_ `200 OK`, caso contrário ela retorna o _status_ `500 Internal Server Error`.

::: tip Dica
Se a aplicação utilizasse mais algum serviço além do banco de dados, como por exemplo um serviço de _cache_, nós deveríamos testar também se o serviço de _cache_ está ativo.
:::

## Mundo Real

Quando trabalhamos com aplicações em _Containers_, utilizamos essa técnica para verificar periodicamente se aquela instância está ativa. Quando a instância responder com o erro `500 Internal Server Error`, precisamos reciclar a aplicação, ou seja, encerrar a instância falha e inicializar uma nova.

No Kubernetes, por exemplo, utilizamos essa técnica tanto para verificar a "saúde" da instância bem como para saber se ela já está disponível para receber requisições no momento da inicialização.

## Resumo

- Aprendemos sobre a técnica Healthz
- Entendemos a importância de utilizar essa técnica nas aplicações
- Implementamos a rota `/healthz` no Express para verificar a saúde da aplicação
