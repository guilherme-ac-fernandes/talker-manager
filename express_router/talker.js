const express = require('express');
const fs = require('fs/promises');

const TALKER_FILE = '../talker.json';

const router = express.Router();

const verifyIdTalker = require('../middlewares/verifyIdTalker');
const searchQuery = require('../middlewares/searchQuery');
const authentication = require('../middlewares/authentication');
const verifyUserName = require('../middlewares/verifyUserName');
const verifyUserAge = require('../middlewares/verifyUserAge');
const verifyUserTalkWatchedAt = require('../middlewares/verifyUserTalkWatchedAt');
const verifyUserTalkRate = require('../middlewares/verifyUserTalkRate');

router.get('/:id', [
  verifyIdTalker,
  authentication,
  searchQuery,
  () => {},
]);

router.use(authentication);

router.post('', [
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

router.put('/:id', [
  verifyUserName,
  verifyUserAge,
  verifyUserTalkWatchedAt,
  verifyUserTalkRate,
  async (req, res) => {
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
  },
]);

router.delete('/:id', [
  async (req, res) => {
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
  },
]);

module.exports = router;