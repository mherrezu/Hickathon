const Absence = require('../models/absencesmod');
class AbsenceController {
    static async getAll(req, res) {
        try {
            // Obtener todas las ausencias
            const allAbsences = await Absence.getAll;
            console.log('All Absences:', allAbsences);
        } catch (error) {
            console.error('Error getting absences:', error);
            res.status(500).json({ error: 'Could not get absences' });
        }
    }

    static async getById(req, res) {
        const id = req.params.id;

        try {
            const absence = await Absence.getById(id);
            if (absence) {
                res.json(absence);
            } else {
                res.status(404).json({ error: 'Absence not found' });
            }
        } catch (error) {
            console.error(`Error getting absence with id ${id}:`, error);
            res.status(500).json({ error: `Could not get absence with id ${id}` });
        }
    }

    static async create(req, res) {
        const { user_id, start_date, end_date, approved } = req;

        try {
            const absence = await Absence.create({
                user_id,
                start_date,
                end_date,
                approved,
            });
            res.status(201).json(absence);
        } catch (error) {
            console.error('Error creating absence:', error);
            res.status(500).json({ error: 'Could not create absence' });
        }
    }

    static async delete(req, res) {
        const id = req.params.id;

        try {
            const numDeleted = await Absence.destroy({ where: { id } });
            if (numDeleted === 0) {
                res.status(404).json({ error: 'Absence not found' });
            } else {
                res.json({ message: 'Absence deleted successfully' });
            }
        } catch (error) {
            console.error(`Error deleting absence with id ${id}:`, error);
            res.status(500).json({ error: `Could not delete absence with id ${id}` });
        }
    }

    static async update(req, res) {
        const id = req.params.id;
        const updatedFields = req.body;

        try {
            const [numUpdated] = await Absence.update(updatedFields, { where: { id } });
            if (numUpdated === 0) {
                res.status(404).json({ error: 'Absence not found' });
            } else {
                const updatedAbsence = await Absence.findByPk(id);
                res.json(updatedAbsence);
            }
        } catch (error) {
            console.error(`Error updating absence with id ${id}:`, error);
            res.status(500).json({ error: `Could not update absence with id ${id}` });
        }
    }
}

module.exports = AbsenceController;
