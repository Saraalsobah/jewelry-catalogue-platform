const router = require("express").Router()
const JewelryPiece = require('../models/JewelryPiece')
const User = require("../models/User")
const isSignedIn = require('../middleware/is-signed-in')

router.get('/', async (req, res) => {
    const allPieces = await JewelryPiece.find().populate('designer')
    res.render('jewelryPiece/all-jewelry.ejs', { allPieces: allPieces })
})

router.get('/new', isSignedIn, async(req,res)=>{
    const allDesigners = await User.find()
    res.render('jewelryPiece/create-piece.ejs', {allDesigners:allDesigners})
})

router.post('/new', isSignedIn, async(req,res)=>{
    createdPiece = await JewelryPiece.create(req.body)
    res.redirect('/jewelry')
})

router.get('/:id', async (req, res) => {
 const onePiece = await JewelryPiece.findById(req.params.id)
 res.render('jewelryPiece/jewelry-details.ejs', { onePiece:onePiece })
})

router.get('/update/:id', isSignedIn, async (req, res) => {
 const onePiece = await JewelryPiece.findById(req.params.id)
 const allDesigners = await User.find()
 res.render('jewelryPiece/update-jewelry.ejs', { onePiece:onePiece, allDesigners:allDesigners })
})

router.post('/update/:id', isSignedIn, async (req, res) => {
 const updatedPiece = await JewelryPiece.findByIdAndUpdate(req.params.id, req.body)
 res.redirect('/jewelry')
})

router.post('/delete/:id', isSignedIn, async(req,res)=>{
    const deletedPiece = await JewelryPiece.findByIdAndDelete(req.params.id)
    res.redirect('/jewelry')    
})

module.exports = router;
