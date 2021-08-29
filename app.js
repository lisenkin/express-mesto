const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { usersRoute } = require('./routes/users');
const { cardsRoute } = require('./routes/cards');
const { notFoundRoute } = require('./routes/notFound');

const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { validateSignUp, validateSignIn } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

app.use(cors({ credentials: true, origin: true }));

app.use(cookieParser());
app.use(express.json()); // request body parser

app.use(helmet());
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// добавим логгер
//app.use(requestLogger);

// добавим авторизацию и валидацию
app.post('/signin', validateSignIn, login);
app.post('/signup', validateSignUp, createUser);
app.use('/users', auth, usersRoute);
app.use('/cards', auth, cardsRoute);
app.use('*', notFoundRoute); // not found

//app.use(errorLogger);
//app.options('*', cors());

app.use(errors());
//app.use(errorLogger);

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
