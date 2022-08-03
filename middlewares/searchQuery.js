const fs = require('fs/promises');

// const authentication = require('./authentication');

const TALKER_FILE = './talker.json';

module.exports = async (req, res, next) => {
  const { q: search } = req.query;
  console.log(req.query, req.headers);
  if (typeof req.query === 'object') {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (authorization.length !== 16) {
      console.log('entrei', authorization);
      return res.status(401).json({ message: 'Token inválido' });
    }

    const talkers = await fs.readFile(TALKER_FILE, 'utf-8')
      .then((content) => JSON.parse(content));
    const filterTalkers = talkers.filter(({ name }) => name.includes(search));
    return res.status(200).json(filterTalkers);
  }
  next();
};