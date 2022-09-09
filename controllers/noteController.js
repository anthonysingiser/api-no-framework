const Notes = require('../models/noteModel')

async function getNotes(req, res) {
    try {
        const notes = await Notes.find()
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(notes))
    } catch (error) {
        console.log(error)
    }
}

async function getNote(req, res, id) {
    try {  
        const note = await Notes.findById(id)
        if(!note) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Note not found'}))
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(note))
        }
    } catch (error) {
        console.log(error)
    }
}

async function createNote(req, res) {
    try {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString()
        })
        req.on('end', async () => {
            const {title, description, date} = JSON.parse(body)
            const note = {
                title, 
                description,
                date
            }
            const newNote = await Notes.create(note)

            res.writeHead(201, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify(newNote))
        }) 
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getNotes,
    getNote,
    createNote
}
