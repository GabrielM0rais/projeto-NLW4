import { Router } from "express";
import { UserController } from "./src/controllers/UserController"

const router = Router();
const user = new UserController();

router.post('/users', user.create);

export { router };
