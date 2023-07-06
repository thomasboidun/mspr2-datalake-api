const db = require('../db/db-access');
const utils = require('../db/db-utils');

exports.getAll = (req, res, next) => {
    const params = {
        'commune_id': parseInt(req.query.communeId),
        'year': parseInt(req.query.year)
    };

    const whereClause = utils.buildWhereClause(params);

    const query = `SELECT * FROM jobless_rate ${whereClause.whereClause};`;

    db.all(query, whereClause.values, function (err, rows) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
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

exports.update = (req, res, next) => {
    const { communeId, year } = req.query;
    const { joblessRate } = req.body;
    const params = [communeId, joblessRate, year, communeId, year];
    const query = `UPDATE jobless_rate SET commune_id = ?, jobless_rate = ?, year = ? WHERE commune_id = ? AND year = ?;`;
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

exports.delete = (req, res, next) => {
    const { communeId, year } = req.query;
    const params = [communeId, year];
    const query = `DELETE FROM jobless_rate WHERE commune_id = ? AND year = ?;`;
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