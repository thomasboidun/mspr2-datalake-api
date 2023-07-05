const db = require('../db/db-access');

exports.getAll = (req, res, next) => {
    const query = `SELECT * FROM voice_count;`;

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
    const query = `SELECT * FROM voice_count WHERE id = ?;`;
    db.get(query, params, function (err, row) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        } else if (row) {
            res.json(row);
        } else {
            res.status(404).json({ error: `Voice count not found` });
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

exports.updateById = (req, res, next) => {
    const id = parseInt(req.params.id);
    const { communeId, voiceCount, year } = req.body;
    const params = [communeId, voiceCount, year, id];
    const query = `UPDATE voice_count SET commune_id = ?, voice_count = ?, year = ?, WHERE id = ?;`;
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

exports.deleteById = (req, res, next) => {
    const id = parseInt(req.params.id);
    const params = [id];
    const query = `DELETE FROM voice_count WHERE id = ?;`;
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