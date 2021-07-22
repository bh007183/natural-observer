const router = require("express").Router()
const data = require("./test.json")
const db = require("../models")

router.route("/notes")
.get(async (req, res)=> {
    try{
        let data = await db.Note.findAll()
        res.status(200).json(data)
    }catch(err){
        console.log(err)
        res.status(400).json({error: err.errors[0].type})
    }

})
.post(async (req, res)=>{
    try{
        await db.Note.create(req.body)
        res.status(200).json({success: true})
    }catch(err){
        console.log(err.errors)
        res.status(400).json({error: err.errors[0].type})
    }
    
})
router.post("/notes/bulk", async(req, res)=> {
    try{
        await db.Note.bulkCreate(req.body)
        res.status(200).json({success: true})
    }catch(err){
        console.log(err)
        res.status(400).json({error: err})

    }

})


module.exports = router