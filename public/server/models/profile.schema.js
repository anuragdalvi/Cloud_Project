/**
 * Created by Anantha on 4/8/16.
 */
module.exports = function (mongoose,db) {

    var ProfileSchema = new mongoose.Schema({
        userid:String,
        //profilePic:{ name: String, img: Buffer, contentType: String },
        profilePic:String,
        friends:[{userid:String}],
        posts:[{postid:String}],
        messages:[{messageid:String}],
        notifications:[{notificationid:String}],
        phone:Number,
        country:String,
        occupation:String,
        friendRequests:[{userid:String}],
        role: { type: String, default: 'user' },
        privacy: {type: String, default: 'public'},
        dateOfBirth:{ type : Date, default: Date.now }

    },{collection:"profiles"});

    return ProfileSchema;
};