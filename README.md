# Hiring Coders - Desafio Final - AWS

Projeto de Desenvolvimento Web realizado pelo Grupo 11 como entrega do Desafio Final do Hiring Coders 2021, programa educacional estruturado pela Gama Academy e pela VTEX com apoio da AWS, ACCT, we.digi, Corebiz, Whirlpool e Loja Integrada.

[![Watch the video](https://github.com/victorfabricio/aws-page/blob/main/AWS-PAGE/assets/home.png)](https://youtu.be/c4cF8eS0tVc)
​

## Sumário

- [Introdução](#introdução)
- [Integrantes](#integrantes)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Visão Geral](#visão-geral)
- [Referências](#referências)

## Introdução

Neste Desafio Final foi desenvolvido um site de ecommerce com base no site oficial da [AWS](https://aws.amazon.com/pt/) com o VTEX IO e com duas APIs de integração, a fim de registrar tanto os visitantes que preenchecem o formulário de Newsletter como os visitantes que realizassem uma compra.

## Integrantes

- [Adriano Matos](https://github.com/adrianomatos)
- [Erik Chagas Rozal](https://github.com/erikchagas)
- [Jessiane Saiara de Souza Macedo](https://github.com/jessiannesaiara)
- [Geraldo Dias Gomes Júnior](https://github.com/JuniorrGoD)
- [Joir Antonio de Souza Neto](https://github.com/joirneto)
- [Julia Kahvedjian Amadio](https://github.com/JKAmadio)
- [Lafaiete do Vale](https://github.com/lafadovale)
- [Luiz Guilherme de Vasconcelos Moreira](https://github.com/LuizGVM)
- [Victor Fabricio Caires Pereira](https://github.com/victorfabricio)

## Tecnologias Utilizadas

- VTEX IO
- NodeJs
- React
- AWS API Gateway
- AWS Lambda
- AWS DynamoDB

## Visão Geral

Ecommerce desenvolvido com base no site da [AWS](https://aws.amazon.com/pt/) e com utilização do VTEX IO como base do sistema. Os produtos foram cadastrados no sistema da VTEX com valores fictícios. Ao acessar o site, o usuário tem quatro opções no menu principal:

> **Home**: acesso à página inicial do site;
>
> **Soluções**: acesso aos serviços oferecidos pela AWS;
>
> **Sobre**: acesso às informações da AWS;
>
> **Leads**: acesso à lista de usuários cadastrados como _leads_ do site

No final da página o usuário pode se cadastrar para receber as Newsletters da AWS e após seu cadastro, seus dados são exibidos na página **Leads** do menu principal. Caso o usuário se cadastre com um email já inscrito ele recebe um aviso de que já está cadastrado no banco de dados.

Estes dados dos usuários estão sendo armazenados na tabela do AWS DynamoDB, através de quatro funções AWS Lambda diferentes, criadas em JavaScript, sendo uma para cada tipo de método:

> **GET**: mostrar todos os usuários já cadastrados, ou apenas um usuário específico com base em seu id, que no caso é o endereço de email (duas rotas)
>
> **POST**: armazenar o novo usuário que se cadastrou
>
> **PATCH**: modificar a categoria do usuário de "lead" para "cliente"
>
> **DELETE**: deletar um usuário específico com base em seu endereço de email

Ao finalizar uma compra, a API VTEX faz uma requisição PATCH para a API Gateway e a categoria do usuário é alterada de "lead" para "cliente" no DynamoDB.

---

### Métodos **GET** :

```Javascript
const AWS = require("aws-sdk");

// Set the region
AWS.config.update({region: 'sa-east-1'});

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };
  try {
    switch (event.routeKey) {
      case "GET /leads/{id}":
        body = await dynamo
          .get({
            TableName: "tableName",
            Key: {
              id: event.pathParameters.id
            }
          })
          .promise();
        break;
      case "GET /leads":
        body = await dynamo.scan({ TableName: "hcfinal" }).promise();
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }
  return {
    statusCode,
    body,
    headers
  };
};
```

---

### Método **POST** :

```Javascript
let AWS = require('aws-sdk');

// Set the region
AWS.config.update({region: 'sa-east-1'});

// Create the DynamoDB service object
var dynamo = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

exports.handler = async function(event, context, callback) {

  let requestJSON = JSON.parse(event.body);

  const params = {
    TableName: "tablename",
    Item: {
      id: requestJSON.id,
      email: requestJSON.email,
      name: requestJSON.name,
      phone: requestJSON.phone,
      level: requestJSON.level
    },
  };
  try {
    await dynamo.put(params).promise();
    return event.body;
  } catch(err) {
    console.error(err);
  }
};
```

---

### Método **PATCH** :

```Javascript
const AWS = require("aws-sdk");

// Set the region
AWS.config.update({region: 'sa-east-1'});

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };
  try {
    await dynamo
      .update({
        TableName: "hcfinal",
        Key: {
          id: event.pathParameters.id
        },
        UpdateExpression: "set category = :c",
        ExpressionAttributeValues:{
          ":c": "customer"
        }
      })
        .promise();
        body = `User ${event.pathParameters.id} updated to customer`;
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }
  return {
    statusCode,
    body,
    headers
  };
};
```

---

### Método **DELETE** :

```Javascript
const AWS = require("aws-sdk");

// Set the region
AWS.config.update({region: 'sa-east-1'});

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };
  try {
    await dynamo
      .delete({
        TableName: "hcfinal",
        Key: {
          id: event.pathParameters.id
        }
      })
        .promise();
    body = `Deleted user ${event.pathParameters.id}`;
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }
  return {
    statusCode,
    body,
    headers
  };
};
```

## Referências

- [Documentação da VTEX](https://developers.vtex.com/vtex-developer-docs/docs/welcome)
- [Learning Path da VTEX](https://learn.vtex.com/page/learning-path-lang-pt)
- [Usando AWS Lambda com Amazon API Gateway](https://docs.aws.amazon.com/lambda/latest/dg/services-apigateway.html)
- [O que é o Amazon API Gateway?](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html)
