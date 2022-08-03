// Regex do email utilizado no projeto TrybeWallet do Guilherme Fernandes
// source: https://github.com/guilherme-ac-fernandes/trybewallet/blob/main/src/pages/Login.js
module.exports = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    }); 
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!(email.match(emailRegex))) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    }); 
  }
  next();
};