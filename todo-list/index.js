import express from "express"
import bodyParser from "body-parser"

const app = express()
const PORT = 3000
var tasks = []

app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static("public"))

app.get("/", (req,res)=> {
    res.render("index.ejs", {
        tasks : tasks
    })

})

app.post("/submit", (req,res)=> {
    tasks.push(req.body.task)
    res.redirect("/")

})

app.get("/delete", (req,res) => {
    var remove  = req.query.id
    var index = tasks.indexOf(remove)
    tasks.splice(index,1)
    res.redirect("/")

})


app.listen(PORT, (req,res)=> {
    console.log("Listening on port", PORT)
})



