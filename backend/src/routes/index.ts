import { Router } from "express";
import routeMain from "./Main.Route";
import routeTecnologies from "./Tecnologies.Route";

const router = Router();

router.use('/', routeMain)
router.use('/tec', routeTecnologies);

export default router;