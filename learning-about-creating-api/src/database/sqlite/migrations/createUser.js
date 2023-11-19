const createUsers = `
    CREATE TABLE IF NOT EXISTS users2 (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name varchar not null,
    email VARCHAR,
    password VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) 
`
module.exports = createUsers