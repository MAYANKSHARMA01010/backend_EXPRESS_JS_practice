const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Global Middleware
function Logger(req,res,next){
    const Time = new Date().toISOString();
    const Method = req.method;
    const URL = req.url;
    console.log(`
        TimeStamp: ${Time},
        Method: ${Method},
        URL: ${URL}
    `)
    next()
}

app.use(Logger);

function isAdmin(req, res,next) {
    console.log('IS ADMIN MIDDLEWARE')
    if(req.query.admin) {
        next()
    } 
    else {
        res.send('You are not a admin')
    }
}
app.use('/admin' , isAdmin)

app.get('/admin/getUser', (req,res)=>{
    res.send('You are admin')
})


app.get("/", (req, res) => {
    res.send("<h1>My First Express Server</h1>");
});

app.get("/home", (req, res) => {
    res.send("<h3>This is My Home Page</h3>");
});

app.get("/about", (req, res) => {
    res.send("This is My About Page");
});

// dynamic route
app.get("/product/:productId", (req, res) => {
    // every request have a params key (object)
    res.send(`<h3>This is the Product Page for Product ID: <h2>${req.params.productId}</h2></h3>`);
    console.log(`Trying to Access Product with ID: ${req.params.productId}`);
});

// json is use to send array of objects
// we can send any status code too status(400) 
app.get('/json', (req, res) => {
    res.status(400).json({
        message: "Hello, this is a JSON response",
        status: "success"
    });
});

// http://localhost:${PORT}/query?name="Mayank"&age="20" -------> request
app.get("/query", () => {
    res.status(200)
    res.send(`Hello ${req.query.name}`)
})

// Middleware
function isProtected(req,res,next) {
    if (req.query.password) {
        // http://localhost:3000/protected?password=%22abc%22
        next()
    }
    else {
        // http://localhost:3000/protected
        res.send(`
            You are Not Authroized!!!!!
            <h5>Please Get AuthoRized</h5>
        `)
    }
}

app.get('/protected',isProtected, (req,res) => {
    if (req.query.password) {
        // http://localhost:3000/protected?password=%22abc%22
        res.send("You are Authroized")
    }
    else {
        res.send("You are Not Authroized")
    }
})

app.listen(PORT, (err) => {
    if (err) {
        console.log("Error while starting the server");
    }
    else {
        console.log(`Server is running on http://localhost:${PORT}`);
    }
});