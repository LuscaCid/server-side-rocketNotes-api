const express = require('express')
const tagsRoutes = express()
const TagsControllers = require('../controllers/tagsController')
const AppError = require('../utils/AppError')
const ensureAuthenticated = require('../middleware/ensureAuthenticated')

tagsRoutes.use(express.json())
const tagsController = new TagsControllers()

async function tagMiddleware(req, res,next){
    const {id} = req.query
    
    if(id)next()
    else {
        throw new AppError('id para rota de tags nao passado')
    }
}

tagsRoutes.get('/showalltags', ensureAuthenticated, tagsController.showAllTags)

tagsRoutes.get('/testingTags/', tagMiddleware, tagsController.testingApplication )


module.exports = tagsRoutes


