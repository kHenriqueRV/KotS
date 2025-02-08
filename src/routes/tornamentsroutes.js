const router = require('express').Router();
const tournamentsdb = require('../dbconfig/tournamentsdb');
const { randomUUID } = require('node:crypto');


router.get('/', async (req, res)=> {
    try {
        const tournaments = await tournamentsdb.list();
        res.json(tournaments);
    } catch(error) {
        res.status(500).json({ message: 'Internal server error' });
    }
  
});

router.post('/create', (req, res) => {
    const { tittle, description, photo, participants } = req.body;
    if (!tittle || !description || !photo || !participants) {
        return res.status(400).json({ message: 'All fields are required' });
    } else {
        tournamentsdb.create({ tittle, description, photo, participants });
        res.json({ message: 'Tournament created successfully' });
    }

});

router.put('/update/:id', (req, res) => {
    const { tittle, description, participants } = req.body;
    if (!tittle || !description || !participants) {
        return res.status(400).json({ message: 'All fields are required' });
    } else {
        tournamentsdb.update({ tittle, description, participants });
        res.json({ message: 'Tournament updated successfully' });
    }
});

router.delete('/delete/:id', (req, res) => {
    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    } else {
        tournamentsdb.delete(id);
        res.json({ message: 'Tournament deleted successfully' });
    }
});

module.exports = router;




