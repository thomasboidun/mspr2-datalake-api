const db = require('../db/db-access');

exports.getAll = (req, res, next) => {
    const query = `SELECT * FROM median_living_standard;`;

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
    const query = `SELECT * FROM median_living_standard WHERE id = ?;`;
    db.get(query, params, function (err, row) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        } else if (row) {
            res.json(row);
        } else {
            res.status(404).json({ error: `Median living standard not found` });
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

exports.updateById = (req, res, next) => {
    const id = parseInt(req.params.id);
    const { communeId, medianLivingStandard, year } = req.body;
    const params = [communeId, medianLivingStandard, year, id];
    const query = `UPDATE median_living_standard SET commune_id = ?, median_living_standard = ?, year = ?, WHERE id = ?;`;
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

exports.deleteById = (req, res, next) => {
    const id = parseInt(req.params.id);
    const params = [id];
    const query = `DELETE FROM median_living_standard WHERE id = ?;`;
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