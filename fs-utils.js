const fs = require('fs/promises');

const TALKER_FILE = './talker.json';

const getTalkers = () => fs.readFile(TALKER_FILE, 'utf-8').then((content) => JSON.parse(content));
const writeTalkers = (data) => fs.writeFile(TALKER_FILE, JSON.stringify(data, null, 2));

module.exports = { getTalkers, writeTalkers };
