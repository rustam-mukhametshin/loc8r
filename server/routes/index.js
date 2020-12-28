const express = require('express');
const router = express.Router();
const ctrlLocations = require('../controllers/locations');
const ctrlOthers = require('../controllers/others');

/* Locations pages */
router.get('/', ctrlLocations.homelist);

router.get('/location/:locationId', ctrlLocations.locationInfo);

router
    .route('/location/:locationId/review/new')
    .get(ctrlLocations.addReview)
    .post(ctrlLocations.doAddReview)
;

/* Others pages */
router.get('/about', ctrlOthers.about);

module.exports = router;
