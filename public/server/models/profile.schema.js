/**
 * Created by Anantha on 4/8/16.
 */
module.exports = function (mongoose,db) {

    var ProfileSchema = new mongoose.Schema({
        userid:String,
        profilePic:{ data: Buffer, contentType: String },
        friends:[{userid:String}],
        posts:[{postid:String}],
        messages:[{messageid:String}],
        notifications:[{notificationid:String}],
        phone:Number,
        country:String,
        occupation:String,
        friendRequests:[{userid:String}],
        dateOfBirth:{ type : Date, default: Date.now }

    },{collection:"profiles"});

    return ProfileSchema;
};