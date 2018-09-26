# Ambiente de Desenvolvimento

Nessa seção você encontrará as instruções necessárias para preparar seu ambiente de desenvolvimento.

## Editor de Código

Você pode utilizar qualquer editor de códigos para desenvolver seus projetos em Node.js. Pessoalmente, eu indico a utilização do [VS Code](https://code.visualstudio.com/) da Microsoft. O VS Code é um editor de códigos gratuito, de código-fonte aberto e tem suporte aos 03 principais sistemas operacionais atualmente: **Linux**, **macOS** e **Windows**. Além disso ele disponibiliza um Terminal integrado para melhorar a experiência do desenvolvedor.

Para instalar o VS Code, acesse a [página de downloads](https://code.visualstudio.com/#alt-downloads) e escolha a versão correta para o seu sistema operacional.

::: tip Versões do VS Code
**Stable** é a versão estável. **Insiders** é a versão com funcionalidades experimentais.

**Obs.:** Na dúvida, utilize a versão Stable.
:::

## Node.js

**Node.js** é um ambiente de execução de JavaScript que roda sob o V8 do Chrome.

Para instalar o Node.js, acesse o site oficial do [Node.js](https://nodejs.org/) e siga as instruções para instalar a versão correta para o seu sistema operacional. O Node.js está disponível para os 03 sistemas operacionais mais utilizados atualmente: **Linux**, **macOS** e **Windows**.

::: tip Versões do Node.js
**LTS** é a versão estável. **Current** é a versão com funcionalidades experimentais.

**Obs.:** Na dúvida, utilize a versão LTS.
:::

Para validar a instalação do Node.js, abra o Terminal e digite:

```bash
$ node -v
v10.10.0
```

Se a instalação estiver correta, o comando irá apresentar a versão instalada no seu sistema operacional. No meu caso, a versão é a **v10.10.0**.

## npm

**npm** é o acrônimo para **Node Package Manager**, ou Gerenciador de Pacotes do Node. A instalação padrão do Node.js também instala o [npm](https://www.npmjs.com/).

Para validar a instalação do npm, abra o Terminal e digite:

```bash
$ npm -v
6.4.1
```

Se a instalação estiver correta, o comando irá apresentar a versão instalada no seu sistema operacional. No meu caso, a versão é a **v6.4.1**.

::: warning Autalização do npm
O instalador do Node.js nem sempre instala a última versão do npm.
:::

Para atualizar o npm para a versão mais recente, abra o Terminal e digite:

```bash
$ npm i -g npm
```

Para validar a atualização, digite:

```bash
$ npm -v
```

## MongoDB

**MongoDB** é um banco de dados de documentos. Ele armazena os dados de forma semelhante a um documento JSON. Seus campos e dados podem variar de documento para documento. Você pode optar por utilizar o MongoDB de 02 formas: instalação local ou serviço remoto.

### Instalação local

Para instalar o MongoDB, acesse o site oficial do [MongoDB](https://www.mongodb.com/) e siga as instruções para instalar a versão correta para o seu sistema operacional. Escolha a versão _Community Edition_. O MongoDB está disponível para os 03 sistemas operacionais mais utilizados atualmente: **Linux**, **macOS** e **Windows**.

- [Instruções de Instalação para o Linux](https://docs.mongodb.com/manual/administration/install-on-linux/).
- [Instruções de Instalação para o macOS](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/).
- [Instruções de Instalação para o Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/).

::: tip Dica
Não esqueça de criar o diretório `data/db`.
:::

Para validar a instalação, abra o Terminal e digite:

```bash
$ mongo

MongoDB shell version v3.4.2
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 3.4.2
Server has startup warnings:
2018-09-24T21:05:44.839-0300 I CONTROL  [initandlisten]
2018-09-24T21:05:44.839-0300 I CONTROL  [initandlisten] ** WARNING: Access control is not enabled for the database.
2018-09-24T21:05:44.839-0300 I CONTROL  [initandlisten] **          Read and write access to data and configuration is unrestricted.
2018-09-24T21:05:44.840-0300 I CONTROL  [initandlisten]
>
```

::: tip Dica
Para sair do MongoDB, digite `quit()` e pressione `Enter` ou pressione `Ctrl + C`.
:::

### Serviço remoto

Caso você não queira instalar o MongoDB na sua máquina, você pode utilizar qualquer serviço de hospedagem de banco de dados MongoDB. Eu recomendo o serviço da [mLab](https://mlab.com/), pois oferece um plano gratuito de 500MB, espaço mais que necessário para realizar o treinamento.

Para criar uma instância remota do MongoDB, acesse a [página da mLabs](https://mlab.com/signup/), faça o cadastro e siga as intruções para criar um novo banco de dados. Com o banco de dados criado, crie um usuário com permissão de escrita e leitura. Esse usuário será utilizado para se conectar ao banco de dados através da API.

::: tip Dica
As informações de conexão com o banco de dados serão utilizadas no [Módulo 02: Configurações > Banco de Dados](../config/database.html#configurando-a-conexao).
:::

## Ferramenta de Degub e Teste

Quando trabalhamos com desenvolvimento de APIs é essencial ter uma ferramenta que auxilie no _debug_ e teste dos _endpoints_. Você pode utilizar qualquer ferramenta para realizar os testes. Eu recomendo 02 ferramentas: [Postman](https://www.getpostman.com/) e [Insomnia](https://insomnia.rest/).

Para esse treinamento eu vou utilizar o **Postman**.

::: tip Dica
Se você quiser algo mais _Hard Core_ você pode utilizar o `curl`.
:::

### Postman

Para instalar o Postman, acesse [a página de downloads](https://www.getpostman.com/apps) e siga as instruções para instalar a versão correta para o seu sistema operacional. O Postman está disponível para os 03 sistemas operacionais mais utilizados atualmente: **Linux**, **macOS** e **Windows**.

### Insomnia

Para instalar o Insomnia, acesse [a página de downloads](https://insomnia.rest/download/) e siga as instruções para instalar a versão correta para o seu sistema operacional. O Insomnia está disponível para os 03 sistemas operacionais mais utilizados atualmente: **Linux**, **macOS** e **Windows**.
