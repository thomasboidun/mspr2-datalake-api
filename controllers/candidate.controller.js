const db = require('../db/db-access');

exports.getAll = (req, res, next) => {
    const query = `SELECT * FROM candidate;`;

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
    const query = `SELECT * FROM candidate WHERE id = ?;`;
    db.get(query, params, function (err, row) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        } else if (row) {
            res.json(row);
        } else {
            res.status(404).json({ error: `Candidate not found` });
        }
    });
}

exports.create = (req, res, next) => {
    const { firstname, lastname } = req.body;
    const params = [firstname, lastname];
    const query = `INSERT INTO candidate (firstname, lastname) VALUES (?, ?);`;
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
    const { firstname, lastname } = req.body;
    const params = [firstname, lastname, id];
    const query = `UPDATE candidate SET firstname = ?, lastname = ? WHERE id = ?;`;
    db.run(query, params, function (err) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: `Candidate not found` });
        } else {
            res.status(200).json({ message: `Candidate updated` });
        }
    });
}

exports.deleteById = (req, res, next) => {
    const id = parseInt(req.params.id);
    const params = [id];
    const query = `DELETE FROM candidate WHERE id = ?;`;
    db.run(query, params, function (err) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: `Candidate not found` });
        } else {
            res.status(200).json({ message: `Candidate deleted` });
        }
    });
}