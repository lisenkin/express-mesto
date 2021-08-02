const express = require('express');

const usersRoute = express.Router();
const {
  getUsers, getUserById, createUser, updateUserData, updateUserAvatar,
} = require('../controllers/users');

usersRoute.get('/', getUsers);
usersRoute.get('/:userId', getUserById);
usersRoute.post('/', createUser);
usersRoute.patch('/me', updateUserData);
usersRoute.patch('/me/avatar', updateUserAvatar);

module.exports = { usersRoute };
