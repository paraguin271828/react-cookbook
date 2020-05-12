const express = require('express');
const pool = require('../config/database.js');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  res.send('db api route');
});
