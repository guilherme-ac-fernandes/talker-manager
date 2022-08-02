// Utilização do Number.isInteger para avaliar número inteiro
// source: https://masteringjs.io/tutorials/fundamentals/is-integer
module.exports = (req, res, next) => {
  const { talk } = req.body;
  if (!talk.rate) {
    return res.status(400).json({
      message: 'O campo "rate" é obrigatório',
    });
  }
  if (talk.rate < 1 || talk.rate > 5) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  if (!Number.isInteger(talk.rate)) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  next();
};