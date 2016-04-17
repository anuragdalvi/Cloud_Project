/**
 * Created by Anantha on 4/8/16.
 */
module.exports = function (mongoose,db) {

    var PostSchema = new mongoose.Schema({
        userid:String,
        titleContent:String,
        comments:[{commentid:String}],
        likes:Number,
        shares:Number,
        postTime:{ type : Date, default: Date.now },
        photo:String

    },{collection:"posts"});

    return PostSchema;
};