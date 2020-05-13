const express = require('express');
const pool = require('../config/database');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/', (req, res) => {
  const ingredients = req.body;
  const ingredientQuery = 'INSERT INTO ingredients (ingredientname, createdat, enabled) VALUES ($1, current_date, TRUE) RETURNING *';

  // convert object passed by form to array with object values
  // and add each value as inredient to the database
  const ingrArr = Object.values(ingredients).map((value) => {
    pool.query(ingredientQuery, [value])
      .then(result => console.log('Ingredient added successfully')) // res.send not posible because of the loop (multiple headers would get send)
      .catch(err => console.error(err));
  });

  res.json({success: 'true'});
});

module.exports = router;
