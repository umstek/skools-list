# Skools List

Database: MongoDB (on Atlas Cloud)  
Backend: NestJS (express)  
Frontend: React + Ant.Design  
Docs: Open API ([Swagger](https://skools-list.herokuapp.com/docs))  
CI: GitHub Actions ![Node.js CI](https://github.com/umstek/skools-list/workflows/Node.js%20CI/badge.svg)  
Deployment: [Heroku](https://skools-list.herokuapp.com/)

# How to run locally

## Backend (`api` directory)

1. Have a mongodb instance and provide the database connection string in `.env`; `DB=...`.
2. Provide the API port as `PORT=...` in `.env`. Defaults to 3000.
3. Install API dependencies running `yarn`.
4. Run `yarn start:debug` or `yarn start:watch` or `yarn start:dev` to start the server.

- To create a production build, run `yarn build`, and start with `yarn start`.

## Frontend (`ui` directory)

1. Provide `BASE_URL=...` in `.env` file. This is the backend endpoint URL **including** `/schools`.
2. Run `yarn` to install dependencies.
3. Run `yarn start` to start in development mode.

- To create a production build, run `yarn build`.
- You can put the generated files in the `api/client` folder (from root level) so they cab be served by the backend as static files. Note that the BASE_URL should be changed accordingly when built.
