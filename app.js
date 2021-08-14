const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { usersRoute } = require('./routes/users');
const { cardsRoute } = require('./routes/cards');
const { notFoundRoute } = require('./routes/notFound');

const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { validateSignUp, validateSignIn } = require('./middlewares/validation');

const { PORT = 3000 } = process.env;
const app = express();

app.use(cookieParser());

app.use(express.json()); // rrquest body parser

app.use(helmet());
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

/*
app.use((req, res, next) => {
  req.user = {
    _id: '610832fe16f50d0693f05977', // это айдишник первой записи (после тестов, кучи кривых и снесения всего до нуля)
  };

  next();
}); */

app.post('/signin', validateSignIn, login);
app.post('/signup', validateSignUp, createUser);
app.use('/users', usersRoute);
app.use('/cards', cardsRoute);
app.use('*', notFoundRoute); // not found

app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });

  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
