const http = require('http')
const { getNotes, getNote, createNote } = require('./controllers/noteController')


const server = http.createServer((req, res) => {
    if(req.url === '/api/notes' && req.method === 'GET') {
        getNotes(req, res)
    } 
    else if(req.url.match(/\/api\/notes\/([0-9]+)/) && req.method == 'GET') {
        const id = req.url.split('/')[3]
        getNote(req, res, id)

    } 
    else if (req.url === '/api/notes' && req.method === 'POST'){
        createNote(req, res)
    }
    else {
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'Route not found'}))
        
    }
})

const port = process.env.port || 5000

server.listen(port, () => console.log(`server is running on port ${port}`))