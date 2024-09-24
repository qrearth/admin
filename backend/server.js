const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'qearth',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});


app.get('/users', (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/bottle', (req, res) => {
    const sql = "SELECT * FROM bottle";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});


app.get('/', (req, res) => {
    return res.json("From Backend");
});

app.listen(8081, () => {
    console.log("Listening on port 8081");
});

