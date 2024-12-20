import { Router } from "express";
import {createTask,getAllTasks,updateTask,deleteTask} from "../controllers/task.controller";
import taskReqValidation from "../middlewares/taskReqValidation.middleware"
import {checkAuth} from "../middlewares/auth.middleware"
import {upload} from "../utils/multer"
const router = Router();

router.post("/create",checkAuth,upload.single("image"),taskReqValidation,createTask);
router.get("/",checkAuth,getAllTasks);
router.patch("/update/:id",checkAuth,updateTask);
router.delete("/delete/:id",checkAuth,deleteTask);

export default router;