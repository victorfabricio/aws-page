# Hiring Coders - Desafio Final - AWS
Projeto de Desenvolvimento Web realizado pelo Grupo 11 como entrega do Desafio Final do Hiring Coders 2021, programa educacional estruturado pela Gama Academy e pela VTEX com apoio da AWS, ACCT, we.digi, Corebiz, Whirlpool e Loja Integrada.

[![Watch the video](https://github.com/victorfabricio/aws-page/blob/main/AWS-PAGE/assets/home.png)](https://youtu.be/c4cF8eS0tVc)


https://user-images.githubusercontent.com/victorfabricio/aws-pag/AWS-PAGE/assets/Projeto_Vtex-AWS.mp4

https://raw.githubusercontent.com/victorfabricio/aws-pag/AWS-PAGE/assets/Projeto_Vtex-AWS.mp4

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
- API Gateway da AWS

## Visão Geral

Ecommerce desenvolvido com base no site da [AWS](https://aws.amazon.com/pt/) e com utilização do VTEX IO como base do sistema. Os produtos foram cadastrados no sistema da VTEX com valores fictícios. Ao acessar o site, o usuário tem quatro opções no menu principal:

> **Home**: acesso à página inicial do site;
> 
> **Soluções**: acesso aos serviços oferecidos pela AWS;
> 
> **Sobre**: acesso às informações da AWS;
> 
> **Leads**: acesso à lista de usuários cadastrados como *leads* do site

No final da página o usuário pode se cadastrar para receber as Newsletters da AWS e após seu cadastro, seus dados são exibidos na página **Leads** do menu principal. Caso o usuário se cadastre com um email já inscrito ele recebe um aviso de que já está cadastrado no banco de dados.

Estes dados dos usuários estão sendo armazenados na API Gateway desenvolvida pelo grupo com o uso de funções Lambda. Com o uso de quatro métodos diferentes:

> **GET**: mostrar todos os usuário já cadastrados
> 
> **POST**: armazenar o novo usuário que se cadastrou 
> 
> **GET**: mostrar um usuário específico com base em seu email
> 
> **DELETE**: deletar um usuário específico com base em seu email
> 
> **PATCH**: modificar a categoria do usuário de "lead" para "cliente"

Ao finalizar uma compra, API fazer um requerimento PATCH para a API Gateway e a categoria do usuário muda de "lead" para "cliente".

## Referências

- [Documentação da VTEX](https://developers.vtex.com/vtex-developer-docs/docs/welcome)
- [Learning Path da VTEX](https://learn.vtex.com/page/learning-path-lang-pt)
- [Documentação da AWS Lambda com Lambda](https://docs.aws.amazon.com/lambda/latest/dg/services-apigateway.html)
- [Documentação da API Gateway com Lambda](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html)
