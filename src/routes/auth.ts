import express, {Router} from "express";
const router: Router = express();
import authController from "../controllers/auth"

router.post('/', authController.authUser);


export default router