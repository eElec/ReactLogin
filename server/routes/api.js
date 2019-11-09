const router = require('express').Router();
const withAuth = require('./withAuth');

router.get('/home', function(req, res) {
    res.send('Welcome!');
});
router.get('/secret', withAuth, function(req, res) {
    console.log(req.user);
    if(req.user){
        res.send('The password is potato');
    }
    else{
        res.send('try again');
    }
});

module.exports = router;