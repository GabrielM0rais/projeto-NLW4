import express from 'express';
import "reflect-metadata";
import createConnection from "./database";
import { router } from "./router";

createConnection()
const app = express();
/**
 * GET => buscar
 * POST => salvar
 * PUSH => alterar 
 * DELETE => deletar
 * PATCH => alteração especifica
*/
app.use(express.json());
app.use(router)

export { app };
