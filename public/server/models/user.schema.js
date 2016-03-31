/**
 * Created by Anantha on 3/30/16.
 * db schema for user
 */
module.exports = function (mongoose,db) {

    var UserSchema = new mongoose.Schema({
        username:String,
        firstname:String,
        lastname:String,
        email:String,
        password:String
        //usertitle:String,

    },{collection:"users"});

    return UserSchema;
};