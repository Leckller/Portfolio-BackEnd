import { Router } from "express";
import Tecnologies from '../database/Tecnologies'
const routeTecnologies = Router();

const db = new Tecnologies();

routeTecnologies.get('/', async (_req, res) => {
  const { data, status } = await db.getTecnologies();
  res.status(status).json({ data })
});

routeTecnologies.post('/', async (req, res) => {
  const { title, img, type } = req.body;
  const { data, status } = await db.addTecnology({ title, img, type });

  res.status(status).json({ data });
})

routeTecnologies.delete('/', async (req, res) => {
  const { title } = req.body;
  const { data, status } = await db.removeTecnology("title", title);
  res.status(status).json({ data });
})

routeTecnologies.patch('/', async (req, res) => {
  const { title, fields, values } = req.body;
  const { data, status } = await db.editTecnology("title", title, fields, values);
  res.status(status).json({ data });
})

routeTecnologies.post('/sync', async (req, res) => {
  const { actualTecnologies } = req.body;
  const { data, status } = await db.tecnologiesSync(actualTecnologies);

  res.status(status).json({ data });
});

export default routeTecnologies;