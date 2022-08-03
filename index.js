const express = require('express');
const bodyParser = require('body-parser');

// Router
const loginRouter = require('./express-router/loginRouter');
const talkerRouter = require('./express-router/talkerRouter');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => res.status(HTTP_OK_STATUS).send());

app.use('/login', loginRouter);
app.use('/talker', talkerRouter);

app.listen(PORT, () => console.log('Online'));
