/**
 * Get 'about' page
 * @param req
 * @param res
 */
const about = function (req, res) {
    res.render('index', {title: 'About'});
}

module.exports = {
    about
};
