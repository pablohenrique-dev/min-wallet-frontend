# MinWallet

## Descrição

O MinWallet é um app que permite aos usuários cadastrar, atualizar e excluir todos os seus gastos e ganhos de forma que ao final do mês, o mesmo possa ter controle sobre sua vida financeira. Acesse o repositório back-end [aqui](https://github.com/pablohenrique-dev/min-wallet-api).

## Tecnologias utilizadas

- React
- TypeScript
- shadcn/ui
- TanStack Query
- React Hook Form
- Zod

## Rodando o projeto localmente

#### 1º - Abra o seu terminal e clone o projeto com o comando abaixo:

```bash
git clone git@github.com:pablohenrique-dev/min-wallet-frontend.git
```

#### 2º - Navege para a pasta do projeto:

```bash
cd min-wallet-frontend/
```

#### 3º - Crie um arquivo .env.local e cole as informações abaixo:

```js
VITE_API_URL="http://localhost:3333"
```

**OBS**: Essa url é a da API. [Clique aqui](https://github.com/pablohenrique-dev/min-wallet-api) para ter acesso ao repositório e aos passos para rodar API  localmente. 

#### 4º - No seu terminal, execute o comando abaixo:

```bash
npm run wrap
```