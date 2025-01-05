const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Initialize dotenv to load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Dummy in-memory storage for local testing
// You can replace this with database queries as needed
const users = {};

// Routes
// Fetch user information by unique code
app.get('/api/users/:uniqueCode', (req, res) => {
    const uniqueCode = req.params.uniqueCode;
    const user = users[uniqueCode];

    if (user) {
        res.json({ success: true, user });
    } else {
        res.status(404).json({ success: false, message: 'User not found.' });
    }
});

// Add a new user
app.post('/api/users', (req, res) => {
    const { name, age, gender, height, phoneNumber, bloodType } = req.body;
    const uniqueCode = generateUniqueCode();

    users[uniqueCode] = { name, age, gender, height, phoneNumber, bloodType };
    res.json({ success: true, uniqueCode });
});

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Generate a unique code (5 digits with `#`)
function generateUniqueCode() {
    let code = '';
    const characters = '0123456789#';
    for (let i = 0; i < 5; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});





// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');

// const dotenv = require('dotenv');

// dotenv.config();

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('Connected to MongoDB Atlas'))
// .catch((err) => console.error('MongoDB connection error:', err));



// // Initialize the Express app
// const app = express();
// const PORT = 3000;

// // Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(express.static('public')); // Serve static files

// // MongoDB Connection
// mongoose.connect('mongodb://127.0.0.1:27017/userInfoDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch((err) => {
//   console.error('MongoDB connection error:', err);
// });

// const userRoutes = require('./routes/userRoutes');
// app.use('/api/users', userRoutes);


// // Default Route
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/views/index.html');
// });

// // Start the Server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
