const router = require("express").Router()
const JewelryPiece = require('../models/JewelryPiece')
const User = require("../models/User")
const isSignedIn = require('../middleware/is-signed-in')

router.get('/', async (req, res) => {
    const allPieces = await JewelryPiece.find().populate('designer')
    res.render('jewelryPiece/all-jewelry.ejs', { allPieces: allPieces })
})

router.get('/new', isSignedIn, async(req,res)=>{
    res.render('jewelryPiece/create-piece.ejs')
})

router.post('/new', isSignedIn, async(req,res)=>{
    req.body.designer = req.session.user._id
    const createdPiece = await JewelryPiece.create(req.body)
    res.redirect(`/brands/${req.session.user._id}`)})

router.get('/:id', async (req, res) => {
    const onePiece = await JewelryPiece.findById(req.params.id).populate('designer')
    res.render('jewelryPiece/jewelry-details.ejs', { onePiece:onePiece })
})


router.get('/update/:id', isSignedIn, async (req, res) => {
    const onePiece = await JewelryPiece.findById(req.params.id)

    if(req.session.user._id !== onePiece.designer.toString()){
        return res.send('You Cannot edit Pieces that are not yours')
    }
    res.render('jewelryPiece/update-jewelry.ejs', { onePiece:onePiece})
})


router.post('/update/:id', isSignedIn, async (req, res) => {
    const onePiece = await JewelryPiece.findById(req.params.id)

    if (req.session.user._id !== onePiece.designer.toString()){
       return res.send('You Cannot edit Pieces that are not yours')
    }

    const updatedPiece = await JewelryPiece.findByIdAndUpdate(req.params.id, req.body)
    res.redirect(`/brands/${req.session.user._id}`)
})


router.post('/delete/:id', isSignedIn, async(req,res)=>{
    const deletedPiece = await JewelryPiece.findById(req.params.id)

    if (req.session.user._id !== deletedPiece.designer.toString()){
        return res.send('Cannot delete Pieces that are not yours')
    }
    await JewelryPiece.findByIdAndDelete(req.params.id)
    res.redirect(`/brands/${req.session.user._id}`)   
})

module.exports = router;
