const express = require('express');
const crypto = require('crypto');

const router = express.Router();

// Middlewares
const verifyLoginEmail = require('../middlewares/verifyLoginEmail');
const verifyLoginPassword = require('../middlewares/verifyLoginPassword');

const tokenGenerate = (number) => crypto.randomBytes(number).toString('hex');

router.post('/', [
  verifyLoginEmail,
  verifyLoginPassword,
  (_req, res) => res.status(200).json({ token: tokenGenerate(8) }),
]);

module.exports = router;