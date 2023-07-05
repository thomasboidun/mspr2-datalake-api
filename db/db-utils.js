exports.buildWhereClause = params => {
    const conditions = [];
    const values = [];

    for (const key in params) {
        if (params[key]) {
            conditions.push(`${key} = ?`);
            values.push(params[key]);
        }
    }

    const whereClause = conditions.length > 0 ?
        `WHERE ${conditions.join(' AND ')}` : '';

    return { whereClause, values };

}