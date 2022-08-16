# Talker Manager 🗣

Consiste em uma API constrída para cadastro de palestrantes com a possibilidade de cadastrar, visualizar, pesquisar, editar e excluir informações. 

* Contruída com Node.js, Express, MySQL e Docker
* Aplicação que obtém informações utilizando o módulo `fs`

### Instruções

- Para rodar o repositório localmente, realize o clone do projeto e utilize os comandos a seguir para inicializar o Docker:

```
docker-compose up -d
docker attach talker_manager
npm install // para instalar as dependências
```

E utilize o comando a seguir para executar a aplicação:

```
npm start
```

### Endpoints

#### Login

| Método | URL |
|---|---|
| `POST` | http://localhost:3000/login |


Na requisição é necessária informar o seguinte JSON:

```
{
  "email": "email@email.com",
  "password": "123456"
}
```

#### Talker

| Método | URL |
|---|---|
| `GET` | http://localhost:3000/talker |
| `GET` | http://localhost:3000/talker/:id |
| `GET` | http://localhost:3000/talker/search |
| `PUT` | http://localhost:3000/talker/:id |
| `POST` | http://localhost:3000/talker |
| `DELETE` | http://localhost:3000/talker/:id |



Na requisição do PUT e POST, é necessário informar o seguinte JSON:

```
{
  "name": "Palestrante",
  "age": 30,
  "talk": {
    "watchedAt": "22/104/2022",
    "rate": 6
  }
}
```
