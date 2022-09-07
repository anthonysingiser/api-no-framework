const notes = require('../data/notes.json')

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

module.exports = {
    find,
    findById
}
