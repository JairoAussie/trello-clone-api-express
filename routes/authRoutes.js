const express = require('express')
const router = express.Router()

const {signUp} = require('../controllers/authController')

router.post('/sign_up', signUp)
//router.post('/', newCard)

module.exports = router