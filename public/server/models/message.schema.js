/**
 * Created by Anantha on 4/8/16.
 */
module.exports = function (mongoose,db) {

    var MessageSchema = new mongoose.Schema({
        userid:String,
        username:String,
        senderid:String,
        content:String,
        replies:[{
            userid:String,
            username:String,
            content:String,
            time:{ type : Date, default: Date.now }
        }],
        time:{ type : Date, default: Date.now },

    },{collection:"messages"});

    return MessageSchema;
};