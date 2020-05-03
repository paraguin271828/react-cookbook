const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

const connection = new Pool({
  database: 'qsfyirth',
  user: 'qsfyirth',
  password: 'eKFd7JuTTjeWdjFAFtznTzE-98QlGCqM',
  host: 'dumbo.db.elephantsql.com'
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  connection.query('SELECT * FROM users', function (err, result) {
    if (err) throw err;
    res.send(JSON.stringify(result.rows));
  });
});

router.post('/', function (req, res, next) {
  const user = req.body.user;
  const password = req.body.password;

  if (user === undefined || password === undefined) console.error('Username or password not defined');

  connection.query('SELECT password FROM users WHERE username = $1', [user], function (err, result) {
    if (err) throw err;

    if (bcrypt.compareSync(password, result.rows[0].password)) res.json('success');
    else res.json('wrong password');
  });
});

router.post('/signup', (req, res) => {
  const user = req.body.user;
  const password = req.body.password;

  connection.query('SELECT username FROM users WHERE username = $1', [user], (err, result) => {
    if (err) throw err;

    if (result.rows.length === 0) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      connection.query('INSERT INTO users (username, password, created, enabled, salt) VALUES ($1, $2, current_timestamp, true, $3)', [user, hash, salt], (err, result) => {
        if (err) throw err;
        res.send('User registered successfully');
      });
    } else {
      res.send('Username already taken. Try another one.');
    }
  });
});

module.exports = router;
