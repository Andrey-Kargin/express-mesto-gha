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

cardsRouter.post('/', createCardValidation, createCard);
cardsRouter.get('/', getCards);
cardsRouter.delete('/:cardId', cardByIdValidation, deleteCard);
cardsRouter.put('/:cardId/likes', cardByIdValidation, likeCard);
cardsRouter.delete('/:cardId/likes', cardByIdValidation, dislikeCard);

module.exports = cardsRouter;
