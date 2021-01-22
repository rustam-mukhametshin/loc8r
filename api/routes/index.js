const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['HS256']
})
const ctrlLocations = require('../controllers/locations');
const ctrlReviews = require('../controllers/reviews');
const ctrlAuth = require('../controllers/authentication');

// Locations
router
    .route('/locations')
    .get(ctrlLocations.locationsListByDistance)
    .post(auth, ctrlLocations.locationsCreate);

router
    .route('/locations/:locationId')
    .get(ctrlLocations.locationsReadOne)
    .put(auth, ctrlLocations.locationsUpdateOne)
    .delete(auth, ctrlLocations.locationsDeleteOne);

// Reviews
router
    .route('/locations/:locationId/reviews')
    .post(auth, ctrlReviews.reviewsCreate)

router
    .route('/locations/:locationId/reviews/:reviewId')
    .get(ctrlReviews.reviewsReadOne)
    .put(auth, ctrlReviews.reviewsUpdateOne)
    .delete(auth, ctrlReviews.reviewsDeleteOne);

// Authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
