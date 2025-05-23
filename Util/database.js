import Database from 'better-sqlite3';

const db = new Database('./Data/database.sqlite3');

db.prepare('CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY, title TEXT, content TEXT)').run();

export const getNotes = () => db.prepare('SELECT * FROM notes').all();

export const getNoteById = (id) => db.prepare('SELECT * FROM notes WHERE id = ?').get(id);

export const addNote = (title, content) => db.prepare('INSERT INTO notes (title, content) VALUES (?, ?)').run(title, content);

export const deleteNote = (id) => db.prepare('DELETE FROM notes WHERE id = ?').run(id);

const notes = [
    { id: 1, title: 'My note', content: 'This is the first note.' },
    { id: 2, title: 'Trash', content: 'Take out the trash' },
    { id: 3, title: 'My note 3', content: 'This is the third note.' },
    { id: 4, title: 'My note 4', content: 'This is the third note.' },
];

//for (const note of notes) addNote(note.title, note.content);