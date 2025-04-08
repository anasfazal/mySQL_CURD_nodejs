import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Qwerty@123',
  database: 'pratice',
});

console.log('Connected to MySQL database');

// Creating a new database if it doesn't exist
await db.execute('CREATE DATABASE IF NOT EXISTS pratice');

const [databases] = await db.execute('SHOW DATABASES');
console.log(databases);

// Creating user table in the database if it doesn't exist
await db.execute('CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), age INT)');
const [table] = await db.execute('SHOW TABLES');
console.log(table);


// Inserting data into the table
// await db.execute('INSERT INTO users (name, age) VALUES (?, ?)', ['Anas Fazal', 23]);
// await db.execute('INSERT INTO users (name, age) VALUES (?, ?)', ['Atif Khan', 24]);

// Reading data from the table
const [rows] = await db.execute('SELECT * FROM users');
console.log(rows);


// inserting multiple rows into the table
// const users = [
//   ['Sharjeel', 22],
//   ['Fiaz', 23],
//   ['Salar', 24],
//   ['Ali', 22],
//   ['Ahmed', 26],

// ];

// await db.query('INSERT INTO users (name, age) VALUES ?', [users]);
// const [allUsers] = await db.execute('SELECT * FROM users');
// console.log(allUsers);

const [sel] = await db.execute('SELECT * FROM users WHERE ID = ?', ['7']);
console.log(sel);


// Updating data in the table

try {
    await db.execute("UPDATE users SET name = ?, age = ? WHERE id = ?", ['New User', 100, 7]);
    console.log('Data updated successfully');

    const [updatedUser] = await db.execute("SELECT * FROM users WHERE id = ?", [7]);
    console.log('Updated User:', updatedUser);

} catch (error) {
  console.error('Error updating data:', error);
}


// Deleting data from the table
try {
    await db.execute("DELETE FROM users WHERE id = ?", [7]);
    console.log('Data deleted successfully');

    const [deletedUser] = await db.execute("SELECT * FROM users WHERE id = ?", [7]);
    console.log('Deleted User:', deletedUser);

}catch (error) {
    console.error('Error deleting data:', error);
}

