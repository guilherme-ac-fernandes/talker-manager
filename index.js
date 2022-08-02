const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');

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

app.listen(PORT, () => {
  console.log('Online');
});
