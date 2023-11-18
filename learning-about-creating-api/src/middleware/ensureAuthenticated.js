const { verify } = require('jsonwebtoken')
const AppError = require('../utils/AppError')
const authConfig = require('../configs/auth')

function ensureAuthenticated (request, response,next){
  const authHeader = request.headers.authorization
  //eh onde vai estar o token

  if(!authHeader) throw new AppError('jwt token nao informado', 401)

  const [, token ] = authHeader.split(' ')

  //porem eu so quero pegar a payload onde se encotra o subject que no
  //caso é o id que é passado, entao eu o encontro na segunda posicao (1)
  //pois as posicoes sao divididas por espacos, logo o meu split vai 
  // quebrar em 3 partes o meu token inteiro
  try {
    const {sub : user_id} = verify(token, authConfig.jwt.secret)
    request.user = {
      id : Number(user_id)
    }
    return next()
  } catch {
    throw new AppError('JWT token invalido', 401)
  }
  
}

module.exports = ensureAuthenticated