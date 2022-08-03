const express = require('express');
const fs = require('fs/promises');

const TALKER_FILE = './talker.json';

const router = express.Router();

// Middlewares
const searchQuery = require('./middlewares/searchQuery');
const authentication = require('./middlewares/authentication');
const verifyUserName = require('./middlewares/verifyUserName');
const verifyUserAge = require('./middlewares/verifyUserAge');
const verifyUserTalkWatchedAt = require('./middlewares/verifyUserTalkWatchedAt');
const verifyUserTalkRate = require('./middlewares/verifyUserTalkRate');

router.get('/', async (_req, res) => {
  const talkers = await fs.readFile(TALKER_FILE, 'utf-8')
    .then((content) => JSON.parse(content));
  if (talkers.length === 0) {
    return res.status(200).json([]);
  }
  return res.status(200).json(talkers);
});

router.get('/search', authentication, searchQuery);

router.get('/:id', async (req, res) => {
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
});

// Verificação sobre Authorization proveniente do Headers
router.use(authentication);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile(TALKER_FILE, 'utf-8')
    .then((content) => JSON.parse(content));
  const deleteIndex = talkers.findIndex((talk) => Number(talk.id) !== Number(id));

  if (deleteIndex === -1) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  const updateTalkers = talkers.filter((talk) => Number(talk.id) !== Number(id));
  await fs.writeFile(TALKER_FILE, JSON.stringify(updateTalkers, null, 2));

  res.status(204).end();
});

// Verificações sobre os dados provenientes do body
router.use(verifyUserName);
router.use(verifyUserAge);
router.use(verifyUserTalkWatchedAt);
router.use(verifyUserTalkRate);

router.post('/', async (req, res) => {
  const talkers = await fs.readFile(TALKER_FILE, 'utf-8')
    .then((content) => JSON.parse(content));
  const newTalker = { ...req.body, id: talkers.length + 1 };
  talkers.push(newTalker);
  await fs.writeFile(TALKER_FILE, JSON.stringify(talkers, null, 2));
  res.status(201).json(newTalker);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile(TALKER_FILE, 'utf-8')
    .then((content) => JSON.parse(content));

  const editTalker = { ...req.body, id: Number(id) };
  const updateTalkers = talkers.map((talker) => {
    if (Number(talker.id) === Number(id)) {
      return editTalker;
    }
    return talker;
  });
  await fs.writeFile(TALKER_FILE, JSON.stringify(updateTalkers, null, 2));
  res.status(200).json(editTalker);
});

module.exports = router;