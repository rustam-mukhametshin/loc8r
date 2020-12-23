const mongoose = require('mongoose');

const Loc = mongoose.model('Location');

/**
 * Delete location
 *
 * @param req
 * @param req.params.locationId Location
 * @param res
 */
const locationsDeleteOne = (req, res) => {
    let locId = req.params.locationId;

    if (locId) {

        Loc
            .findByIdAndRemove(locId)
            .exec((err, loc) => {

                if (err) {
                    return res
                        .status(404)
                        .json(err);
                }

                return res
                    .status(204)
                    .json(null);
            });

    } else {

        return res
            .status(404)
            .json({
                message: 'Not found, locationId is required'
            })
    }


};

/**
 * Update location
 *
 * @param req
 * @param req.params.locationId Location
 * @param req.body
 * @param res
 */
const locationsUpdateOne = (req, res) => {
    let locId = req.params.locationId;

    if (!locId) {
        return res
            .status(404)
            .json({
                message: 'Not found, locationId is required'
            })
    }

    Loc.findById(locId)
        .select('-reviews -rating')
        .exec((err, location) => {
            if (!location) {
                return res
                    .status(404)
                    .json({
                        message: 'locationId not found'
                    })
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            }

            let body = req.body;

            location.name = body.name;
            location.address = body.address;
            location.facilities = body.facilities.split(','); // ?

            location.coords = {
                type: "Point",
                coordinates: [
                    parseFloat(body.lng),
                    parseFloat(body.lat)
                ]
            };

            location.openingTimes = [
                {
                    days: body.days1,
                    opening: body.opening1,
                    closing: body.closing1,
                    closed: body.closed1
                }
            ];

            location.save((err, loc) => {
                if (err) {
                    res
                        .status(404)
                        .json(err);
                } else {
                    res
                        .status(200)
                        .json(loc);
                }
            })
        })
};

/**
 * Show single location
 *
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
 * Create location
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
 *
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
