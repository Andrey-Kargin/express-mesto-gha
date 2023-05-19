const cardsRouter = require('express').Router();

const {
  createCardValidation,
  cardByIdValidation,
} = require('../middlewares/validation');

const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.post('/cards', createCardValidation, createCard);
cardsRouter.get('/cards', getCards);
cardsRouter.delete('/cards/:cardId', cardByIdValidation, deleteCard);
cardsRouter.put('/cards/:cardId/likes', cardByIdValidation, likeCard);
cardsRouter.delete('/cards/:cardId/likes', cardByIdValidation, dislikeCard);

module.exports = cardsRouter;
