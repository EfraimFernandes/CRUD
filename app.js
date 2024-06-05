const sqlite3 = require('sqlite3').verbose();

const usuariosDB = new sqlite3.Database('crud.db')

//Criar uma tabela dentro do banco de dados
//usuariosDB.run('CREATE TABLE usuarios (nome TEXT, idade INTEGER, email TEXT )')

//Insere dados dentro de uma tabela
//usuariosDB.run(`INSERT INTO usuarios (nome, idade, email) VALUES('Daniel', 47, 'leinad@gmail.com')`)

//Atualizar dados na tabela
//usuariosDB.run(`UPDATE usuarios SET email='pedro2@gmail.com' WHERE email='pedro@gmail.com'`)

//Deletar um usuário da tabela
//usuariosDB.run(`DELETE FROM usuarios WHERE nome='Daniel'`)

usuariosDB.all(`SELECT * FROM usuarios`, (err, rows) => {
    if(err){
        console.log(err)
        return
    }
    console.log(rows)
})