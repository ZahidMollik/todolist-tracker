import { Router } from "express";
import {createTask} from "../controllers/task.controller";
import taskReqValidation from "../middlewares/taskReqValidation.middleware"
const router = Router();

router.post("/create",taskReqValidation,createTask);

export default router;