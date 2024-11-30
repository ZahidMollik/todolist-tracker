import {Router} from "express";
import userRoute from "./user.route";

const router=Router();

router.use('/', userRoute);

export default router;

