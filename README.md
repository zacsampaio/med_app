<div align="center">
    <h1>Projeto: MedApp</h1>
</div>

Este é um projeto da faculdade, replicado junto com a professora, utilizando os frameworks Node.js e Next.js. O projeto ainda está em construção e tem como objetivo fornecer uma aplicação para gestão de dados médicos com funcionalidades de login, autenticação e geração de relatórios.

## Tecnologias Utilizadas
- **Node.js**: Ambiente de execução JavaScript para desenvolvimento de aplicações server-side.
- **Next.js**: Framework React para criação de aplicações de front-end com renderização no servidor (SSR).
- **MongoDB**: Banco de dados NoSQL utilizado para armazenar informações de usuários e dados médicos.
- **bcrypt**: Biblioteca para criptografia de senhas.
- **express**: Framework web para Node.js, utilizado para criar a API.
- **jsonwebtoken**: Para geração de tokens de autenticação.
- **multer**: Middleware para upload de arquivos (como relatórios PDF).
- **pdfkit**: Biblioteca para geração de PDFs.
- **mongoose**: ODM (Object Data Modeling) para MongoDB, facilitando a interação com o banco de dados.
- **path**: Utilizado para trabalhar com caminhos de arquivos no sistema de arquivos.
- **process**: Fornece informações sobre o ambiente de execução do Node.js.

## Funcionalidades da Aplicação
- **Autenticação de usuários**: Sistema de login e registro utilizando JWT para autenticação.
- **Geração de relatórios**: Capacidade de gerar e fazer upload de relatórios em PDF.
- **Testes de API**: Testes realizados utilizando o Postman para verificar os endpoints da API.

## Aprendizados e Melhorias
Neste projeto, pude aprimorar:
- O uso de **Next.js** para desenvolvimento de aplicações React com SSR.
- A integração com **MongoDB** para o gerenciamento de dados no backend.
- A implementação de **JWT** para autenticação segura de usuários.
- O desenvolvimento de uma API com **Express** para manipulação de dados e envio de relatórios.
- A utilização de **Multer** para upload de arquivos, como relatórios em PDF.
- A geração de **PDFs** com **pdfkit** para relatórios médicos.

## Como Rodar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/zacsampaio/medapp.git
2. Navegue até a pasta do projeto e instale as dependências:
    ```bash
    cd medapp && npm install
3. Inicie o servidor:
   ```bash
   npm run dev
4. Acesse a aplicação no navegador através do endereço exibido no terminal.
   
# **Testando a API**
A API pode ser testada utilizando o Postman. O projeto expõe endpoints para autenticação de usuários, upload de relatórios e outras funcionalidades que podem ser testadas diretamente pelo Postman.

# **Observações**
O projeto está em construção e algumas funcionalidades ainda estão sendo desenvolvidas.
É necessário configurar o MongoDB para uso local ou utilizar um serviço como o MongoDB Atlas para rodar a aplicação.
