const express = require('express');
const pool = require('../config/database');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// search query for ingredients
router.get('/ingredients', (req, res) => {
  const ingredients = req.param('q');
  searchQuery = `
  SELECT ingredientname FROM ingredients
  WHERE LOWER(ingredientname) LIKE LOWER($1)`;

  console.log(ingredients);

  pool.query(searchQuery, ['%'+ingredients+'%'])
    .then(result => console.log(result))
    .catch(err => console.error(err));
})

// search query for categories
router.post('/categories', (req, res) => {
  category = req.body.categorysearch;
  searchQuery = 'SELECT categoryname FROM categories WHERE categoryname LIKE (%$1%)';

  pool.query(searchQuery, category)
    .then(result => res.json(result))
    .catch(err => console.error(err));
})

module.exports = router;
