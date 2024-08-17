const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  port: '5432',
  password: 'senha123',
  database: 'teste',
});

client.connect();

client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE NOT NULL
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

client.query(`
    CREATE TABLE IF NOT EXISTS passwords (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

client.end();
