const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./dbconfig')
const sirene = require('./model');
const Token = require('./tokenModel');
const jwt = require('jsonwebtoken');

mongoose.Promise =global.Promise;



handleToken = (token) => {
    const newtoken = jwt.sign({ foo: 'bar' }, 'shhhhh');
    return newtoken
}

console.log('token');

mongoose.connect(db.url,{userNewUrlParser : true}).then(()=> {
    console.log('MongoDB Connected')
}).catch(err => {
    console.log('MongoFailed ',err)
})
// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/fetch', (req, res) => {
    Token.findOne({token:req.query.key})
        .then(result => {
            if (result){
                sirene.findOne({'fields.siren':req.query.id})
                    .then(result => {
                        console.log('Sucess',result);
                        res.send(result);
                    })
                    .catch(err => console.log('error duude', err) )
            } else {
                res.send('invalid token Please get a token ')
            }
        })
    console.log('auth',auth)





})
app.post('/token', (req, res) => {
   const token = new Token({token:handleToken()});
    token.save()
        .then(result => {
            res.send(`You token is ${result.token} successfully generated, Please do not Regenerate again` )
        })
        .catch(err => console.log(err,'somthing is wrong'))

})
// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
app.timeout = 0;
