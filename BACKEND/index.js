//
//if node: /lib/x86_64-linux-gnu/libc.so.6: version `GLIBC_2.28' not found (required by node) then nvm install 16
//

const express = require('express')
const {response} = require("express");

const app = express();

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2022-05-30T17:30:31.098Z",
        important: true
    }, {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2022-05-30T18:39:34.091Z",
        important: false
    }, {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2022-05-30T19:20:14.298Z",
        important: true
    }]

app.use(express.json())

app.post('/api/notes', (req,res) =>{
    const availableId = notes.length > 0 ? notes.length+1 : 0;

    if (!req.body.content) {
        return res.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        id: availableId,
        content: req.body.content,
        date: new Date(),
        important: req.body.important || false,
    }

    notes = notes.concat(note)
    console.log(note);
    res.json(note);
})

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response)=> {
    const id = request.params.id;
    const note = notes.find(note=> note.id == id);
    if (note) {
        response.json(note);
    } else {
        response.send('<h1 id="text">There is no any note with id</h1>');
        response.status(404).end();
    }

})

app.delete('/api/notes/:id',(req, res) => {
    const id = req.params.id;
    notes = notes.filter(note => note.id != id);

    res.send('<h1 id="text">The note is deleted</h1>');
    res.status(204).end;
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
