const request = require('request');
const {showError, apiOptions} = require('./base');

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

        request(requestOptions, (err, {statusCode}, body) => {
            if (statusCode === 201) {
                res.redirect(`/location/${locationId}`);
            } else {
                showError(req, res, statusCode);
            }
        })
    }

}

module.exports = {
    doAddReviewAction
};