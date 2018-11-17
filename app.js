
var titleOptions = {
    describe: 'The title of the note',
    demand: true,
    alias: 't'
};
var bodyOptions = {
    describe: 'The actual note text',
    demand: true,
    alias: 'b'
};

const fs = require('fs');
const _ = require('lodash');
const argv = require('yargs')
    .command('add', 'Add a note.', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'Print out all notes', {})
    .command('read', 'Read a single note', {
        title: titleOptions
    })
    .command('remove', 'Remove a single note', {
        title: titleOptions
    })
    .help()
    .argv;

const notes = require('./notes.js');

var command = argv._[0];

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log("Note created");
        notes.logNote(note);
    }
    else {
        console.log("This note already exists.");
    }
}
else if (command === 'list') {
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s)`);
    _.forEach(allNotes, function(note, i) {
        console.log(`Note # ${i}`);
        notes.logNote(note);
    });
}
else if (command === 'read') {
    var note = notes.getNote(argv.title);
    if (note) {
        notes.logNote(note);
    }
    else {
        console.log('Note NOT found');
    }
}
else if (command === 'remove') { 
    var noteRemoved = notes.deleteNote(argv.title);
    var message = noteRemoved ? 'Note was removed' : 'Note NOT removed';
    console.log(message);
}
else {
    console.log('Unknown command.');
}