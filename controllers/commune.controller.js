const db = require('../db/db-access');

exports.getAll = (req, res, next) => {
    const query = `SELECT * FROM commune;`;

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
    const query = `SELECT * FROM commune WHERE id = ?;`;
    db.get(query, params, function (err, row) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        } else if (row) {
            res.json(row);
        } else {
            res.status(404).json({ error: `Commune not found` });
        }
    });
}

exports.create = (req, res, next) => {
    const { code, label, location } = req.body;
    const params = [code, label, location];
    const query = `INSERT INTO commune (code, label, location) VALUES (?, ?, ?);`;
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
    const { code, label, location } = req.body;
    const params = [code, label, location, id];
    const query = `UPDATE commune SET code = ?, label = ?, location = ? WHERE id = ?;`;
    db.run(query, params, function (err) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: `Commune not found` });
        } else {
            res.status(200).json({ message: `Commune updated` });
        }
    });
}

exports.deleteById = (req, res, next) => {
    const id = parseInt(req.params.id);
    const params = [id];
    const query = `DELETE FROM commune WHERE id = ?;`;
    db.run(query, params, function (err) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: `Commune not found` });
        } else {
            res.status(200).json({ message: `Commune deleted` });
        }
    });
}