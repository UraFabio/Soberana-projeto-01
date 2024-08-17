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
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS passwords (
        user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
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
        agenda_id INTEGER REFERENCES agenda(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const userResult = await client.query(`
      INSERT INTO users (name, email)
      VALUES ('admin', 'admin@admin.com')
      RETURNING id;
    `);

    const userId = userResult.rows[0].id;
    const hashedPassword = await bcrypt.hash('admin123', 10);

    await client.query(`
      INSERT INTO passwords (user_id, password)
      VALUES (${userId}, '${hashedPassword}');
    `);

    const agendaResult = await client.query(`
      INSERT INTO agenda (title, description, year, month, day)
      VALUES ('Evento Exemplo', 'Descrição do evento exemplo', 2024, 8, 17)
      RETURNING id;
    `);

    const agendaId = agendaResult.rows[0].id;

    await client.query(`
      INSERT INTO archives (path, agenda_id)
      VALUES ('storage/images/exemplo.jpg', ${agendaId});
    `);

    console.log('Tabelas e dados iniciais criados com sucesso!');
  } catch (err) {
    console.log('Erro ao executar migration inicial: ' + err.message);
  } finally {
    await client.end();
  }
}

runMigration();
