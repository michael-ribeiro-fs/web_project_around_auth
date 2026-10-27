# Around The U.S. — Auth

Galeria fotográfica interativa com autenticação de usuários, desenvolvida com React e Vite. Permite criar uma conta, fazer login, visualizar e gerenciar cartões de lugares, curtir imagens e editar informações do perfil. O acesso à galeria é restrito a usuários autenticados.

## Funcionalidades

- **Cadastro de usuários:** criação de conta com e-mail e senha.
- **Autenticação:** login integrado a uma API de autenticação baseada em JWT.
- **Persistência de sessão:** armazenamento do token no `localStorage`, permitindo manter a sessão após recarregar a página.
- **Rotas protegidas:** acesso à galeria restrito a usuários autenticados.
- **Gerenciamento de cartões:** criação, exclusão e visualização de cartões de lugares.
- **Curtidas:** interação com cartões por meio de curtidas e descurtidas, com contador visível.
- **Edição de perfil:** atualização das informações pessoais e do avatar.
- **Feedback de autenticação:** mensagens visuais para operações de cadastro e login.
- **Logout:** encerramento da sessão local e redirecionamento para a tela de login.

## Tecnologias

- React
- JavaScript (ES6+)
- Vite
- React Router
- Context API
- CSS3
- Metodologia BEM
- JWT
- REST APIs
- Git e GitHub

## Arquitetura

O projeto utiliza uma arquitetura baseada em componentes React, com separação entre autenticação, acesso aos dados e apresentação da interface.

```text
src/
├── components/       # Componentes da aplicação
├── contexts/         # Contextos para compartilhamento de estado
├── utils/            # Serviços de autenticação e acesso à API
├── blocks/           # Estilos organizados com metodologia BEM
├── images/           # Recursos visuais
├── vendor/           # Estilos e fontes de terceiros
├── index.css         # Importação central dos estilos
└── main.jsx          # Ponto de entrada da aplicação
```

### Organização do código

- `App.jsx`: gerencia o estado global, a autenticação e as operações de acesso às APIs.
- `auth.js`: centraliza as operações de cadastro, login e validação do token.
- `api.js`: centraliza as requisições relacionadas aos cartões e ao perfil.
- `CurrentUserContext`: disponibiliza os dados do usuário aos componentes que precisam deles.
- `ProtectedRoute`: controla o acesso às rotas que exigem autenticação.

## Autenticação e gerenciamento de sessão

A autenticação utiliza JWT fornecido pela API de autenticação. O token é armazenado no `localStorage` e enviado nas requisições protegidas correspondentes.

Ao inicializar a aplicação, o token existente é validado por meio do endpoint `GET /users/me`. Se for válido, os dados do usuário são recuperados e a sessão é restabelecida. Caso contrário, o token é removido e o usuário precisa realizar o login novamente.

A aplicação utiliza duas APIs independentes:

**API de autenticação**

`https://se-register-api.en.tripleten-services.com/v1`

Responsável pelo cadastro, login e validação da sessão.

**API de dados**

`https://around-api.pt-br.tripleten-services.com/v1`

Responsável pelas operações relacionadas aos cartões e ao perfil. Essa API utiliza a autenticação legada disponibilizada no projeto original.

## Rotas

| Rota      | Acesso    | Descrição          |
| --------- | --------- | ------------------ |
| `/`       | Protegido | Galeria de cartões |
| `/signin` | Público   | Login              |
| `/signup` | Público   | Cadastro           |

Após o login bem-sucedido, o usuário é redirecionado para a galeria. Ao realizar logout, a sessão local é encerrada e o usuário é redirecionado para `/signin`.

## Endpoints da API

### Autenticação

| Método | Endpoint    | Descrição                                  |
| ------ | ----------- | ------------------------------------------ |
| `POST` | `/signup`   | Cadastro de usuário                        |
| `POST` | `/signin`   | Autenticação do usuário                    |
| `GET`  | `/users/me` | Validação do token e recuperação do e-mail |

### Cartões e perfil

| Método   | Endpoint           | Descrição                       |
| -------- | ------------------ | ------------------------------- |
| `GET`    | `/cards`           | Listagem de cartões             |
| `POST`   | `/cards`           | Criação de cartão               |
| `DELETE` | `/cards/:id`       | Exclusão de cartão              |
| `PUT`    | `/cards/:id/likes` | Curtir cartão                   |
| `DELETE` | `/cards/:id/likes` | Remover curtida                 |
| `GET`    | `/users/me`        | Recuperação dos dados do perfil |
| `PATCH`  | `/users/me`        | Atualização do perfil           |
| `PATCH`  | `/users/me/avatar` | Atualização do avatar           |

## Como executar localmente

### Pré-requisitos

- Node.js 20.19+ ou 22.12+
- npm

### Instalação

Clone o repositório:

```bash
git clone https://github.com/michael-ribeiro-fs/web_project_around_auth.git
```

Acesse a pasta do projeto:

```bash
cd web_project_around_auth
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

### Outros comandos

Gerar o build de produção:

```bash
npm run build
```

Executar uma prévia local do build:

```bash
npm run preview
```

## Melhorias futuras

- Consolidar a autenticação e as operações de dados em um backend integrado.
- Implementar testes automatizados unitários e de integração.
- Ampliar a cobertura de acessibilidade, incluindo navegação por teclado e atributos ARIA.
- Aprimorar o gerenciamento e a segurança das sessões.
- Expandir a cobertura de tratamento de erros nas requisições à API.

## Licença

Este projeto foi desenvolvido como parte do programa de formação em desenvolvimento web da TripleTen.
