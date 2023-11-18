const knex = require('../database/knex')
const {hash , compare} = require('bcryptjs')

const {sign} = require('jsonwebtoken')
const  authConfig = require('../configs/auth')

const AppError = require('../utils/AppError')
class SessionsControllers {
  async create(request , response){
    const {email, password} = request.body
    const user = await knex('users2').where({email}).first()
    if(!user)throw new AppError('E-mail ou senha incorretos', 401)

    const checkedPassword = await compare(  password, user.password)

    if(!checkedPassword) throw new AppError('E-mail ou senha incorretos', 401)
    
    const {secret, expiresIn} = authConfig.jwt
    
    const token = sign({} , secret, {
      subject : String(user.id), //payload que vai armazenar as info
      expiresIn
    })

    return response.json({user, token})
  }

}
module.exports = SessionsControllers

/**
 * json web token eh a forma pela qual eu vou usar para trocar 
 * informacoes de dentro da minha aplicacao de forma segura pasando
 * por um objeto json as informacoes que eu quero de forma encriptada
 * isso vai me garantir a integridade da aplicacao como um todo
 * 
 */