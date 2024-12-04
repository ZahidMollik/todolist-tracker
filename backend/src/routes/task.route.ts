import { Router } from "express";
import {createTask} from "../controllers/task.controller";
import taskReqValidation from "../middlewares/taskReqValidation.middleware"
import {checkAuth} from "../middlewares/auth.middleware"
import {upload} from "../utils/multer"
const router = Router();

router.post("/create",upload.single("image"),checkAuth,taskReqValidation,createTask);

export default router;