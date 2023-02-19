const express = require('express');

const router = express.Router();

const { authentication, authorization } = require('../../../../../middlewares')
const { root: rootHandler } = require('../handlers')

router.get('/', rootHandler.index)
router.get('/enumeration', rootHandler.getEnum)
router.get('/profile', authentication, authorization, rootHandler.getProfile)

module.exports = router;
