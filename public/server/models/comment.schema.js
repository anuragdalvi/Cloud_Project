/**
 * Created by Anantha on 4/8/16.
 */
module.exports = function (mongoose,db) {

    var CommentSchema = new mongoose.Schema({
        userid:String,
        postid:String,
        time:{ type : Date, default: Date.now },
        content:String,
        photo:String,
        userName: String

    },{collection:"comments"});

    return CommentSchema;
};