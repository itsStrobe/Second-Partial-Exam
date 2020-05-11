const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const { Sports } = require('./models/sport-model');

const app = express();

function isValid(field){
    if(!field || field == null){
        return false;
    }

    return true;
}

/* Your code goes here */
app.post('/sports/addSport/:sportId', jsonParser, (req, res) => {
    console.log("Adding New Sport");

    let sportId = req.params.sportId;

    // Get and Validate Body
    let name = req.body.name;
    let num_players = req.body.num_players;
    let id = req.body.id;

    if(!isValid(name) || !isValid(num_players) || !isValid(id)){
        res.statusMessage = "Be sure to send all fields.";
        return res.status(406).end();
    }

    if(sportId != id){
        res.statusMessage = `Id in Request URL (sportId=${sportId}) does not match that in body (id=${id}).`;
        return res.status(409).end();
    }

    // Create Object
    let newSport = {
        name : name,
        num_players : num_players,
        id : id
    };

    // Add to DB
    Sports
        .addSport(newSport)
        .then(resp => {
            return res.status(201).json(resp).end();
        })
        .catch(err => {
            // Id is taken.
            res.statusMessage = `Something went wrong when creating the sport. Message=${err}.`;
            return res.status(400).end();
        })

});


app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});