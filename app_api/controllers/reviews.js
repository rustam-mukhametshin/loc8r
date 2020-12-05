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
 *
 * @param req
 * @param res
 */
const reviewsCreate = (req, res) => {

};


module.exports = {
    reviewsDeleteOne,
    reviewsUpdateOne,
    reviewsReadOne,
    reviewsCreate
}
