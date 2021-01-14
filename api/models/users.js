const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hash: String,
    salt: String
});

/**
 * Set password
 *
 * @param password
 */
userSchema.methods.setPassword = function (password) {

    this.salt = crypto.randomBytes(16).toString('hex');

    this.hash = this.generateHash(password, this.salt);
}

/**
 * Validate password
 *
 * @param password
 */
userSchema.methods.validPassword = function (password) {

    const hash = this.generateHash(password, this.salt);

    return this.hash === hash;
}

/**
 * Generate hash
 *
 * @param password
 * @param salt
 * @returns {string}
 */
userSchema.methods.generateHash = function (password, salt) {
    return crypto
        .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
        .toString('hex');
}

mongoose.model('User', userSchema);