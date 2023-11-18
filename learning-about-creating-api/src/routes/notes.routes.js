const express = require('express')
const notesRoutes = express()
const NoteController = require('../controllers/notescontrollers') 
const AppError = require('../utils/AppError')
const ensureAuthenticated = require('../middleware/ensureAuthenticated')

function myMiddleware(req, res, next){
    const person = req.body
    if (person.userName){
        next()
    } else throw new AppError('nome obrigatorio') 
    /* return res.status(401).send('nao foi possivel criar, nome nao passado')/*/
}
notesRoutes.use(express.json())
const noteController =  new NoteController()

notesRoutes.get('/', noteController.testing)

notesRoutes.post('/notes',ensureAuthenticated ,  noteController.createNote)

async function ExistsIdInNotes(req, res, next){
    const knex = require('../database/knex')
    const note_id = req.params.id
    
                    
    console.log(await knex('notes').where({note_id}))
    if(isID) return next()
    else throw new AppError('id passado nao existente dentro da tabela "notes"')
}

notesRoutes.get('/show/:id', noteController.showNote)

notesRoutes.get('/showall', ensureAuthenticated,noteController.showAllNotes)



notesRoutes.delete('/deletenote/:id',ensureAuthenticated , noteController.deleteNote)

notesRoutes.delete('/deleteall', deleteAll)

async function deleteAll(req, res){
    const knex = require("../database/knex")
    await knex('users2').delete()
    await knex("notes").delete()
    await knex("tags").delete()
    await knex("links").delete()
    res.json()
}
/**
 * a funcao acima tem o objetivo de resetar todas as tables da aplicacao backend 
 */

module.exports = notesRoutes