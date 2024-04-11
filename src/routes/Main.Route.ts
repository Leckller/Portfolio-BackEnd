import { Router } from "express";
import Database from "../database/Database";

const routeMain = Router();

const db = new Database();

routeMain.get('/', async (_req, res) => {
  const dbData = await db.allProjects();
  res.status(200).json({ data: dbData })
})

export default routeMain