const sqlite3 = require('sqlite3').verbose();
const dbPath = './db/database.db';

module.exports = new sqlite3.Database(dbPath);
