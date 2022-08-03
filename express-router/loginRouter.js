const express = require('express');
const crypto = require('crypto');

const router = express.Router();

// Regex do email utilizado no projeto TrybeWallet do Guilherme Fernandes
// source: https://github.com/guilherme-ac-fernandes/trybewallet/blob/main/src/pages/Login.js
router.post('/', async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' }); 
  }
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

module.exports = router;