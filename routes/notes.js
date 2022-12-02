const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');


// GET route for retrieving notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST route for adding new notes
notes.post('/', (req,res) => {
    console.log(req.body);

    const { title, text, id } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
        console.log(newNote);
        readAndAppend(newNote, './db/db.json');
        res.json('Note added successully');
    } else {
        res.error('Error');
    }
});


// DELETE route for removing notes
notes.delete('/:id', (req, res) =>{
    const id = req.params.id;
    console.log(`delete request received for ${id}`)
    readFromFile('./db/db.json').then((data) => { 
        let deleteReq = JSON.parse(data);

        let dbPostDelete = deleteReq.filter(deleteReq => deleteReq.id !== id);
        writeToFile('./db/db.json', dbPostDelete);
        console.log(deleteReq);
        // deleteReq.forEach(element => console.log(element.id, i));
        res.json(deleteReq);
    });

})

module.exports = notes;