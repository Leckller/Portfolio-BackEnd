import { Router } from "express";
import Tecnologies from '../database/Tecnologies'
const routeTecnologies = Router();

const db = new Tecnologies();

routeTecnologies.get('/', async (_req, res) => {
  const { data, status } = await db.getTecnologies();

  res.status(status).json(data)
});

routeTecnologies.post('/', async (req, res) => {
  const { name, image, tier } = req.body;
  const { data, status } = await db.addTecnology({ name, image, tier });

  res.status(status).json(data);
})

routeTecnologies.delete('/', async (req, res) => {
  const { name } = req.body;
  const { data, status } = await db.removeTecnology("name", name);
  res.status(status).json(data);
})

routeTecnologies.patch('/', async (req, res) => {
  const { name, fields, values } = req.body;
  const { data, status } = await db.editTecnology("name", name, fields, values);
  res.status(status).json(data);
})

export default routeTecnologies;