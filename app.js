
const fs = require('fs');
const _ = require('lodash');
const argv = require('yargs').argv;

const notes = require('./notes.js');

var command = argv._[0];

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log("Created note:", note.title, note.body);
    }
    else {
        console.log("This note already exists.");
    }
}
else if (command === 'list') {
    notes.getAll();
}
else if (command === 'read') {
    notes.getNote(argv.title);
}
else if (command === 'remove') { 
    notes.deleteNote(argv.title);
}
else {
    console.log('Unknown command.');
}