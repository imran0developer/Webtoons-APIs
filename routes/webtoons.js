const express = require('express');
const Webtoon = require('../models/Webtoon');
const User = require('../models/User');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

// Get all webtoons route
router.get('/', async (req, res) => {
    try {
        const webtoons = await Webtoon.find();
        res.json(webtoons);
    } catch (error) {
        res.status(500).send('Error fetching webtoons');
    }
});

// add a webtoon route
router.post('/', authenticate, async (req, res) => {
    const { title, creator, genre, description, cover_image } = req.body;

    if (!title || !creator || !genre || !description || !cover_image) {
        return res.status(400).send('All fields are required');
    }

    try {
        const newWebtoon = new Webtoon({ title, creator, genre, description, cover_image });
        await newWebtoon.save();
        res.status(201).json(newWebtoon);
    } catch (error) {
        res.status(500).send('Error creating webtoon');
    }
});

// Delete a specific webtoon by ID route
router.delete('/:id', authenticate, async (req, res) => {
    const { id } = req.params;

    try {
        const deletedWebtoon = await Webtoon.findByIdAndDelete(id); // Delete by ID
        if (!deletedWebtoon) {
            return res.status(404).send('Webtoon not found');
        }
        res.json({ message: 'Webtoon deleted successfully' });
    } catch (error) {
        res.status(500).send('Error deleting webtoon');
    }
});

// Get a specific webtoon by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const webtoon = await Webtoon.findById(id);
        if (!webtoon) {
            return res.status(404).send('Webtoon not found');
        }
        res.json(webtoon);
    } catch (error) {
        res.status(500).send('Error fetching webtoon');
    }
});


module.exports = router;
