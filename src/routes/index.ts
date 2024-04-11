import { Router } from "express";
import PasswordMiddleware from "../Middlewares/Password.Middleware";
import routeMain from "./Main.Route";

const router = Router();

router.use(PasswordMiddleware);
router.use('/', routeMain)


export default router;