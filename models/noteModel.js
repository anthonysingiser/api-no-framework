let notes = require('../data/notes.json')
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

function update(id, note) {
    return new Promise((resolve, reject) => {
        const index = notes.findIndex((p) => p.id === id)
        notes[index] = {id, ...note}
        writeDataToFile('./data/notes.json', notes)
        resolve(notes[index]) 
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        notes = notes.filter((p) => p.id !== id)
        writeDataToFile('./data/notes.json', notes)
        resolve() 
    })
}


module.exports = {
    find,
    findById,
    create,
    update,
    remove
}
