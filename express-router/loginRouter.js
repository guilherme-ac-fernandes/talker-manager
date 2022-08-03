const express = require('express');
const crypto = require('crypto');

// Middlewares
const loginMiddlewares = require('../middlewares/login');

const router = express.Router();

const tokenGenerate = (number) => crypto.randomBytes(number).toString('hex');

router.post('/', [
  loginMiddlewares,
  (_req, res) => res.status(200).json({ token: tokenGenerate(8) }),
]);

module.exports = router;