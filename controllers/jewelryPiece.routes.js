const router = require("express").Router()
const JewelryPiece = require('../models/JewelryPiece')
const User = require("../models/User")


router.get('/', async (req, res) => {
    const allPieces = await JewelryPiece.find().populate('designer')
    res.render('jewelryPiece/all-jewelry.ejs', { allPieces: allPieces })
})

router.get('/new', async(req,res)=>{
    const allDesigners = await User.find()
    res.render('jewelryPiece/create-piece.ejs', {allDesigners:allDesigners})
})
router.post('/new', async(req,res)=>{
    createdPiece = await JewelryPiece.create(req.body)
    res.redirect('/jewelry')
})

router.get('/:id', async (req, res) => {
 const onePiece = await JewelryPiece.findById(req.params.id)
 res.render('jewelryPiece/jewelry-details.ejs', { onePiece: onePiece })
})

module.exports = router;
