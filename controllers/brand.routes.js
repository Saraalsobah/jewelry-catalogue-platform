const router = require("express").Router()
const User = require("../models/User")
const JewelryPiece = require("../models/JewelryPiece")

router.get('/', async (req, res) => {
    const allDesigners = await User.find()
    res.render('brand/all-brands.ejs', { allDesigners:allDesigners })
})


module.exports = router;
