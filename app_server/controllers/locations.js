/**
 * Get 'home' page
 * @param req
 * @param res
 */
const homelist = function (req, res) {
    res.render('locations-list', {
        title: 'Loc8r - find a palce to work with wifi',
        description: 'Looking for wifi and a seat? Loc8r helps you find places to work when out and about.',
        pageHeader: {
            title: 'Loc8r',
            strapline: 'Find places to work with wifi near you!'
        },
        sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
        locations: [{
            name: 'Starcups',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 3,
            facilities: ['Hot drinks', 'Food', 'Premium wifi'],
            distance: '100m'
        }, {
            name: 'Cafe Hero',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 4,
            facilities: ['Hot drinks', 'Food', 'Premium wifi'],
            distance: '200m'
        }, {
            name: 'Burger Queen',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 2,
            facilities: ['Food', 'Premium wifi'],
            distance: '250m'
        }]
    });
}

/**
 * Get 'Location info' page
 * @param req
 * @param res
 */
const locationInfo = function (req, res) {
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


module.exports = {
    homelist,
    locationInfo,
    addReview
};
