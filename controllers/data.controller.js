const db = require('../db/db-access');
const utils = require('../db/db-utils');

exports.getAll = (req, res, next) => {
    const params = {
        'commune.id': parseInt(req.query.communeId),
        'voice_count.year': parseInt(req.query.year)
    };

    const whereClause = utils.buildWhereClause(params);

    const query = `
    SELECT 
      voice_count.year, 
      commune.id AS commune_id, 
      commune.code AS commune_code,
      commune.label AS commune_label, 
      commune.location AS commune_location,
      candidate.id AS candidate_id, 
      candidate.firstname AS candidate_firstname,
      candidate.lastname AS candidate_lastname, 
      median_living_standard.median_living_standard AS median_living_standard,
      insecurity_rate.insecurity_rate AS insecurity_rate, 
      povrety_rate.povrety_rate AS povrety_rate, 
      jobless_rate.jobless_rate AS jobless_rate,
      voice_count.voice_count AS voice_count
    FROM voice_count
    INNER JOIN commune ON voice_count.commune_id = commune.id
    INNER JOIN candidate ON voice_count.candidate_id = candidate.id
    INNER JOIN median_living_standard ON median_living_standard.commune_id = commune.id
    INNER JOIN insecurity_rate ON insecurity_rate.commune_id = commune.id
    INNER JOIN povrety_rate ON povrety_rate.commune_id = commune.id
    INNER JOIN jobless_rate ON jobless_rate.commune_id = commune.id
    ${whereClause.whereClause}
    ;`;

    db.all(query, whereClause.values, function (err, rows) {
        if (err) {
            console.error(err);
            res.status(500).send('Server error...');
        } else {
            if (rows.length == 0) {
                res.status(404).send('No data found for the commune and year specified.');
            } else {
                res.json(rows);
            }
        }
    });
}