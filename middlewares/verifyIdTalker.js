const fs = require('fs/promises');

const TALKER_FILE = './talker.json';

module.exports = async (req, res, next) => {
  const { id } = req.params;

  if (id) {
    const talkers = await fs.readFile(TALKER_FILE, 'utf-8')
      .then((content) => JSON.parse(content));
  
    const talker = talkers.find((talk) => Number(talk.id) === Number(id));
    
    if (!talker) {
      console.log('errado');
      return res.status(404).json({
        message: 'Pessoa palestrante não encontrada',
      }); 
    }
    return res.status(200).json(talker);
  }

  next();
};