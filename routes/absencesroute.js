const express = require('express');
const router = express.Router();
const Absence = require('../controllers/absencecontroller');
// Obtener todas las ausencias
router.get('/', async (req, res) => {
    try {
        const result = await Absence.getAll();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener una ausencia por id
router.get('/:id', async (req, res) => {
    try {
        const result = await Absence.getById(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear una nueva ausencia
router.post('/', async (req, res) => {
    const { user_id, startDate, endDate, approved } = req.body;
    const start_date = startDate
    const end_date = endDate
    try {
        const result = await Absence.create({ user_id, start_date, end_date, approved }, res);
        res.status(201).json(result);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
});
// Actualizar una ausencia existente
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id, start_date, end_date, approved } = req.body;
        const updatedAbsence = await Absence.update(id, user_id, start_date, end_date, approved);
        res.json(updatedAbsence);
    } catch (error) {
        console.error('Error updating absence: ', error);
        res.status(500).json({ message: 'Could not update absence' });
    }
});

// Eliminar una ausencia existente
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Absence.delete(id);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting absence: ', error);
        res.status(500).json({ message: 'Could not delete absence' });
    }
});
module.exports = router;