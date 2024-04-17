import { Router } from "express";
import Database from "../database/Database";
import PasswordMiddleware from "../Middlewares/Password.Middleware";

const routeMain = Router();

const db = new Database();

routeMain.use(PasswordMiddleware)

routeMain.get('/', async (_req, res) => {
  const { data, status } = await db.allProjects();
  res.status(status).json({ data })
});

routeMain.post('/', async (req, res) => {
  const { describe, gitHub, tecnologias, title, url } = req.body;
  const { data, status } = await db.addProject({ describe, url, gitHub, tecnologias, title });
  res.status(status).json({ data });
})

routeMain.delete('/', async (req, res) => {
  const { title } = req.body;
  const { data, status } = await db.deleteProject(title);
  console.log(title)
  res.status(status).json({ data });
})

routeMain.patch('/', async (req, res) => {
  const { title, fields, values } = req.body;
  const { data, status } = await db.editProject("title", title, fields, values);
  res.status(status).json({ data });
});

routeMain.post('/sync', async (req, res) => {
  const { acutalProjects } = req.body;
  const { data, status } = await db.projetosSync(acutalProjects);

  res.status(status).json({ data });
});

export default routeMain;