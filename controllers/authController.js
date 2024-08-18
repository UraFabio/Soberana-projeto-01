const jwt = require('jsonwebtoken');
const pool = require('./../database');
const bcrypt = require('bcrypt');

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await pool.query(
    `
    SELECT * FROM users  
    WHERE email = $1
  `,
    [email]
  );

  if (!user || !(await bcrypt.compare(password, user.rows[0].password))) {
    return res.status(401).json({
      status: 'fail',
      message: 'Credenciais inválidas',
    });
  }

  const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    status: 'success',
    token,
  });
};

exports.protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
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
