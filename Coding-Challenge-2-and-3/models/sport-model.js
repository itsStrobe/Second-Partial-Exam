const mongoose = require( 'mongoose' );

/* Your code goes here */
const sportSchema = mongoose.Schema({
    id : {
        type : Number,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    num_players : {
        type : Number,
        required : true
    }
});

const sportCollection = mongoose.model('sports', sportSchema);

const Sports = {
    addSport : function(newSport){
        return sportCollection
            .create(newSport)
            .then(createdSport => {
                return createdSport;
            })
            .catch(err => {
                throw new Error(err);
            });
    }
}

module.exports = {
    Sports
};