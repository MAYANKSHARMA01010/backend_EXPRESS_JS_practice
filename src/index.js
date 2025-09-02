const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

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

app.listen(PORT, (err) => {
    if (err) {
        console.log("Error while starting the server");
    }
    else {
        console.log(`Server is running on http://localhost:${PORT}`);
    }
});