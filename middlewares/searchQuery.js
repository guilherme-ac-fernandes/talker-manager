const fs = require('fs/promises');

const TALKER_FILE = './talker.json';

module.exports = async (req, res, next) => {
  const { q: search } = req.query;
  if (search) {
    const talkers = await fs.readFile(TALKER_FILE, 'utf-8')
      .then((content) => JSON.parse(content));

    console.log();

    const filterTalkers = talkers.filter(({ name }) => name.includes(search));
    
    return res.status(200).json(filterTalkers);
  }

  next();
};