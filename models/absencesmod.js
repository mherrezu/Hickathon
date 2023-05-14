const pool = require('../DB_connect');

class Absence {
    constructor(id, user_id, start_date, end_date, approved) {
        this.id = id;
        this.user_id = user_id;
        this.start_date = start_date;
        this.end_date = end_date;
        this.approved = approved;
    }

    static async getAll(req, res) {
        try {
            const { rows } = await pool.query('SELECT * FROM absences');
            const absences = rows.map(({ id, user_id, start_date, end_date, approved }) => new Absence(id, user_id, start_date, end_date, approved));
            return (absences);
            //res.setHeader('Content-Type', 'application/json');
            //res.send(JSON.stringify(absences));
        } catch (error) {
            console.error('Error getting absences: ', error);
            throw new Error('Could not get absences');
        }
    }

    static async getById(id) {
        try {
            const { rows } = await pool.query('SELECT * FROM absences WHERE id = $1', [id]);
            const absence = rows[0];
            return new Absence(absence.id, absence.user_id, absence.start_date, absence.end_date, absence.approved);
        } catch (error) {
            console.error('Error getting absence by id: ', error);
            throw new Error('Could not get absence');
        }
    }

    static async create(absence) {
        const { user_id, start_date, end_date, approved } = absence;
        try {
            await pool.query(
                'INSERT INTO absences (user_id, start_date, end_date, approved) VALUES ($1, $2, $3, $4)',
                [user_id, start_date, end_date, approved]
            );
            const { rows } = await pool.query(
                'SELECT * FROM absences WHERE id = LASTVAL()'
            );
            return rows[0];
        } catch (error) {
            console.error('Error creating absence: ', error);
            throw new Error('Could not create absence');
        }
    }
    static async delete(id) {
        try {
            const { rows } = await pool.query('DELETE FROM absences WHERE id = $1 RETURNING *', [id]);
            if (rows.length === 0) {
                throw new Error('Could not delete absence');
            }
            return rows[0];
        } catch (error) {
            console.error('Error deleting absence: ', error);
            throw new Error('Could not delete absence');
        }
    }
    static async update(id, updatedFields) {
        try {
            const { rows } = await pool.query(
                'UPDATE absences SET user_id = $1, start_date = $2, end_date = $3, approved = $4 WHERE id = $5 RETURNING *',
                [updatedFields.user_id, updatedFields.start_date, updatedFields.end_date, updatedFields.approved, id]
            );
            if (rows.length === 0) {
                throw new Error('Could not update absence');
            }
            return rows[0];
        } catch (error) {
            console.error(`Error updating absence with id ${id}: `, error);
            throw new Error(`Could not update absence with id ${id}`);
        }
    }


}

module.exports = Absence;
