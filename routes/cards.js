const express = require('express');
const {
  deleteCard, createCard, getCards, likeCard, dislikeCard,
} = require('../controllers/cards');

const cardsRoute = express.Router();

cardsRoute.get('/', getCards);
cardsRoute.delete('/:cardId', deleteCard);
cardsRoute.post('/', createCard);
cardsRoute.put('/:cardId/likes', likeCard);
cardsRoute.delete('/:cardId/likes', dislikeCard);

module.exports = { cardsRoute };
