const router = require('express').Router();
const tournamentsdb = require('../dbconfig/tournamentsdb');


router.get('/', (req, res) => {
    res.json(tournamentsdb.list());
});

router.post('/create', (req, res) => {
    const { tittle, description, participants } = req.body;
    if (!tittle || !description || !participants) {
        return res.status(400).json({ message: 'All fields are required' });
    } else {
        tournamentsdb.create({ tittle, description, participants });
        res.json({ message: 'Tournament created successfully' });
    }

})

module.exports = router;




