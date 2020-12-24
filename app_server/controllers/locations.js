const request = require('request');

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
const homelist = function (req, res) {
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
const locationInfo = function (req, res) {
    renderDetailPage(req, res);
}

/**
 * Get 'Add review' page
 * @param req
 * @param res
 */
const addReview = function (req, res) {
    res.render('location-review-form', {
        title: 'Add review',
        pageHeader: {title: 'Review Starcups'}
    });
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
 */
const renderDetailPage = (req, res) => {
    res.render('location-info', {
        title: 'Starcups',
        pageHeader: {
            title: 'Loc8r'
        },
        sidebar: {
            context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
            callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
        },
        location: {
            name: 'Starcups',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 3,
            facilities: ['Hot drinks', 'Food', 'Premium wifi'],
            coords: {lat: 51.455041, lng: -0.9690884},
            openingTimes: [
                {
                    days: 'Monday - Friday',
                    opening: '7:00am',
                    closing: '7:00pm',
                    closed: false
                },
                {
                    days: 'Saturday',
                    opening: '8:00am',
                    closing: '5:00pm',
                    closed: false
                },
                {
                    days: 'Sunday',
                    closed: true
                }
            ],
            reviews: [
                {
                    author: 'Simon Holmes',
                    rating: 3,
                    reviewText: 'What a great place.',
                    timestamp: '16 March 2020'
                },
                {
                    author: 'Charlie Chaplin',
                    rating: 4,
                    reviewText: "It was okay. Coffee wasn't great.",
                    timestamp: '14 February 2020'
                }
            ]
        }
    });
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


module.exports = {
    homelist,
    locationInfo,
    addReview
};
