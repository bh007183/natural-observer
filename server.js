const express = require("express")
const app = express()


const PORT = process.env.PORT || 8080

app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())



app.listen(PORT, ()=> {
    console.log(`app listening on http//localhost:${PORT}`)
})