const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middlewares
app.use(bodyParser.json());
app.use(cors()); // Certifique-se que o CORS está habilitado para evitar problemas cross-origin

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database(':memory:');

// Criar tabela de usuários com campos validados
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      name TEXT NOT NULL, 
      email TEXT NOT NULL UNIQUE, 
      login TEXT NOT NULL UNIQUE, 
      password TEXT NOT NULL, 
      city TEXT NOT NULL
    )`
  );
});

// Rota inicial
app.get('/', (req, res) => {
  res.send('API de CRUD de Usuários está rodando.');
});

// CRUD de Usuários

// CREATE - Adicionar um novo usuário
app.post('/users', (req, res) => {
  const { name, email, login, password, city } = req.body;

  // Verificação simples dos campos obrigatórios
  if (!name || !email || !login || !password || !city) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  const query = 'INSERT INTO users (name, email, login, password, city) VALUES (?, ?, ?, ?, ?)';
  db.run(query, [name, email, login, password, city], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, name, email, login, city });
  });
});

// READ - Listar todos os usuários
app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// READ - Obter um usuário por ID
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    res.json(row);
  });
});

// UPDATE - Atualizar um usuário
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, login, password, city } = req.body;

  // Verificação simples dos campos obrigatórios
  if (!name || !email || !login || !password || !city) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  const query = 'UPDATE users SET name = ?, email = ?, login = ?, password = ?, city = ? WHERE id = ?';
  db.run(query, [name, email, login, password, city, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    res.json({ message: 'Usuário atualizado com sucesso.' });
  });
});

// DELETE - Deletar um usuário
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE id = ?';
  db.run(query, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    res.json({ message: 'Usuário deletado com sucesso.' });
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
