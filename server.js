const express = require("express")
const app = express()
const db = require("./models")


const PORT = process.env.PORT || 8080

app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(require("./routes/index"))

db.sequelize.sync({force: false}).then(function(){
    app.listen(PORT, ()=> {
        console.log(`app listening on http//localhost:${PORT}`)
    })
})
