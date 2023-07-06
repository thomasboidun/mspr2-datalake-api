const db = require('../db/db-access');
const utils = require('../db/db-utils');

exports.getAll = (req, res, next) => {
    const params = {
        'candidate_id': parseInt(req.query.candidateId),
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
    const params = [req.body.candidateId, req.body.communeId, req.body.voiceCount, req.body.year, req.query.candidateId, req.query.communeId, req.query.year];
    const query = `UPDATE voice_count SET candidate_id = ?, commune_id = ?, voice_count = ?, year = ? WHERE candidate_id = ? AND commune_id = ? AND year = ?;`;
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
    const { candidateId, communeId, year } = req.query;
    const params = [communeId, year];
    const query = `DELETE FROM voice_count WHERE candidate_id = ? AND commune_id = ? AND year = ?;;`;
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