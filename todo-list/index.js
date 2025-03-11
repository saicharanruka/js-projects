import express from "express"

const app = express()
const PORT = 3000
var tasks = []

app.use(express.static("public"))

app.get("/", (req,res)=> {
    res.render("index.ejs", {
        tasks : tasks
    })

})

app.post("/submit", (req,res)=> {
    
})


app.listen(PORT, (req,res)=> {
    console.log("Listening on port ", PORT)
})


