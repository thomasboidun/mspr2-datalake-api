const db = require('../db/db-access');
const utils = require('../db/db-utils');

exports.getAll = (req, res, next) => {
    const params = {
        'commune_id': parseInt(req.query.communeId),
        'year': parseInt(req.query.year)
    };

    const whereClause = utils.buildWhereClause(params);

    const query = `SELECT * FROM median_living_standard ${whereClause.whereClause};`;

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
    const { communeId, medianLivingStandard, year } = req.body;
    const params = [communeId, medianLivingStandard, year];
    const query = `INSERT INTO median_living_standard (commune_id, median_living_standard, year) VALUES (?, ?, ?);`;
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
    const params = [req.body.communeId, req.body.medianLivingStandard, req.body.year, req.query.communeId, req.query.year];
    const query = `UPDATE median_living_standard SET commune_id = ?, median_living_standard = ?, year = ? WHERE commune_id = ? AND year = ?;`;
    db.run(query, params, function (err) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: `Median living standard not found` });
        } else {
            res.status(200).json({ message: `Median living standard updated` });
        }
    });
}

exports.delete = (req, res, next) => {
    const { communeId, year } = req.query;
    const params = [communeId, year];
    const query = `DELETE FROM median_living_standard WHERE commune_id = ? AND year = ?;`;
    db.run(query, params, function (err) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: `Median living standard not found` });
        } else {
            res.status(200).json({ message: `Median living standard deleted` });
        }
    });
}