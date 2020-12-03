const router = require('express').Router();

const AuthorController = require('./controllers/AuthorController');
const StatusController = require('./controllers/StatusController');
const BookController = require('./controllers/BookController');

router.get('/authors', AuthorController.index);
router.post('/authors', AuthorController.store);
router.put('/authors/:id', AuthorController.update);
router.delete('/authors/:id', AuthorController.delete);

router.get('/status', StatusController.index);

router.post('/books', BookController.store);
router.get('/books', BookController.index);
router.put('/books/:id', BookController.update);
router.delete('/books/:id', BookController.delete);

module.exports = router;