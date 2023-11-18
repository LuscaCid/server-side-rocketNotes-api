const express = require('express')
const usersRoutes = express()
const multer = require('multer')

const AppError = require('../utils/AppError')
const ensureAuthenticated= require('../middleware/ensureAuthenticated')
const UserController = require('../controllers/UsersController') 
const UserAvatarControllers = require('../controllers/userAvatarControllers')

const uploadsConfig = require('../configs/upload')
const userAvatarControllers = new UserAvatarControllers()
const upload = multer(uploadsConfig.MULTER)

function myMiddleware(req, res, next){
    const person = req.body
    if (person.userName){
        next()
    } else throw new AppError('nome obrigatorio') 
    /* return res.status(401).send('nao foi possivel criar, nome nao passado')/*/
}

const userController = new UserController()

usersRoutes.use(express.json())
usersRoutes.put('/users', ensureAuthenticated,userController.updateUser)
/*atualização*/

usersRoutes.put('/userspassword', ensureAuthenticated, userController.updatePassword)

usersRoutes.delete('/deleteUser', ensureAuthenticated, userController.deleteSelfAccount)
/**
 * nao vou mais precisar passar o id no route params pq eele vai
 * pegar do meu token presente no req.user.id 
 * 
 * const [, token] = request.headers.authorization.trim(' ')
 * 
 * try {
 *      const  { sub : user_id} = verify(token , authConfig.jwt.secret)
 *  
 *      request.user = {
 *          id : Number(user_id)
 *      }
 * }
 */
usersRoutes.patch('/avatar' , ensureAuthenticated, upload.single('avatar'), userAvatarControllers.UpdateFile)

usersRoutes.post('/create', userController.createUser)
/*criacao, lancamento no database*/ 


module.exports = usersRoutes