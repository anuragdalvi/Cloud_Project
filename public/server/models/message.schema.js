/**
 * Created by Anantha on 4/8/16.
 */
module.exports = function (mongoose,db) {

    var MessageSchema = new mongoose.Schema({
        userid:String,
        senderid:String,
        text:String,
        replies:[{
            userid:String,
            text:String,
            time:{ type : Date, default: Date.now }
        }],
        time:{ type : Date, default: Date.now },

    },{collection:"messages"});

    return MessageSchema;
};