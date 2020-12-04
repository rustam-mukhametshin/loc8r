const mongoose = require('mongoose');

const Loc = mongoose.model('Location');

/**
 *
 * @param req
 * @param res
 */
const locationsDeleteOne = (req, res) => {

};

/**
 *
 * @param req
 * @param res
 */
const locationsUpdateOne = (req, res) => {

};

/**
 * Show single location.
 * @param req
 * @param res
 */
const locationsReadOne = (req, res) => {

    Loc
        .findById(req.params.locationId)
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

            return res
                .status(200)
                .json(loc)

        });
};

/**
 *
 * @param req
 * @param res
 */
const locationsCreate = (req, res) => {

};
/**
 * Show all locations
 * @param req
 * @param res
 */
const locationsListByDistance = (req, res) => {

    Loc.find().exec((err, loc) => {
        return res
            .status(200)
            .json(loc);
    });
};

module.exports = {
    locationsDeleteOne,
    locationsUpdateOne,
    locationsReadOne,
    locationsCreate,
    locationsListByDistance,
};
