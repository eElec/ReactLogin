const router = require('express').Router();
const jwt = require('jsonwebtoken');
const sql = require('mysql');

const withAuth = require('./withAuth');
const secret = require('../secret');

const database = sql.createConnection({
    host: "us-cdbr-iron-east-05.cleardb.net",
    user: "b17e2c57662428",
    password: "36c8dc80",
    database: "heroku_61079fc7f391c01"
});
database.connect();


router.post('/', function(req, res) {
    const { uid, upass } = req.body;

    database.query(`SELECT * FROM creds WHERE pass="${upass}" AND id="${uid}";`, (error, result, fields) => {
        if (error) throw error;
        let userInfo = {};
        if(result.length > 0){
            database.query(`SELECT s_id, first_name, last_name  FROM Student WHERE s_id=${result[0].id};`, (err, result, fields)=>{
                if (err) throw err;
                if (result.length > 0) {
                    const payload = {...result[0]};
                    const token = jwt.sign(payload, secret, {
                        expiresIn: "1h"
                    });
                    res.cookie("token", token, { httpOnly: true }).sendStatus(200);
                }
                else{
                    res.sendStatus(400);
                }
            })
        }
        else{
            res.sendStatus(400);
        }
        
    });
});

router.get('/checkToken', withAuth, (req,res)=>{
    if(!req.user){
        res.sendStatus(400);
    }
    res.json(req.user).status(200);
})


module.exports = router;