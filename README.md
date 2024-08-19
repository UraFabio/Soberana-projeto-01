# Soberana Projeto 01

Bem-vindo ao **Soberana Projeto 01**! Este projeto é uma aplicação web para gerenciar agendas e arquivos. O projeto está hospedado no GitHub e pode ser baixado e executado localmente seguindo as instruções abaixo.

## Índice

- [1. Clonando o Repositório](#1-clonando-o-repositório)
- [2. Configurando o Banco de Dados](#2-configurando-o-banco-de-dados)
- [3. Instalando Dependências](#3-instalando-dependências)
- [4. Executando Migrações](#4-executando-migrações)
- [5. Dados de Login Iniciais](#5-dados-de-login-iniciais)
- [6. Acessando a Aplicação](#6-acessando-a-aplicação)
- [7. Funcionalidades Implementadas](#7-funcionalidades-implementadas)

## 1. Clonando o Repositório

Para começar, clone o repositório do projeto para sua máquina local usando o seguinte comando:

```bash
git clone https://github.com/UraFabio/Soberana-projeto-01.git
```

## 2. Configurando o Banco de Dados

Certifique-se de ter o PostgreSQL instalado em sua máquina. Crie um schema chamado project01 com as seguintes configurações:

Usuário: postgres
Porta: 5432
Senha: senha123
Banco de Dados: project01
Você também pode configurar essas credenciais no arquivo database.js do projeto, se preferir.

## 3. Instalando Dependências

Navegue até a pasta do projeto e execute o comando a seguir para instalar todas as dependências necessárias:

```bash
npm install
```

# 4. Executando Migrações

Para inserir os dados iniciais na tabela, execute o seguinte comando:

```bash
node migrations/20240817_create_initial_records.js
```

## 5. Dados de Login Iniciais

Os dados de login iniciais para a aplicação são:

Email: admin@admin.com
Senha: admin123

## 6. Iniciando servido

Execute o seguinte comando para dar início à aplicação

```bash
npm start
```

## 7. Acessando a Aplicação

Abra seu navegador e acesse o seguinte URL para iniciar a aplicação:

http://127.0.0.1:3000/login

## 8. Funcionalidades Implementadas

A aplicação oferece as seguintes funcionalidades:

- Login de usuário
- Realize login com os dados fornecidos.
- Criação de novo usuário a partir de usuário logado
- Usuários logados podem criar novos usuários.
- Visualizar todas as agendas
- Visualize uma lista de todas as agendas.
- Visualizar uma agenda específica
- Veja detalhes de uma agenda selecionada.
- Criar uma nova agenda
- Adicione uma nova agenda ao sistema.
- Atualizar uma agenda existente
- Modifique as informações de uma agenda.
- Excluir uma agenda
- Remova uma agenda do sistema.
- Visualizar todos os arquivos
- Veja a lista de arquivos disponíveis.
- Fazer upload de um novo arquivo
- Envie novos arquivos para o sistema.
- Baixar arquivo
- Faça o download de arquivos disponíveis.
