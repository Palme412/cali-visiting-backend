const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Note = require('../models/note');
const app = express();
const router = express.Router();
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(logger('dev'));

router.get('/', (req, res) => {
    res.json({ message: 'This works!!!!' });
});

router.get('/add_note', (req, res) => {
    Note.find((err, text) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: text });
    });
});

router.post('/add_note', (req, res) => {
    const note = new Note();
    const { text } = req.body;
    if (!text) {
        return res.json({
            success: false,
            error: 'There is an error'
        });
    }
    note.text = text;
    note.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

router.post('/note/:noteId', (req, res) => {
    const { noteId } = req.params;
    if (!noteId) {
        return res.json({ success: false, error: 'No note id provided' });
    }
    Note.findById(noteId, (error, Note) => {
        if (error) return res.json({ success: false, error });
        const { text } = req.body;
        if (text) Note.text = text;
        Note.save(error => {
            if (error) return res.json({ success: false, error });
            return res.json({ success: true });
        });
    });
});

router.delete('/note/:noteId', (req, res) => {
    const { noteId } = req.params;
    if (!noteId) {
        return res.json({ success: false, error: 'No note id provided ' });
    }
    Note.remove({ _id: noteId }, (error, note) => {
        if (error) return res.json({ success: false, error });
        return res.json({ success: true });
    });
});
module.exports = router;