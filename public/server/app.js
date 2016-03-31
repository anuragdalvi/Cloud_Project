/**
 * Created by Anantha on 3/25/16.
 */
module.exports = function (app,mongoose,db) {

    //console.log('i reached app');

    var schema = require("./models/user.schema.js")(mongoose,db);
    var model = require("./models/user.model.js")(app,mongoose,db,schema);
    require("./services/user.services.js")(app,model);

    //var TripSchema = require("./models/trip.schema.js")(mongoose,db);
    //var model = require("./models/trip.model.js")(app,mongoose,db,TripSchema);
    //require("./services/trip.services.js")(app,model);
    ////require("./services/field.services.js")(app,model);
    //
    //var CommentSchema = require("./models/comment.schema.js")(mongoose,db);
    //var model = require("./models/comment.model.js")(app,mongoose,db,CommentSchema);
    //require("./services/comment.services.js")(app,model);

};