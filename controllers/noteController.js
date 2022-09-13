const Notes = require('../models/noteModel')
const { getPostData } = require('../utils')

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
        const body = await getPostData(req)
        const { text, date } = JSON.parse(body)
        const note = {
            text, 
            date
        }
        
        const newNote = await Notes.create(note)

        res.writeHead(201, {'Content-Type': 'application/json'})
        return res.end(JSON.stringify(newNote))
    } catch (error) {
        console.log(error)
    }
}

async function updateNote(req, res, id) {
    try {
        const note = await Notes.findById(id)

        if(!note){
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Note Not Found'}))
        } else {
            const body = await getPostData(req)
            const { text, date } = JSON.parse(body)
            const noteData = {
                text: text || note.text, 
                date: date || note.date
            }
        
            const upNote = await Notes.update(id, noteData)

            res.writeHead(200, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify(upNote))
        }
        
    } catch (error) {
        console.log(error)
    }
}

async function removeNote(req, res, id) {
    try {  
        const note = await Notes.findById(id)
        if(!note) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Note not found'}))
        } else {
            await Notes.remove(id)
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: `Note ${id} removed`}))
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getNotes,
    getNote,
    createNote,
    updateNote,
    removeNote
}