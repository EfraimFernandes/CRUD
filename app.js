const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

const usuariosDB = new sqlite3.Database('crud.db')

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

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

//Criar uma tabela dentro do banco de dados
//usuariosDB.run('CREATE TABLE usuarios (nome TEXT, idade INTEGER, email TEXT )')

//Insere dados dentro de uma tabela
//usuariosDB.run(`INSERT INTO usuarios (nome, idade, email) VALUES('Daniel', 47, 'leinad@gmail.com')`)

//Atualizar dados na tabela
//usuariosDB.run(`UPDATE usuarios SET email='pedro2@gmail.com' WHERE email='pedro@gmail.com'`)

//Deletar um usuário da tabela
//usuariosDB.run(`DELETE FROM usuarios WHERE nome='Daniel'`)

// usuariosDB.all(`SELECT * FROM usuarios`, (err, rows) => {
//     if(err){
//         console.log(err)
//         return
//     }
//     console.log(rows)
// })