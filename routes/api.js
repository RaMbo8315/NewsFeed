var noteController = require("../controllers/note.js");
var podcastController = require("../controllers/podcast.js");

module.exports = function (app) {

    app.get("/notes", noteController.allNotes);

    app.get("/notes/:id", noteController.notesForPodcast);

    app.delete("/notes/:id", noteController.deleteNote);

    app.post("/notes/:id", noteController.createNoteByPod);

    app.get("/podcasts", podcastController.allPodcasts);

    app.get("/newPodcast", podcastController.scrapePod);

}