require('dotenv').config({ debug: process.env.DEBUG });
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const pool = require('../config/database2');

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

/* GET users listing. */
router.get('/', function (req, res, next) {
  pool.query('SELECT * FROM users', function (err, result) {
    if (err) throw err;
    res.send(JSON.stringify(result.rows));
  });
});

router.post('/', function (req, res, next) {
  const user = req.body.user;
  const password = req.body.password;

  if (user === undefined || password === undefined) console.error('Username or password not defined');

  pool.query('SELECT password FROM users WHERE username = $1', [user], function (err, result) {
    if (err) throw err;

    if (bcrypt.compareSync(password, result.rows[0].password)) res.json('success');
    else res.json('wrong password');
  });
});

router.post('/signup', (req, res) => {
  const user = req.body.user;
  const password = req.body.password;

  pool.query('SELECT username FROM users WHERE username = $1', [user], (err, result) => {
    if (err) throw err;

    if (result.rows.length === 0) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      pool.query('INSERT INTO users (username, password, created, enabled, salt) VALUES ($1, $2, current_timestamp, true, $3)', [user, hash, salt], (err, result) => {
        if (err) throw err;
        res.send('User registered successfully');
      });
    } else {
      res.send('Username already taken. Try another one.');
    }
  });
});

module.exports = router;
