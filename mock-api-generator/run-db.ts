import db from './lib/db'; // Use relative path


// Call the initialization function to ensure the DB is set up
db.run('PRAGMA foreign_keys = ON'); // Enable foreign keys (important for SQLite)

console.log("Database initialized successfully.");
