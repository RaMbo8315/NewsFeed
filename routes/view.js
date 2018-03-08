var fetchController = require("../controllers/fetch.js");

module.exports = function(app) {

        app.get("/", fetchController.renderHome);

    }