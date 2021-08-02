const express = require('express');
const mongoose = require('mongoose');
const { usersRoute } = require('./routes/users');
const { cardsRoute } = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json()); // rrquest body parser

// заглушка для стартовой

app.get('/', (req, res) => {
  res.send('welkommen');
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '610832fe16f50d0693f05977', // это айдишник первой записи (после тестов, кучи кривых и снесения всего до нуля)
  };

  next();
});

app.use('/users', usersRoute);
app.use('/cards', cardsRoute);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
