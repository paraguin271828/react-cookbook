const express = require('express');
const pool = require('../config/database');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/', (req, res) => {
  const data = req.body;
  const categories = [data.meat, data.vegetarian, data.vegan];

  /*** recipe query
  * id, recipename, description, idimage, createdat, updatedat, enabled, recipelink, readyinminutes
  ***/
  const recipeQuery = 'INSERT INTO recipes (recipename, description, idimage, createdat, updatedat, enabled, recipelink, readyinminutes) ' +
                        'VALUES ($1, $2, null, current_date, null, TRUE, $3, $4) RETURNING id';

  pool.query(recipeQuery, [data.title, data.description, data.sourceUrl, data.readyInMinutes])
    .then(result => {
      for (category in categories) {
        if (categories[category] === true) {
          pool.query('INSERT INTO recipecategories (recipeid, catid) VALUES ($1, $2)', [result.rows[0].id, ++category])
            .then(categoryRes => console.log(categoryRes))
        }
      }
      //res.json(success: 'true');
    })
    .catch(err => console.error(err));

  // ingredients query

  // categories query

  // image query

  res.send(data);
});

module.exports = router;
