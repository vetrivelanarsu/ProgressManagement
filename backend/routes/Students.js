const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// Create a new student progress record
router.post('/', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Retrieve all student progress records
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retrieve a specific student's progress record
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a specific student progress report

router.put('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Delete a specific student's progress record
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a specific week's progress data for a student
router.delete('/:id/progress/:week', async (req, res) => {
  try {
    const { id, week } = req.params;
    
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    // Find the index of the week in the progress array
    const weekIndex = student.progress.findIndex((p) => p.week === Number(week));
    
    if (weekIndex === -1) {
      return res.status(404).json({ error: 'Week not found' });
    }
    
    // Remove the week data from the progress array
    student.progress.splice(weekIndex, 1);
    
    await student.save();
    
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
