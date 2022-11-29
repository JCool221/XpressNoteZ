const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');


// GET route for retrieving notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req,res) => {
    console.log(req.body);

    const { noteTitle, noteText } = req.body;

    if (req.body) {
        const newNote = {
            noteTitle,
            noteText,
            note_id: uuidv4(),
        };
        console.log(newNote);
        readAndAppend(newNote, './db/db.json');
        res.json('Note added successully');
    } else {
        res.error('Error');
    }

});

module.exports = notes;