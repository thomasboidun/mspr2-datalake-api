const db = require('../db/db-access');

exports.getAll = (req, res, next) => {
    const query = `SELECT * FROM jobless_rate;`;

    db.all(query, [], function (err, rows) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
}

exports.getById = (req, res, next) => {
    const id = parseInt(req.params.id);
    const params = [id];
    const query = `SELECT * FROM jobless_rate WHERE id = ?;`;
    db.get(query, params, function (err, row) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        } else if (row) {
            res.json(row);
        } else {
            res.status(404).json({ error: `Jobless rate not found` });
        }
    });
}

exports.create = (req, res, next) => {
    const { communeId, joblessRate, year } = req.body;
    const params = [communeId, joblessRate, year];
    const query = `INSERT INTO jobless_rate (commune_id, jobless_rate, year) VALUES (?, ?, ?);`;
    db.run(query, params, function (err) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ id: this.lastID });
        }
    });
}

exports.updateById = (req, res, next) => {
    const id = parseInt(req.params.id);
    const { communeId, joblessRate, year } = req.body;
    const params = [communeId, joblessRate, year, id];
    const query = `UPDATE jobless_rate SET commune_id = ?, jobless_rate = ?, year = ?, WHERE id = ?;`;
    db.run(query, params, function (err) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: `Jobless rate not found` });
        } else {
            res.status(200).json({ message: `Jobless rate updated` });
        }
    });
}

exports.deleteById = (req, res, next) => {
    const id = parseInt(req.params.id);
    const params = [id];
    const query = `DELETE FROM jobless_rate WHERE id = ?;`;
    db.run(query, params, function (err) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: `Jobless rate not found` });
        } else {
            res.status(200).json({ message: `Jobless rate deleted` });
        }
    });
}