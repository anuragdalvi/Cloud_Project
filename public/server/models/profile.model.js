/**
 * Created by Anantha on 4/8/16.
 */
var q = require("q");

module.exports = function(app,mongoose,db,ProfileSchema){

    var ProfileModel = mongoose.model("ProfileModel" , ProfileSchema);
    var api;
    api = {
        create: create,
        getProfileByUserId: getProfileByUserId,
        updateProfile: updateProfile,
    };

    return api;

    function create(profile){
        var deferred = q.defer();
        var newProfile = profile;

        console.log('i reached profile creation model');

        ProfileModel.create(newProfile,function(err , profile){
            deferred.resolve(profile);
            console.log('resp');
            //console.log(profile);
        });
        return deferred.promise;
    }

    function  getProfileByUserId(userId){

        var deferred = q.defer();
        var userid = userId;

        console.log('i reached getprofilebyuserid model');

        ProfileModel.find({userid:userId}, function(err , profile){

            console.log('resp');
            //console.log(profile);

            deferred.resolve(profile);

        });

        return deferred.promise;

    }

    function updateProfile(profile){

        var deferred = q.defer();
        var updateProfile = profile;

        console.log('i reached update profile model');

        ProfileModel.findByIdAndUpdate(updateProfile._id, {$set:{userid:updateProfile.userid,profilePic:updateProfile.profilePic,
            friends:updateProfile.friends, posts:updateProfile.posts, messages:updateProfile.messages,
            notifications:updateProfile.notifications, phone:updateProfile.phone, country:updateProfile.country,
            occupation:updateProfile.occupation, friendRequests:updateProfile.friendRequests,
            dateOfBirth:updateProfile.dateOfBirth}},function(err , profile){

            ProfileModel.findById(updateProfile._id, function(err , profile) {

                console.log('resp');
               // console.log(profile);
                deferred.resolve(profile);

            });

        });

        return deferred.promise;

    }

};