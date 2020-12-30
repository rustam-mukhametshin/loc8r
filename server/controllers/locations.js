const request = require('request');
const {showError} = require('./base');

// Todo: move to external
const apiOptions = {
    server: 'http://localhost:3000'
};

if (process.env.NODE_ENV === 'production') {
    apiOptions.server = 'https://someApp.herokuapp.com';
}


/**
 * Get 'home' page
 * @param req
 * @param res
 */
const homelistAction = function (req, res) {
    const path = '/api/locations';

    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
        qs: {
            lng: -0.7992599,
            lat: 51.378091,
            maxDistance: 20
        }
    }

    request(requestOptions, (err, {statusCode}, body) => {
        let data = [];

        if (statusCode === 200 && body.length) {
            data = body.map((item) => {
                item.distance = formatDistance(item.distance);
                return item;
            });
        }

        renderHomepage(req, res, data);
    })
}

/**
 * Get 'Location info' page
 * @param req
 * @param res
 */
const locationInfoAction = function (req, res) {

    getLocationInfo(
        req,
        res,
        (
            req,
            res,
            responseData
        ) => renderDetailPage(req, res, responseData)
    );
}

/**
 * Get 'Add review' page
 *
 * @param req
 * @param res
 */
const addReviewAction = function (req, res) {
    getLocationInfo(
        req,
        res,
        (req, res, responseData) => renderReviewForm(req, res, responseData)
    )
}

/**
 * Render homepage
 *
 * @param req
 * @param res
 * @param responseBody
 */
const renderHomepage = (req, res, responseBody) => {
    let message = null;

    if (!(responseBody instanceof Array)) {
        message = 'API lookup error';
        responseBody = [];
    } else {
        if (!responseBody.length) {
            message = 'No place found nearby';
        }
    }

    res.render('locations-list', {
        title: 'Loc8r - find a palce to work with wifi',
        description: 'Looking for wifi and a seat? Loc8r helps you find places to work when out and about.',
        pageHeader: {
            title: 'Loc8r',
            strapline: 'Find places to work with wifi near you!'
        },
        sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
        locations: responseBody,
        message
    })
}

/**
 * Render location detail
 *
 * @param req
 * @param res
 * @param location
 */
const renderDetailPage = (req, res, location) => {
    res.render('location-info', {
        title: location.name,
        pageHeader: {
            title: location.name
        },
        sidebar: {
            context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
            callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
        },
        location
    });
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
        pageHeader: {title: `Review ${name}`}
    })
}

/**
 * Format distance
 *
 * @param distance
 * @returns {string}
 */
const formatDistance = (distance) => {
    let thisDistance = 0;
    let unit = 'm';

    if (distance > 1000) {
        thisDistance = parseFloat(distance / 1000).toFixed(1);
        unit = 'km';
    } else {
        thisDistance = Math.floor(distance);
    }
    return thisDistance + unit;
}

/**
 * Get location info
 *
 * @param req
 * @param res
 * @param callback
 */
const getLocationInfo = (req, res, callback) => {

    const path = `/api/locations/${req.params.locationId}`;

    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {}
    }

    request(
        requestOptions,
        (err, {statusCode}, body) => {

            let data = body;

            if (statusCode === 200) {
                data.coords = {
                    lng: body.coords[0],
                    lat: body.coords[1]
                }

                callback(req, res, data);
            } else {
                showError(req, res, statusCode);
            }
        })
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
    homelistAction,
    locationInfoAction,
    addReviewAction,
    doAddReviewAction
};
