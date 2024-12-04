import { Router } from "express";
import {createTask} from "../controllers/task.controller";
import taskReqValidation from "../middlewares/taskReqValidation.middleware"
import {checkAuth} from "../middlewares/auth.middleware"
const router = Router();

router.post("/create",checkAuth,taskReqValidation,createTask);

export default router;