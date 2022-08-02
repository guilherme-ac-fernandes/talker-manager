const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');
const crypto = require('crypto');

// Middlewares
const authentication = require('./middlewares/authentication');
const verifyUserName = require('./middlewares/verifyUserName');
const verifyUserAge = require('./middlewares/verifyUserAge');
const verifyUserTalkWatchedAt = require('./middlewares/verifyUserTalkWatchedAt');
const verifyUserTalkRate = require('./middlewares/verifyUserTalkRate');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const TALKER_FILE = './talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talkers = await fs.readFile(TALKER_FILE, 'utf-8')
    .then((content) => JSON.parse(content));
  if (talkers.length === 0) {
    return res.status(200).json([]);
  }
  return res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const talkers = await fs.readFile(TALKER_FILE, 'utf-8')
    .then((content) => JSON.parse(content));

    const talker = talkers.find((talk) => Number(talk.id) === Number(id));
    if (!talker) {
      return res.status(404).json({
        message: 'Pessoa palestrante não encontrada',
      }); 
    }
    return res.status(200).json(talker);
  } catch (error) {
    return res.status(500).end();
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' }); 
  }
  // Regex utilizado no projeto TrybeWallet do Guilherme Fernandes
  // source: https://github.com/guilherme-ac-fernandes/trybewallet/blob/main/src/pages/Login.js
  if (!(email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' }); 
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
  }
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({ token });
});

app.post('/talker', [
  authentication,
  verifyUserName,
  verifyUserAge,
  verifyUserTalkWatchedAt,
  verifyUserTalkRate,
  async (req, res) => {
    const talkers = await fs.readFile(TALKER_FILE, 'utf-8')
    .then((content) => JSON.parse(content));

    const newTalker = { ...req.body, id: talkers.length + 1 };

    talkers.push(newTalker);

    await fs.writeFile(TALKER_FILE, JSON.stringify(talkers, null, 2));

    res.status(201).json(newTalker);
  },
]);

app.listen(PORT, () => {
  console.log('Online');
});
