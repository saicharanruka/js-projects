import express, { query } from "express"

const app = express()
const PORT = 3000

const d = new Date()
var blogData = []
var blog_to_be_updated = -1

app.use(express.static("public"))
app.use(express.urlencoded({extended : false}))

app.get("/", (req,res) => {
    res.render("index.ejs", {
        blogData : blogData
    })
    blog_to_be_updated = -1
})

app.get("/blog", (req,res) => {
    const blog_id = req.query.id
    res.render("blog.ejs", {
        blogData : blogData[blog_id],
        id : blog_id
    })
})

app.get("/new", (req,res)=> {
    res.render("new.ejs")
})

app.get("/edit", (req,res)=> {
    res.render("edit.ejs", {
        blogData : blogData[req.query.id]
    })
    blog_to_be_updated = req.query.id
})


app.post("/create", (req,res) => {
    var newPost = new Post(req.body.title, req.body.author, req.body.content, d.getDate(), blogData.length)
    blogData.push(newPost)
    
    res.redirect("/")
})

app.post("/update", (req,res) => {
    if (blog_to_be_updated != -1) {
        var updatedPost = new Post(req.body.title, req.body.author, req.body.content, d.getDate(), blog_to_be_updated)
        blogData[blog_to_be_updated] = updatedPost
        blog_to_be_updated = -1
    }
    res.redirect("/")

})

app.get("/delete", (req, res)=> {
    blogData.splice(req.query.id,1)
    res.redirect("/")
})



app.listen(PORT, ()=> {
    console.log("Listening on port", PORT)
})

function Post(title, author, content, date, id) {
    this.title = title
    this.author = author
    this.content = content
    this.date = date
    this.id = id
}