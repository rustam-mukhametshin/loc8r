/**
 * Get 'home' page
 * @param req
 * @param res
 */
const homelist = function (req, res) {
    res.render('locations-list', {
        title: 'Loc8r - find a palce to work with wifi',
        pageHeader: {
            title: 'Loc8r',
            strapline: 'Find places to work with wifi near you!'
        }
    });
}

/**
 * Get 'Location info' page
 * @param req
 * @param res
 */
const locationInfo = function (req, res) {
    res.render('location-info', {title: 'Location info'});
}

/**
 * Get 'Add review' page
 * @param req
 * @param res
 */
const addReview = function (req, res) {
    res.render('location-review-form', {title: 'Add review'});
}


module.exports = {
    homelist,
    locationInfo,
    addReview
};
