/**
 * Get 'about' page
 * @param req
 * @param res
 */
const about = function (req, res) {
    res.render('generic-text', {title: 'About'});
}

module.exports = {
    about
};
