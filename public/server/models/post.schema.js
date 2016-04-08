/**
 * Created by Anantha on 4/8/16.
 */
module.exports = function (mongoose,db) {

    var PostSchema = new mongoose.Schema({
        userid:String,
        comments:[{commentid:String}],
        likes:[{userid:String}],
        shares:Number,
        postTime:{ type : Date, default: Date.now },
        photo:{ data: Buffer, contentType: String }

    },{collection:"posts"});

    return PostSchema;
};