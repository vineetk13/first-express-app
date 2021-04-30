const express = require("express");
const path = require("path");
const hbs = require("hbs");
const { rawListeners } = require("process");

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");

// console.log(path.join(__dirname,"./public"));
// console.log(publicDirectoryPath);

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

// handlebars examples
app.get("",(req,res) => {
    res.render("index",{
        by:"Vineet"
    }); 
});

app.get('/about', (req,res) => {
    res.render("about",{
        name:"Vineet K"
    });
})

// API requests and responses examples
app.get('/products', (req,res) => {
    // console.log(req.query);
    res.send({
        products:[]
    })
})

app.get("/weather", (req, res) => {
    if(!req.query.address){
        return res.send({
            error:"Please provide an address"
        })
    }
    
    res.send({
        forecast:"It is snowing",
        address:req.query.address
    })
})

// 404 route example
app.get("*", (req, res) => {
    res.send("404: Page not found");
})

app.listen(port, () => {
    console.log("Server up and running on port " + port);
})