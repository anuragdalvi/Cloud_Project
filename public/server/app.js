/**
 * Created by Anantha on 3/25/16.
 */
module.exports = function (app,mongoose,db) {

    //console.log('i reached app');

    var UserSchema = require("./models/user.schema.js")(mongoose,db);
    var model = require("./models/user.model.js")(app,mongoose,db,UserSchema);
    require("./services/user.services.js")(app,model);

    var ProfileSchema = require("./models/profile.schema.js")(mongoose,db);
    var model = require("./models/profile.model.js")(app,mongoose,db,ProfileSchema);
    require("./services/profile.services.js")(app,model);
    ////require("./services/field.services.js")(app,model);

    var CommentSchema = require("./models/comment.schema.js")(mongoose,db);
    var model = require("./models/comment.model.js")(app,mongoose,db,CommentSchema);
    require("./services/comment.services.js")(app,model);

    var MessageSchema = require("./models/message.schema.js")(mongoose,db);
    var model = require("./models/message.model.js")(app,mongoose,db,MessageSchema);
    require("./services/message.services.js")(app,model);

    var PostSchema = require("./models/post.schema.js")(mongoose,db);
    var model = require("./models/post.model.js")(app,mongoose,db,PostSchema);
    require("./services/post.services.js")(app,model);

    var NotificationSchema = require("./models/notification.schema.js")(mongoose,db);
    var model = require("./models/notification.model.js")(app,mongoose,db,NotificationSchema);
    require("./services/notification.services.js")(app,model);
};