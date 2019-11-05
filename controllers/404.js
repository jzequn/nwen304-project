/**
 * Controller: 404 not found
 * Author: Zequn Jiang
 */
exports.get404 = (req, res, next) => { res.status(404).render('404'); };
