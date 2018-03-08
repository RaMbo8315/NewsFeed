var db = require("../models");

module.exports = {
    allNotes: function (req, res) {
        db.Note.find({})
            .then(function (data) {
                console.log(data)
                res.json(data);
            })
            .catch(function (err) {
                res.json(err);
            });
    },

    notesForPodcast: function (req, res) {
        db.Note.find({
                podcast: req.params.id
            })
            .then(function (data) {
                res.json(data);
            })
            .catch(function (err) {
                res.json(err);
            });
    },

    deleteNote: function (req, res) {
        db.Note.deleteOne({
                _id: req.params.id
            })
            .then(function (data) {
                res.json(data);
            })
            .catch(function (err) {
                res.json(err);
            });
    },

    createNoteByPod: function (req, res) {
        db.Note.create(req.body)
            .then(function (dbNote) {
            })
            .then(function (data) {
                res.json(data);
            })
            .catch(function (err) {
                res.json(err);
            });
    }
}