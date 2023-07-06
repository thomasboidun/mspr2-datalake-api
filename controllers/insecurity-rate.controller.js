const db = require('../db/db-access');
const utils = require('../db/db-utils');

exports.getAll = (req, res, next) => {
    const params = {
        'commune_id': parseInt(req.query.communeId),
        'year': parseInt(req.query.year)
    }

    const whereClause = utils.buildWhereClause(params);

    const query = `SELECT * FROM insecurity_rate ${whereClause.whereClause};`;

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
    const { communeId, insecurityRate, year } = req.body;
    const params = [communeId, insecurityRate, year];
    const query = `INSERT INTO insecurity_rate (commune_id, insecurity_rate, year) VALUES (?, ?, ?);`;
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
    const params = [req.body.communeId, req.body.insecurityRate, req.body.year, req.query.communeId, req.query.year];
    const query = `UPDATE insecurity_rate SET commune_id = ?, insecurity_rate = ?, year = ? WHERE commune_id = ? AND year = ?;`;
    db.run(query, params, function (err) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: `Insecurity rate not found` });
        } else {
            res.status(200).json({ message: `Insecurity rate updated` });
        }
    });
}

exports.delete = (req, res, next) => {
    const { communeId, year } = req.query;
    const params = [communeId, year];
    const query = `DELETE FROM insecurity_rate WHERE commune_id = ? AND year = ?;`;
    db.run(query, params, function (err) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: `Insecurity rate not found` });
        } else {
            res.status(200).json({ message: `Insecurity rate deleted` });
        }
    });
}