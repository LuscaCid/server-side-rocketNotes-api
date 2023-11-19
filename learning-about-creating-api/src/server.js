require('express-async-errors')
require("dotenv/config")
const AppError = require('./utils/AppError')
const migrationsRun = require('./database/sqlite/migrations/index')
const express = require("express");
const cors = require('cors')

const uploadConfigs = require('./configs/upload')

const usersRoutes = require('./routes/users.routes')
const notesRoutes = require('./routes/notes.routes')
const tagsRoutes = require('./routes/tags.routes')

const sessionsRoutes = require('./routes/sessions.routes')
migrationsRun()
const app = express();
app.use(cors())
app.use(sessionsRoutes)
app.use(usersRoutes)
app.use(notesRoutes)
app.use(tagsRoutes)

app.use('/files', express.static( uploadConfigs.UPLOADS_FOLDER ))

const PORT = process.env.SERVER_PORT || 3000;

app.use(express.json()) 

app.use((error, request, response, next)=>{
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status : "error",
            message : error.message
        })
    }
    console.error(error)
    return response.status(500).json({
        status : "500",
        message : "internal server error"
    })
})

app.listen(PORT, ()=> console.log(`the magic is happening on port: ${PORT}`))