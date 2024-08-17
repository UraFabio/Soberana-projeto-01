const pool = require('../database');

exports.checkBody = (req, res, next) => {
  if (!req.body.title) {
    return res.status(400).json({
      status: 'fail',
      message: 'missing title',
    });
  }
  next();
};

exports.getAllAgendas = async (req, res) => {
  try {
    const agendas = await pool.query(`
      SELECT * FROM agenda 
      ORDER BY year DESC, month ASC, day ASC;
    `);

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: agendas.rowCount,
      data: agendas.rows,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Erro ao buscar agendas',
    });
  }
};

exports.getAgenda = async (req, res) => {
  const id = req.params.id * 1;

  try {
    const agenda = await pool.query(
      `
      SELECT * FROM agenda
      WHERE agenda.id = $1;
    `,
      [id]
    );

    if (agenda.rows.length < 1) {
      throw new Error();
    }

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: agenda.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Erro ao buscar agenda',
    });
  }
};

exports.createAgenda = async (req, res) => {
  try {
    const result = await pool.query(
      `
      INSERT INTO agenda (title, description, year, month, day)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id;
    `,
      [
        req.body.title,
        req.body.description,
        req.body.year,
        req.body.month,
        req.body.day,
      ]
    );

    res.status(201).json({
      status: 'created',
      agenda: { id: result.rows[0].id, ...req.body },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Erro ao criar agenda',
    });
  }
};

exports.updateAgenda = async (req, res) => {
  try {
    const id = req.params.id * 1;
    const body = req.body;

    const result = await pool.query(
      `
      SELECT * FROM agenda
    WHERE id = $1;
    `,
      [id]
    );

    const agenda = result.rows[0];

    const newAgenda = {};

    for (const key in agenda) {
      if (!body.hasOwnProperty(key)) {
        newAgenda[key] = agenda[key];
      } else {
        newAgenda[key] = body[key];
      }
    }

    await pool.query(
      `
      UPDATE agenda
      SET title = $1, description = $2, year = $3, month = $4, day = $5
      WHERE id = $6;
    `,
      [
        newAgenda.title,
        newAgenda.description,
        newAgenda.year,
        newAgenda.month,
        newAgenda.day,
        id,
      ]
    );

    res.status(200).json({
      status: 'success',
      agenda: { id: id, ...newAgenda },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Erro ao atualizar agenda',
    });
  }
};

exports.deleteAgenda = async (req, res) => {
  const id = req.params.id * 1;

  try {
    await pool.query(
      `
      DELETE FROM agenda
      WHERE id = $1;
    `,
      [id]
    );
    console.log('oi');
    res.status(204).json({
      status: 'success',
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Erro ao excluir agenda',
    });
  }
};
