const db = require('../db/db-access');
const utils = require('../db/db-utils');

exports.getAll = (req, res, next) => {
    const params = {
        'commune_id': parseInt(req.query.communeId),
        'year': parseInt(req.query.year)
    };

    const whereClause = utils.buildWhereClause(params);

    const query = `SELECT * FROM voice_count ${whereClause.whereClause};`;

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
    const { communeId, voiceCount, year } = req.body;
    const params = [communeId, voiceCount, year];
    const query = `INSERT INTO voice_count (commune_id, voice_count, year) VALUES (?, ?, ?);`;
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
    const { voiceCount } = req.body;
    const params = [communeId, voiceCount, year, communeId, year];
    const query = `UPDATE voice_count SET commune_id = ?, voice_count = ?, year = ? WHERE commune_id = ? AND year = ?;`;
    db.run(query, params, function (err) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: `Voice count not found` });
        } else {
            res.status(200).json({ message: `Voice count updated` });
        }
    });
}

exports.delete = (req, res, next) => {
    const { communeId, year } = req.query;
    const params = [communeId, year];
    const query = `DELETE FROM voice_count WHERE commune_id = ? AND year = ?;;`;
    db.run(query, params, function (err) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: `Voice count not found` });
        } else {
            res.status(200).json({ message: `Voice count deleted` });
        }
    });
}