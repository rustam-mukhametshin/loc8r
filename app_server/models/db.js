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
const dbURI = 'mongodb://localhost/Loc8r';
mongoose.connect(dbURI, {useNewUrlParser: true});
