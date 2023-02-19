const express = require('express')
const { app: opts } = require('../../config')

const router = express.Router()

router.get('/', async (req, res) => {
  res.render('registration', opts)
});

module.exports = router
