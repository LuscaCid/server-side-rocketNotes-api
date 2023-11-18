const DiskStorage = require('../providers/DiskStorage')
const knex = require('../database/knex')
const AppError = require('../utils/AppError')

class UserAvatarControllers {
  async UpdateFile(req,res){
    const diskStorage = new DiskStorage()
    
    const user_id = req.user.id
    const fileIndex = req.file.filename
    const user = await knex('users2')
    .where({id : user_id}).first()
    
    if(!user)throw new AppError('usuario nao autenticado', 401)

    if(user.avatar){
      await diskStorage.deleteFile(user.avatar)
    }
    const filename = await diskStorage.saveFile(fileIndex)
  
    await knex("users2").where({id : user_id}).update({avatar :  filename})
    console.log(user)
    return res.status(201).json(user)
  }
} 
module.exports = UserAvatarControllers



/**
 * eu preciso sempre que o usuario ja tiver uma foto, deletala para que nao 
 * haja a sobrescrita de arquivos e meu banco nao fique lotado de imagens 
 * nao utilizadas.
 *  
 * 
 */