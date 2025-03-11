import express from "express"

const app = express()
const PORT = 3000

var blogAuthors = ["Sai", "Sai"]
var blogTitles = ["This is my first blog","This is my second blog" ]
var blogContent = [
`
If you have an input array, like as a function parameter, best practices dictate that you should not mutate the array. Instead you should create a new one.

There are a few methods you can use to remove a specific item from an array without mutating the array.

To avoid mutating the array, a new array will be created without the element you want to remove.
`,
`My second blog is pretty cool lol`
]


app.use(express.static("public"))
app.use(express.urlencoded({extended : false}))

app.get("/", (req,res) => {
    res.render("index.ejs", {
        titles : blogTitles
    })
})

app.get("/blog", (req,res) => {
    const blog_id = req.query.id
    res.render("blog.ejs", {
        title : blogTitles[blog_id],
        content : blogContent[blog_id]
    })
})

app.get("/new", (req,res)=> {
    res.render("new.ejs")
})

app.post("/create", (req,res) => {
    blogTitles.push(req.body.title)
    blogAuthors.push(req.body.author)
    blogContent.push(req.body.content)
    
    res.redirect("/")
})


app.listen(PORT, ()=> {
    console.log("Listening on port", PORT)
})

