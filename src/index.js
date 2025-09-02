const express = require('express');
const app = express();
const PORT = 3000;

app.listen(PORT, (err) => {
    if (err) {
        console.log("Error while starting the server");
    }
    else {
        console.log(`Server is running on http://localhost:${PORT}`);
    }
});