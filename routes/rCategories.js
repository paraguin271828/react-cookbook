const express = require('express');
const pool = require('../config/database');
const router = express.Router();

router.get('/', (req, res) => {
  pool.query('SELECT categoryid, categoryname FROM categories')
    .then(result => {
      res.json(result); console.log(result);
    })
    .catch(err => console.error(err));
})

router.post('/', (req, res) => {
  const postCategories = req.body.newCategories;
  pool.query('INSERT INTO categories (categoryname) SELECT * FROM (unnest($1::varchar[]))', [postCategories])
    .then(result => console.log('Successfully inserted categories.'))
    .catch(err => console.error(err));
})

module.exports = router;
