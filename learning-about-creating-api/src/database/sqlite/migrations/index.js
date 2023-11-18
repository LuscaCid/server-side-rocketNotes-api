const sqliteConnection = require('../../sqlite/index')
const createUsers = require('./createUser')

async function migrationsRun (){
    const schemas = [
        createUsers
    ].join('')
    sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(error => console.error(error))
}
module.exports = migrationsRun

/*
estou trocando o sqliteConection pelo migrationsRun para que ja ao criar ou executar o database, ele crie tambem as tabelas. isso eh insano 
*/ 