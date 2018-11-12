console.log('notes lib...');

const fs = require('fs');

var fetchNotes = () => {
	try {
		var notesString = fs.readFileSync('notes-data.json');
		return JSON.parse(notesString);
	}
	catch (e) {
		return [];
	}
}

var saveNotes = (notes) => {
	fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

var addNote = (title, body) => {
	var notes = fetchNotes();
	var note = {
		title,
		body
	};

	var duplicateNotes = notes.filter((note) => note.title === title);

	if (duplicateNotes.length == 0) {
		notes.push(note);
		saveNotes(notes);
		return note;
	}
}

var getAll = () => {
	return fetchNotes();
}

var getNote = (title) => {
	var notes = fetchNotes();
	var foundNotes = notes.filter((note) => note.title === title);
	if (foundNotes.length == 1) {
		return foundNotes[0];
	}
	else {
		return false;
	}
}

var deleteNote = (title) => {
	var notes = fetchNotes();
	var remainingNotes = notes.filter((note) => note.title !== title);
	saveNotes(remainingNotes);
	return notes.length !== remainingNotes.length;
}

var logNote = (note) => {
	console.log('---');
	console.log(`Title: ${note.title}`);
	console.log(`Body: ${note.body}`);
	console.log('---');
}

module.exports = {
	addNote,
	getAll,
	getNote,
	deleteNote,
	logNote,
};