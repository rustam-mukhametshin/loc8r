const express = require('express');
const router = express.Router();
const ctrlLocations = require('../controllers/locations');
const ctrlOthers = require('../controllers/others');
const ctrlReviews = require('../controllers/reviews');

/* Locations pages */
router.get('/', ctrlLocations.homelistAction);

router.get('/location/:locationId', ctrlLocations.locationInfoAction);

router
    .route('/location/:locationId/review/new')
    .get(ctrlLocations.addReviewAction)
    .post(ctrlReviews.doAddReviewAction)
;

/* Others pages */
router.get('/about', ctrlOthers.about);

module.exports = router;
