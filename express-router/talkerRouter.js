const express = require('express');

// Middlewares
const authentication = require('../middlewares/authentication');
const {
  verifyName,
  verifyAge,
  verifyTalk,
  verifyWatchedAt,
  verifyRate,
} = require('../middlewares/talker');

// Fs-Util
const { getTalkers, writeTalkers } = require('../helpers/fs-utils');

const router = express.Router();

router.get('/', async (_req, res) => {
  const talkers = await getTalkers();
  if (talkers.length === 0) return res.status(200).json([]);
  return res.status(200).json(talkers);
});

router.get('/search', authentication, async (req, res) => {
  const { q: search } = req.query;
  const talkers = await getTalkers();
  const filterTalkers = talkers
    .filter(({ name }) => name.includes(search));
  return res.status(200).json(filterTalkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await getTalkers();
  const talker = talkers.find((talk) => Number(talk.id) === Number(id));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 
  return res.status(200).json(talker);
});

// Verificação sobre Authorization proveniente do Headers
router.use(authentication);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await getTalkers();
  const deleteIndex = talkers.findIndex((talk) => Number(talk.id) !== Number(id));
  if (deleteIndex === -1) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  const updateTalkers = talkers.filter((talk) => Number(talk.id) !== Number(id));
  await writeTalkers(updateTalkers);
  res.status(204).end();
});

// Verificações sobre os dados provenientes do body
router.use([verifyName,
  verifyAge,
  verifyTalk,
  verifyWatchedAt,
  verifyRate,
]);

router.post('/', async (req, res) => {
  const talkers = await getTalkers();
  const newTalker = { ...req.body, id: talkers.length + 1 };
  talkers.push(newTalker);
  await writeTalkers(talkers);
  res.status(201).json(newTalker);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await getTalkers();
  const editTalker = { ...req.body, id: Number(id) };
  const updateTalkers = talkers.map((talker) => {
    if (Number(talker.id) === Number(id)) return editTalker;
    return talker;
  });
  await writeTalkers(updateTalkers);
  res.status(200).json(editTalker);
});

module.exports = router;