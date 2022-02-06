import express from 'express';
import Werewolf from '../controller/Werewolf';

const router = express.Router();

router.post('/create/book', controller.createBook);
router.get('/get/books', controller.getAllBooks);

export = router;
