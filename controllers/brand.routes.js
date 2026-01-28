const router = require("express").Router()
const User = require("../models/User")
const JewelryPiece = require("../models/JewelryPiece")

router.get('/', async (req, res) => {
    const allDesigners = await User.find()
    res.render('brand/all-brands.ejs', { allDesigners:allDesigners })
})

router.get('/:id', async (req,res)=>{
    const oneDesigner = await User.findById(req.params.id)
    const brandPieces = await JewelryPiece.find({ designer: oneDesigner._id })
    res.render('brand/brand-details.ejs',{oneDesigner:oneDesigner, brandPieces:brandPieces} )
})


module.exports = router;
