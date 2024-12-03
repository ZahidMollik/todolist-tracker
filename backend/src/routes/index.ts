import {Router} from "express";
import userRoute from "./user.route";
import taskRoute from "./task.route";

const router=Router();

router.use('/', userRoute);
router.use('/task', taskRoute);

export default router;

