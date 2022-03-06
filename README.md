# cali-visiting-backend
This is the backend for the Cali Visiting repo. This backend handles user and notes connection to the database. This runs MERN

# Code Snippets
```
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
```
