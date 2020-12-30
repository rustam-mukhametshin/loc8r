const request = require('request');
const {showError, apiOptions} = require('./base');
const ctrlLocations = require('../controllers/locations');

/**
 * Get 'Add review' page
 *
 * @param req
 * @param res
 */
const addReviewAction = function (req, res) {
    ctrlLocations.getLocationInfo(
        req,
        res,
        (req, res, responseData) => renderReviewForm(req, res, responseData)
    )
}

/**
 * Add review
 *
 * @param req
 * @param res
 */
const doAddReviewAction = (req, res) => {
    const locationId = req.params.locationId;

    if (locationId) {

        const path = `/api/locations/${locationId}/reviews`;

        let body = req.body;

        const postData = {
            author: body.name,
            rating: parseInt(body.rating, 10),
            reviewText: body.review
        };

        const requestOptions = {
            url: `${apiOptions.server}${path}`,
            method: 'POST',
            json: postData
        }
        if (!postData.author || !postData.rating || !postData.reviewText) {
            res.redirect(`/location/${locationId}/review/new?err=val`);
        }

        request(requestOptions, (err, {statusCode}, body) => {
            if (statusCode === 201) {
                res.redirect(`/location/${locationId}`);
            } else {
                showError(req, res, statusCode);
            }
        })
    }

}

/**
 * Render review form
 *
 * @param req
 * @param res
 * @param responseData
 */
const renderReviewForm = (req, res, {name}) => {
    res.render('location-review-form', {
        title: `Review ${name} on Loc8r`,
        pageHeader: {title: `Review ${name}`},
        error: req.query.err
    })
}

module.exports = {
    doAddReviewAction,
    addReviewAction
};