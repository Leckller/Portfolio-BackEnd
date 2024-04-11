import { Router } from "express";
import routeMain from "./Main.Route";

const router = Router();

router.use('/', routeMain)

export default router;