const { Client } = require('pg');
const bcrypt = require('bcrypt');

async function runMigration() {
  const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: '5432',
    password: 'senha123',
    database: 'project01',
  });

  await client.connect();

  try {
    await client.query(`
      DROP SCHEMA public CASCADE;
      CREATE SCHEMA public;
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS agenda (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        year INTEGER NOT NULL,
        month INTEGER NOT NULL,
        day INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS archives (
        path TEXT PRIMARY KEY NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const hashedPassword = await bcrypt.hash('admin123', 10);

    await client.query(`
      INSERT INTO users (name, email, password)
      VALUES ('admin', 'admin@admin.com', '${hashedPassword}')
    `);

    await client.query(`
      INSERT INTO agenda (title, description, year, month, day)
      VALUES ('Evento Exemplo', 'Descrição do evento exemplo', 2024, 8, 17);
    `);

    await client.query(`
      INSERT INTO archives (path)
      VALUES ('storage/example.jpg');
    `);

    console.log('Tabelas e dados iniciais criados com sucesso!');
  } catch (err) {
    console.log('Erro ao executar migration inicial: ' + err.message);
  } finally {
    await client.end();
  }
}

runMigration();
