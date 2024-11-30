import { Router } from "express";
import {userController} from "../controllers/user.controller";
import authReqValidation from "../middlewares/authReqValidation.middleware"
const router = Router();

router.post("/register",authReqValidation, userController.registerUser);
router.post("/login",authReqValidation, userController.loginUser );

export default router;
