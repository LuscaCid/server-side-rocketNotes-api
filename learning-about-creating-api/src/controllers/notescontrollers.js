const knex = require('../database/knex/index')

class NotesControllers{

    async testing(req, res){
        const {page} = req.query
        res.status(200).send(`demonstracao ${page}`)
    }

    async createNote(req, res){
        const {
            tittle,
            description,
            tags,
            links
        } = req.body
        const user_id = req.user.id
        
        const noteId = await knex("notes").insert({
            tittle,
            description,
            user_id
        })
        //ele pega o id da nota ao inserir e dps passa para
        //os links que serao inseridos como foreign key
        const value = noteId[0]
        console.log(value)
        
        const linksInsert = links.map(function(link){
            return {
                note_id : value,
                url : link
            }
        })

        await knex("links").insert(linksInsert)
        const tagsInsert = tags.map(name => {
            return {
                note_id : value,
                name,
                user_id
            }
        })
        res.json()
        await knex("tags").insert(tagsInsert)
    }

    async showNote(request,response){
        const {id} = request.params
        const actualNote = await knex("notes").where({ id }).first()
        const tags = await knex("tags").where({note_id : id}).orderBy('name')
        const links = await knex("links").where({note_id : id}).orderBy("created_at")
        
        console.log(actualNote)
        

        return response.status(200).json({actualNote,tags,links})
    }

    async showAllNotes(req, res){
        const {tittle,tags} = req.query
        let notes;
        const user_id = req.user.id
        if(tags){
            const filteredTags = tags.split(',').map(tag=> tag.trim())
            console.log(filteredTags)
            notes = await knex("tags")
            .select([
                "notes.id",
                "notes.tittle",
                "notes.user_id",
            ])
            .where("notes.user_id", user_id)
            .whereLike("notes.tittle", `%${tittle}%`)
            .whereIn("name", filteredTags)
            .innerJoin("notes", "notes.id","tags.note_id")
            
        } else {
            notes = await knex("notes")
            .where({user_id})
            .whereLike("tittle", `%${tittle}%`)
            .orderBy("tittle")
        }
        const allTags = await knex("tags").where({user_id})
        
        const notesWithTags = notes.map((note)=>{
            const noteTags = allTags.filter(tag => tag.note_id === note.id)
            return {
                ...note,
                tags : noteTags
            }
        })

        res.json(notesWithTags)
        /*trim remove espaco em branco
          map é uma forma de percorrer o vetor item a item
          .split eh um jeito de dividir minha string a depender do argumento q 
          eu passar, ou seja, dividirá em substrings caso eu passe que ao encontrar uma virgula, ele coloque aquele trecho em uma posicao do array e o resto (ate achar outra virgula), em outra posicao
        */
    }
    
    
    async deleteNote(req,res){
        const id = req.params.id
        await knex("notes").where({id}).delete()
        await knex("tags").where({note_id : id}).delete()
        await knex("links").where({note_id : id}).delete()
        return res.json()
    }
}
module.exports = NotesControllers