const express = require('express');
const pool = require('../config/database');
const router = express.Router();

router.get('/', (req, res) => {
  pool.query('SELECT id, ingredientname FROM ingredients')
    .then(result => {
      res.json(result);
      console.log(result);
    })
    .catch(err => console.error(err));
});

router.post('/', (req, res) => {
  // convert array to string with postgres array syntax
  // postgres needs curly brackets for arrays
  const postIngredients = JSON.stringify(req.body.newIngredients).replace('[', '{').replace(']', '}');

  const ingredientsQuery = `
    INSERT INTO ingredients (
      ingredientname,
      createdat,
      enabled
    )
    VALUES (
      unnest($1::varchar[]),
      current_date,
      TRUE
    )`;

  pool.query(ingredientsQuery, [postIngredients])
    .then(result => console.log('Successfully inserted ingredients.'))
    .catch(err => console.error(err));
});

module.exports = router;
