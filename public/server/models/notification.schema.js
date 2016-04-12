/**
 * Created by Anantha on 4/8/16.
 */
module.exports = function (mongoose,db) {

    var NotificationSchema = new mongoose.Schema({
        // Owner
        userid:String,
        // Participated friend
        initiatorid:String,
        //activity number would be standardized on activity on a post to 1-like, 2-comment, 3-shared
        activityNumber:Number,
        postid:String

    },{collection:"notifications"});

    return NotificationSchema;
};