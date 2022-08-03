const fs = require('fs/promises');
const path = require('path');

// Implementaçãp do path para resolver o caminho do arquivo
// proveniente da explicação do Instrutor da Trybe Zambelli
const TALKER_FILE = path.resolve(__dirname, '..', 'talker.json');

const getTalkers = () => fs.readFile(TALKER_FILE, 'utf-8').then((content) => JSON.parse(content));
const writeTalkers = (data) => fs.writeFile(TALKER_FILE, JSON.stringify(data, null, 2));

module.exports = { getTalkers, writeTalkers };
