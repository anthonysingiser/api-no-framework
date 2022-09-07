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

module.exports = {
    getNotes,
    getNote
}
