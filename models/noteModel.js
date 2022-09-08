const notes = require('../data/notes.json')
const { v4: uuidv4 } = require('uuid')
const { writeDataToFile } = require('../utils')

function find() {
    return new Promise((resolve, reject) => {
        resolve(notes)
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const note = notes.find((n) => n.id === id)
        resolve(note)
    })
}

function create(note) {
    return new Promise((resolve, reject) => {
        const newNote = {id: uuidv4(), ...note}
        notes.push(newNote)
        writeDataToFile('./data/notes.json', notes)
        resolve(newNote) 
    })
}

module.exports = {
    find,
    findById,
    create
}
