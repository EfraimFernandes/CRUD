const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const usuariosDB = new sqlite3.Database('crud.db');


//Criar tabela

// usuariosDB.run(`
// CREATE TABLE usuarios (
//     rowid INTEGER PRIMARY KEY AUTOINCREMENT,
//     nome TEXT,
//     idade INTEGER,
//     email TEXT
// );
// `)

//Excluir tabela
//usuariosDB.run(`DROP TABLE usuarios;`)

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

// Rota para a página de lista de usuários
app.get('/', (req, res) => {
    usuariosDB.all(`SELECT * FROM usuarios`, (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send("Erro ao buscar dados do banco de dados");
            return;
        }
        res.render('index', { usuarios: rows });
    });
});

// Rota para adicionar um novo usuário
app.post('/add', (req, res) => {
    const { nome, idade, email } = req.body;
    usuariosDB.run(`INSERT INTO usuarios (nome, idade, email) VALUES (?, ?, ?)`, [nome, idade, email], (err) => {
        if (err) {
            console.error(err);
            res.status(500).send("Erro ao adicionar usuário");
            return;
        }
        res.redirect('/');
    });
});

// Rota para atualizar um usuário
app.post('/update', (req, res) => {
    const { id, nome, idade, email } = req.body;
    usuariosDB.run(`UPDATE usuarios SET nome = ?, idade = ?, email = ? WHERE rowid = ?`, [nome, idade, email, id], (err) => {
        if (err) {
            console.error(err);
            res.status(500).send("Erro ao atualizar usuário");
            return;
        }
        res.redirect('/');
    });
});

// Rota para deletar um usuário
app.post('/delete', (req, res) => {
    const { id } = req.body;
    usuariosDB.run(`DELETE FROM usuarios WHERE rowid = ?`, [id], (err) => {
        if (err) {
            console.error(err);
            res.status(500).send("Erro ao deletar usuário");
            return;
        }
        res.redirect('/');
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});