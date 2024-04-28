require('dotenv').config(); // remove this later
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 8080;
const insertIntoDB = require('./seed');

const userAuthRoutes = require('./routes/userAuthRoutes');
const apiRoutes = require('./routes/apiRoutes');

app.use(cors({
    origin: true, // Allow requests from this origin
    credentials: true // Allow cookies to be sent with the requests
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));

app.use(userAuthRoutes);
app.use(apiRoutes);

mongoose.connect(process.env.MONGODB_URI)
.then((data, error) => {
    if (!error) {
        // insertIntoDB();
        console.log("Connected to DB");
        app.listen(PORT, "0.0.0.0", (error) => {
            if (!error) console.log("Server started at http://0.0.0.0:" + PORT);
            else console.log(error.message);
        }); 
    } else console.log(error);
});