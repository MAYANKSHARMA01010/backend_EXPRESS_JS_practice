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
    res.status(200).send('You are admin')
})


app.get("/", (req, res) => {
    res.status(200).send("<h1>My First Express Server</h1>");
});

app.get("/home", (req, res) => {
    res.status(200).send("<h3>This is My Home Page</h3>");
});

app.get("/about", (req, res) => {
    res.status(200).send("This is My About Page");
});

app.get("/product", (req, res) => {
    res.status(200).send("This is My Product Page");
});

// dynamic route
app.get("/product/:abc/:productId", (req, res) => {
    // every request have a params key (object)
    // const id = req.params.productId;
    const {
        abc,
        productId
    } = req.params;

    console.log(abc, productId); // { productId: '123' }
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
app.get("/query", (req,res) => {
    res.status(200)
    const data = req.query
    if (!data.name) {
        return res.send("Name is not defined")
    }
    console.log(data)
    res.send(`Hello ${data.name}, Your Age is ${data.age}`)
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

// use return on res.send() for not getting error in large code
// in express req.query ---> we direclty get the data
// app.get app.post app.put app.delete app.patch no need to give method use these



// app.kyakarnahai(url, callback(req,res) => {
//     info
// })