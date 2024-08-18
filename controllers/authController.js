const jwt = require('jsonwebtoken');
// const User = require('../models/userModel'); // Um modelo que representa o usuário no banco de dados

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // 1. Verifique se o usuário existe e a senha está correta
  /* const user = await User.findOne({ email });
  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      status: 'fail',
      message: 'Credenciais inválidas',
    });
  } */

  console.log(email, password);

  // 2. Se correto, crie o token JWT
  const token = jwt.sign({ id: 23 /* user._id */ }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  // 3. Envie o token ao cliente
  res.status(200).json({
    status: 'success',
    token,
  });
};



exports.protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      status: 'fail',
      message: 'Você não está logado! Por favor, faça login para obter acesso.',
    });
  }

  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: 'fail',
        message: 'Token inválido ou expirado.',
      });
    }

    // 3. Adicionar os dados do usuário ao request (opcional)
    req.user = decoded;

    // 4. Continuar para a próxima middleware/rota
    next();
  });
};