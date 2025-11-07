// create server
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const foodPartnerRoutes = require('./routes/food-partner.routes');
const cors = require('cors');

const app = express();
// In your backend server file (e.g., server.js or app.js)

app.use(cors({
    origin: [
        "http://localhost:5173",  // The common name
        "http://127.0.0.1:5173"   // The specific IP the browser used
    ],
    credentials: true // Keep this since your frontend is sending credentials
}));
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/food-partner', foodPartnerRoutes);

module.exports = app;