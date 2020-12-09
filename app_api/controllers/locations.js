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
    const body = req.body;

    Loc.create({
        name: body.name,
        address: body.address,
        facilities: req.body.facilities.split(","),
        coords: {
            type: "Point",
            coordinates: [
                parseFloat(body.lng),
                parseFloat(body.lat)
            ]
        },
        // Todo Change to dynamic
        openingTimes: [
            {
                days: body.days1,
                opening: body.opening1,
                closing: body.closing1,
                closed: body.closed1
            },
            {
                days: body.days2,
                opening: body.opening2,
                closing: body.closing2,
                closed: body.closed2
            }
        ]
    }, (err, location) => {
        if (err) {
            res
                .status(400)
                .json(err)
        } else {
            res
                .status(201)
                .json(location);
        }
    });
};
/**
 * Show all locations
 * @param req
 * @param res
 */
const locationsListByDistance = async (req, res) => {
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);

    const near = {
        type: 'Point',
        coordinates: [lng, lat]
    };

    const geoOptions = {
        distanceField: 'distance.calculated',
        spherical: true,
        maxDistance: 20000,
        limit: 10
    };

    if (!lng || !lat) {
        return res
            .status(404)
            .json({
                message: 'lng and lat query parameters are required'
            });
    }

    try {
        const results = await Loc.aggregate([
            {
                $geoNear: {
                    near,
                    ...geoOptions
                }
            }
        ]);

        const locations = results.map(result => {
            return {
                id: result._id,
                name: result.name,
                address: result.address,
                rating: result.rating,
                facilities: result.facilities,
                distance: `${result.distance.calculated.toFixed()}m`
            }
        });

        return res
            .status(200)
            .json(locations);

    } catch (err) {
        res
            .status(404)
            .json(err);
    }
};

module.exports = {
    locationsDeleteOne,
    locationsUpdateOne,
    locationsReadOne,
    locationsCreate,
    locationsListByDistance,
};
