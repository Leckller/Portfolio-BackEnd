import { Router } from "express";
import Database from "../database/Database";
import PasswordMiddleware from "../Middlewares/Password.Middleware";

const routeMain = Router();

const db = new Database();

routeMain.use(PasswordMiddleware)

routeMain.get('/', async (_req, res) => {
  const dbData = await db.allProjects();
  console.log('GET')
  res.status(200).json(dbData)
});

routeMain.post('/', async (req, res) => {
  const { describe, gitHub, tecnologias, title, url } = req.body;
  const { data, status } = await db.addProject({ describe, url, gitHub, tecnologias, title });
  console.log('POST- ' + data)
  res.status(status).json(data);
})

routeMain.delete('/', async (req, res) => {
  const { title } = req.body;
  const { data, status } = await db.deleteProject(title);
  console.log('DELETE- ' + data)
  res.status(status).json(data);
})

routeMain.patch('/', async (req, res) => {
  const { describe, gitHub, tecnologias, title, actualTitle, url } = req.body;
  const { data, status } = await db.editProject({ describe, url, gitHub, tecnologias, title }, actualTitle);
  console.log('PATCH- ' + data)
  res.status(status).json(data);
})

export default routeMain;