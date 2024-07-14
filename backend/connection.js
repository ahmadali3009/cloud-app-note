const mongoose = require('mongoose');

async function connect(url) {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,  // Ensure compatibility with MongoDB URI
            useUnifiedTopology: true,  // New topology engine
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        // Exit process on connection failure
        process.exit(1);
    }
}

module.exports = connect;
