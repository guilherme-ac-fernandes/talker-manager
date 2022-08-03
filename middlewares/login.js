const verifyPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    }); 
  }
  if (password.length < 6) {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    }); 
  }
  next();
};

// Regex do email utilizado no projeto TrybeWallet do Guilherme Fernandes
// source: https://github.com/guilherme-ac-fernandes/trybewallet/blob/main/src/pages/Login.js
const verifyEmail = (req, res, next) => {
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

module.exports = [verifyPassword, verifyEmail];
