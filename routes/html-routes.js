const router = require('express').Router()
const path = require("path")

router.get("/profile", (req, res)=>{
    res.sendFile(path.join(__dirname, "../public/profile.html"))
})
router.get("/note", (req, res)=>{
    res.sendFile(path.join(__dirname, "../public/note.html"))
})


module.exports = router