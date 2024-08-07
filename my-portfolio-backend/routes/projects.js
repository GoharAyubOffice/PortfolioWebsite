const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Get all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new project
router.post('/', async (req, res) => {
    const project = new Project({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        webglUrl: req.body.webglUrl,
    });

    try {
        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Other routes for update, delete can be added here

module.exports = router;
