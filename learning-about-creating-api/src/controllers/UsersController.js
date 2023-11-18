const {hash , compare} = require('bcryptjs')
const AppError = require('../utils/AppError')
const knex = require('../database/knex/')
const sqliteConection = require('../database/sqlite/index')
class UserController {
        
    async updatePassword(req,res){
        const user_id = req.user.id
        const {oldPassword, newPassword} = req.body
        const database = await sqliteConection()
        const currentUserPassword = await database.get('select * from users2 where id = (?)',[user_id])
        
        if(currentUserPassword.password && oldPassword){
            if(await compare(oldPassword, currentUserPassword.password )){
                const newHashedPassword = await hash(newPassword, 8)
               
                await database.run(`UPDATE users2 SET password = ? where id = ?`,[newHashedPassword, user_id])
                res.status(200).send('senha alterada com sucesso')
                return res.json(currentUserPassword)
            }
            throw new AppError('As senhas nao correspondem', 401)
        }
        else {
            res.status(403).send('informe o(s) dado(s) solicitado(s)')
        }
    }

    async updateUser(req, res){
        const user_id = req.user.id
        const database = await sqliteConection()
        const userExists = await database.get('select * from users2 where id = (?)',[user_id])
        if(!userExists){
            res.status(404).send('usuario inexistente. Não encontrado')
            return
        }
        const {name, email} = req.body
        const alreadyEmailRegistered = await database.get('select * from users2 where email = (?)',[email])
        if(alreadyEmailRegistered && alreadyEmailRegistered.id != user_id){
            console.log('email ja esta em uso')
            return res.status(401).send('email em uso')
        } 
        userExists.name = name ? name : userExists.name
        userExists.email = email ? email : userExists.email
        await database.run(`
            UPDATE users2 SET 
            name = ?,
            email = ?,
            updated_at = DATETIME('now')
            WHERE id = ?
        `,[userExists.name,userExists.email, user_id])

        return res.status(200).json(userExists)
    }

    async createUser(req ,res){
        
        const {
            userName,
            email,
            password,
        } = req.body
        const hashedPassoword = await hash(password, 8)
        const database = await sqliteConection()
        const userExists = await database.get('SELECT email FROM users2 WHERE email = (?)',[email])
        if(userExists){
            res.status(401).send('email ja cadastrado no banco de dados')
            return
            /*throw ErrorInApp*/  
        } 
        await database.run('INSERT INTO users2 (name, password, email) VALUES (?, ?, ?)',[userName,hashedPassoword,email])
        .then(res.status(201).send(`usuario: ${userName} cadastrado com sucesso!`))
        
        return res.status(201).json()
    }
    async deleteSelfAccount(req, res) {
        const user_id = req.user.id
        const database = await sqliteConection()
        await database.run('DELETE from users2 where id = (?)',[user_id])
        res.status(200).json()
    }

}
module.exports = UserController