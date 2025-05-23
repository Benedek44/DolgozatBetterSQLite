import express from "express";
import * as db from './Util/database.js'

const PORT = 8080;
const app = express();
app.use(express.json());

app.get('/notes', (req, res) => {
    try {
        const notes = db.getNotes();
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({message: `${error}`});
    }
})

app.get('/notes/:id', (req, res) => {
    try {
        const note = db.getNoteById(req.params.id);
        if (!note) {
            return res.status(404).json({message: 'Note not found!'});
        }
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({message: `${error}`});
    }
})

app.post('/notes', (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({message: 'Title and content are required!'});
        }
        const note = db.addNote(title, content);
        res.status(201).json({id: note.lastInsertRowid});
    } catch (error) {
        res.status(500).json({message: `${error}`});
    }
})

app.delete('/notes/:id', (req, res) => {
    try {
        const note = db.getNoteById(req.params.id);
        if (!note) {
            return res.status(404).json({message: 'Note not found!'});
        }
        db.deleteNote(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({message: `${error}`});
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})