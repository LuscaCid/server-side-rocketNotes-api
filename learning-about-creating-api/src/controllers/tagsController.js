const knex = require('../database/knex/index')

class TagsController  { 
    async testingApplication(req, res){
        res.status(201).send('its working')
    }

    async showAllTags(req, res){
        const {tittle} = req.query
        const user_id = req.user.id
        let allTags
        let tagID65
        if(tittle){
            allTags = await knex("tags")
            .where({user_id})
            .whereLike("name", `%${tittle}%`)
            .groupBy('name')//ele so vai me retornar se nao estiver repetido
            /**onde a coluna name tiver antes ou dps o tittle */
        } else {
            allTags = await knex("tags")
            .where({user_id})
            .groupBy('name')
            allTags = allTags.filter(tag => tag.user_id === Number(user_id))
            console.log(allTags)
        }
        const tags = allTags
        res.json(tags)
    }
}
module.exports = TagsController


/**
 * quando as colunas dentro do banco de dados tem o mesmo nome que a variavel
 * nao precisa passar como argumento para o where (user_id : user_id) por exemplo
 * 
 */