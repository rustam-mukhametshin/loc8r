const mongoose = require('mongoose');

const Loc = mongoose.model('Location');

/**
 *
 * @param req
 * @param res
 */
const reviewsDeleteOne = (req, res) => {

};

/**
 *
 * @param req
 * @param res
 */
const reviewsUpdateOne = (req, res) => {

};

/**
 * Show one review.
 * @param req
 * @param res
 */
const reviewsReadOne = (req, res) => {
    Loc
        .findById(req.params.locationId)
        .select('name reviews')
        .exec((err, loc) => {

            if (!loc) {
                return res
                    .status(404)
                    .json({
                        message: 'Location not found'
                    })

            } else if (err) {
                return res
                    .status(404)
                    .json(err)
            }

            if (loc.reviews && loc.reviews.length > 0) {
                const review = loc.reviews.id(req.params.reviewId);

                if (!review) {
                    return res
                        .status(400)
                        .json({message: 'Review not found'})
                } else {
                    let response = {
                        location: {
                            name: loc.name,
                            id: req.params.locationId
                        },
                        review
                    };
                    return res
                        .status(200)
                        .json(response)
                }
            } else {
                res
                    .status(404)
                    .json({
                        message: 'No reviews found'
                    });
            }

        });
};

/**
 * Set new average rating
 *
 * @param location
 */
function doSetAverageRating(location) {
    if (location.reviews && location.reviews.length > 0) {

        const count = location.reviews.length;
        const total = location.reviews.reduce((acc, rating) => {
            return acc + rating;
        }, 0);

        location.rating = parseInt(total / count, 10);

        location.save(err => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Average rating updated to ${location.rating}`);
            }
        });
    }
}

/**
 * Update average rating
 *
 * @param locationId
 */
function updateAverageRating(locationId) {
    Loc
        .findById(locationId)
        .select('rating reviews')
        .exec((err, location) => {
            if (!err) {
                doSetAverageRating(location);
            }
        })
}

/**
 * Add review to location
 *
 * @param req
 * @param res
 * @param location
 */
function doAddReview(req, res, location) {

    if (!location) {
        res
            .status(404)
            .json({message: 'Location not found'});
    } else {
        const {author, rating, reviewText} = req.body;

        // Add new review object to reviews array of objects.
        location.reviews.push({
            author,
            rating,
            reviewText
        });

        // Update reviews and average ratings
        location.save((err, loc) => {
            if (err) {
                res
                    .status(400)
                    .json(err);
            } else {

                // Update location rating
                updateAverageRating(loc._id);

                const thisReview = location.reviews.slice(-1).pop();

                res
                    .status(201)
                    .json(thisReview);
            }
        });
    }
}

/**
 * Create new review
 *
 * @param req
 * @param res
 */
const reviewsCreate = (req, res) => {
    const locationId = req.params.locationId;
    if (locationId) {
        Loc
            .findById(locationId)
            .select('reviews')
            .exec((err, location) => {
                if (err) {
                    res.status(400)
                        .json(err);
                } else {
                    doAddReview(req, res, location);
                }
            })
    } else {
        res
            .status(400)
            .json({message: 'Location not found'});
    }
};


module.exports = {
    reviewsDeleteOne,
    reviewsUpdateOne,
    reviewsReadOne,
    reviewsCreate
}
