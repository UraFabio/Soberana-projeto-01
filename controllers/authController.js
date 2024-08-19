const jwt = require('jsonwebtoken');
const pool = require('./../database');
const bcrypt = require('bcrypt');

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);

  if (!email || !password) {
    throw new Error();
  }

  try {
    const user = await pool.query(
      `
    SELECT * FROM users  
    WHERE email = $1
  `,
      [email]
    );

    if (user.rowCount === 0) {
      throw new Error('Email não cadastrado');
    }

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
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err.message,
    });
  }
};

exports.protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token || token == '') {
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

    req.user = decoded;

    next();
  });
};
