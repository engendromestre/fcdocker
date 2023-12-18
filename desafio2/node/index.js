const express = require('express')
const app = express()
const faker = require('faker')
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config)

app.get('/', (req, res) => {
    const name = faker.name.findName()
    const sqlInsert = `INSERT INTO people(nome) values('${name}')`
    connection.query(sqlInsert)

    const sqlSelect = `SELECT nome from people`

    connection.query(sqlSelect, (error, results, fields) => {
        res.send(`
            <h1>Full Cycle Rocks!</h1>
            <ol>
                ${!!results.length ? results.map(el => `<li>${el.nome}</li>`).join('') : ''}
            </ol>
        `)
    }).on('error', function (err) {
        console.log("[mysql error]", err)
    })
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})