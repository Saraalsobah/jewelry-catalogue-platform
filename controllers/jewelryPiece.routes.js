const router = require("express").Router()
const JewelryPiece = require('../models/JewelryPiece')
const User = require("../models/User")


router.get('/', async (req, res) => {
    const allPieces = await JewelryPiece.find() 
    res.render('jewelryPiece/all-jewelry.ejs', { allPieces: allPieces })
})

router.get('/new', async(req,res)=>{
    const allDesigners = await User.find()
    res.render('jewelryPiece/create-piece.ejs', {allDesigners:allDesigners})
})
router.post('/new', async(req,res)=>{
    createdPiece = await JewelryPiece.create(req.body)
})

router.get('/id', async (req,res)=>{

})




module.exports = router;
