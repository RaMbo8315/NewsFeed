var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PodcastSchema = new Schema({
    img: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    runTime: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    listen: {
        type: String,
        required: true
    },
    readMore: {
        type: String,
        required: true
    },

}, {
    timestamps: true
});

var Podcast = mongoose.model("Podcast", PodcastSchema);

module.exports = Podcast;