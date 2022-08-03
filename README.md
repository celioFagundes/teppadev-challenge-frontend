### Teppadev fullstack challenge - Célio Fagundes Pieczarka

CRUD de series/filmes/jogos que o usuario que o usuario quer assistir ou jogar/esta assistindo ou jogando/assistiu ou jogou

Fluxo: 
- Backend: A API em express se utiliza o firebase-admin para criar novos dados no firestore e retorna-los para o frontend e  criar novos usuários no firebase authentication
- Frontend: O Acesso ao app só esta disponivel para usuarios logados.O frontend utiliza react-query e fetch para se comunicar com API, utiliza firebase para login e autenticação do usuario. Em toda requisição protegida na API, o frontend envia um token de autenticação no request

## Frontend 
[Link de deploy](https://teppadev-challenge.web.app/)
- Framework: React/Typescript
- Hosting: Firebase
- Comunicação com API: react-query e fetch
- Formulário: Formik
- Validação: Yup
- CSS: CSS modules

## Backend
[Link de deploy](https://teppadev-api.herokuapp.com/)
- Framework: ExpressTypescript
- Hosting: Heroku
- Validação de inputs: Joi
- Middlewares:
  - Auth: Verifica se o usuario tem permissão para acessar os dados
  - Inputs: Validação de inputs de media e usuario
- Rotas:
  - GET/medias - Retorna todas as medias
  - GET/medias/:id: - Retorna uma media com base no id
  - POST/medias - Cria uma media
  - PUT/medias/:id - Edita uma media
  - DELETE /medias/:id - Exclui uma media
  -POST/auth/registration - Cria um novo usuario no firebase

## Rules do firestore
Verifica se o usuario que fez o  request esta autenticado
rules_version = '2';<br>
service cloud.firestore {<br>
  match /databases/{database}/documents {<br>
    match /{document=**} {<br>
      allow read, write: if<br>
    			request.auth.uid != null
    }
  }
}