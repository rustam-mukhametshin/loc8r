const mongoose = require('mongoose');
const readLine = require('readline');

// Emit the SIGINT event for windows
if (process.platform === 'win32') {
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on('SIGINT', () => {
        process.emit("SIGINT");
    })
}

// Define DB and open Mongoose connection
let dbURI = 'mongodb://localhost/Loc8r';
if (process.env.NODE_ENV === 'production') {
   dbURI = process.env.MONGODB_URI;
}
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true});

// Listeners for Mongoose connection
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
})

mongoose.connection.on('error', err => {
    console.log('Mongoose connected error: ', err);
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
})

// Reusable function to close the Mongoose connection
const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close(() => {
        console.log(`Mongoose disconnected through ${msg}`);
        callback();
    })
}

// For nodemon restarts
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
})

// For app termination
process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
})

// For Heroku app termination
process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {
        process.exit(0);
    });
})

require('./locations');
require('./users');
