const express = require('express');
const pool = require('../config/database');
const router = express.Router();

router.get('/', (req, res) => {
  pool.query('SELECT categoryid, categoryname FROM categories')
    .then(result => {
      res.json(result);
      console.log(result);
    })
    .catch(err => console.error(err));
});

router.post('/', (req, res) => {
  // convert array to string with postgres array syntax
  // postgres needs curly brackets for arrays
  const postCategories = JSON.stringify(req.body.newCategories).replace('[', '{').replace(']', '}');

  const categoryQuery = `
    INSERT INTO categories (
      categoryname,
      createdat,
      enabled
    )
    VALUES (
      unnest($1::varchar[]),
      current_date,
      TRUE
    )`;

  pool.query(categoryQuery, [postCategories])
    .then(result => console.log('Successfully inserted categories.'))
    .catch(err => console.error(err));
});

module.exports = router;
