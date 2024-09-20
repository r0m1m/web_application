var express = require('express');
var router = express.Router();
let home = require('../controllers/home');
let about = require('../controllers/about');
let indicators = require('../controllers/indicators');
let cityprofile = require('../controllers/cityprofile');
let mapcontroller = require('../controllers/mapcontroller');
let chartapp = require('../controllers/chartapp');
let countryprofile = require('../controllers/countryprofile');


router.get('/', seeip, home.get_home);

router.get('/about', about.get_about);

router.get('/cwis', seeip, indicators.get_cwis);
router.get('/indicators/districtmap', indicators.get_districtsmap);
router.get('/indicators/indicator/:indicator', indicators.get_data);

router.get('/chartapplication', seeip, chartapp.get_initialpage);
router.get('/city/:cityName/dOne/:dOne/dTwo/:dTwo/group/:groupBy', chartapp.get_dataset);

router.get('/cityprofile', seeip, cityprofile.get_cityprofile);
router.get('/cityprofile/data/:cityName', cityprofile.get_dataset);
router.get('/cityprofile/sankey/:cityName', cityprofile.get_sankey);
router.get('/cityprofile/wastesankey/city/:cityName', cityprofile.get_wastesankey);
router.get('/cityprofile/map/:cityName', cityprofile.get_mapdata);
router.get('/cityprofile/info/city/:cityName', cityprofile.get_info);
router.get('/cityprofile/sun/gc/city/:cityName', cityprofile.get_gc);
router.get('/cityprofile/sun/ca/city/:cityName', cityprofile.get_ca);
router.get('/cityprofile/bg/city/:cityName', cityprofile.get_bg);

router.get('/mapapplication/map/:cityName', mapcontroller.get_warddata);
router.get('/mapapplication/city/:cityName/mapdata/:maptype', mapcontroller.get_renderdata);
router.get('/mapapplication',seeip,  mapcontroller.get_map);

router.get('/countryprofile', countryprofile.get_countryprofile);

function seeip(req, res, next) {
    var ip = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress
    console.log("Ip address: "+ip);
    next();
}
module.exports = router;