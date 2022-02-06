import express from 'express';
import controller from '../controller/Player';

const router = express.Router();

router.post('/register/book', controller.register);
router.get('/get/players', controller.getAllPlayers);

export = router;
