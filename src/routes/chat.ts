import express, {Router} from "express";
const router: Router = express();
import chatController from '../controllers/chat'

router.post('/private', chatController.postMessage);
router.post('/private/:id', chatController.getMessagesFromUser);


export default router
