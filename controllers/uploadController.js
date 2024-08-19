const multer = require('multer');
const path = require('path');
const pool = require('./../database');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'storage/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'Nenhum arquivo enviado.' });
    }

    const filePath = `storage/${req.file.filename}`;

    await pool.query(
      `
      INSERT INTO archives (path) VALUES ($1);
    `,
      [filePath]
    );

    res.status(200).json({
      status: 'success',
      message: 'Arquivo carregado e salvo com sucesso!',
      file: filePath,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: 'error', message: 'Erro ao carregar o arquivo.' });
  }
};

exports.getFiles = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM archives
    `);

    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'falha ao buscar arquivos',
    });
  }
};

exports.upload = upload;
