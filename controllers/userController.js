const jwt = require('jsonwebtoken');
const pool = require('./../database');
const bcrypt = require('bcrypt');

exports.getUser = async (req, res) => {
  const userId = req.user.id;
  console.log(userId);
  try {
    const user = await pool.query(
      `
      SELECT name, email, created_at FROM users
      WHERE id = $1
    `,
      [userId]
    );

    res.status(200).json({
      status: 'success',
      data: user.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'falha ao buscar usuário',
    });
  }
};

exports.createAccount = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!name || !email || !password) {
      throw new Error('Todos os campos devem estar preecnhidos');
    }

    const userId = await pool.query(
      `
      INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING id;
    `,
      [name, email, hashedPassword]
    );

    const token = jwt.sign({ id: userId.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      status: 'success',
      token,
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.deleteAccount = async (req, res) => {
  const userId = req.user.id;

  try {
    await pool.query(
      `
      DELETE FROM users
      WHERE id = $1
      `,
      [userId]
    );

    res.status(204).json({
      status: 'success',
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Erro ao excluir usuario',
    });
  }
};
