/**
 * Created by Anantha on 3/30/16.
 * model to contact db
 */
var q = require("q");
module.exports = function(app,mongoose,db,UserSchema){


    var UserModel = mongoose.model("UserModel" , UserSchema);
    var sha1 = require('sha1');
    var api;
    api = {
        create: create,
        getAllUsers: getAllUsers,
        findById: findById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        update: update,
        removeUserById: removeUserById,
        findUserByUserId:findUserByUserId,
        parsePassword: parsePassword,
        updatePassword: updatePassword

    };

    return api;

    function parsePassword(password){
        var deferred = q.defer();

        var newPassword = sha1(password);

        deferred.resolve(newPassword);
        return deferred.promise;

    }

    function create(user){
        var deferred = q.defer();
        var newUser = user;
        newUser.password = sha1(user.password);

        console.log('i reached user creation model');

        UserModel.create(newUser,function(err , user){
            deferred.resolve(user);

        });
        return deferred.promise;
    }

    function findUserByUserId(userid){
        console.log('i reached find User By userid model');
        var deferred = q.defer();

        UserModel.findById(userid,function(err , user){
            deferred.resolve(user);

        });
        return deferred.promise;
    }

    function findById( uid){
        console.log('i reached find User By uid model');
        var deferred = q.defer();
        UserModel.find({userid:uid},function(err , result){
            deferred.resolve(0);
        });
        return deferred.promise;

    }

    function update(userid,user){
        console.log('i reached user update model');
        var deferred = q.defer();

        UserModel.findByIdAndUpdate(userid,{$set:{firstname:user.firstname,lastname:user.lastname}},function(err , user){
            UserModel.findById(userid,function(err , user){

                deferred.resolve(user);
            });
        });

        return deferred.promise;

    }

    function updatePassword(userid,user){
        console.log('i reached user update password model');
        var deferred = q.defer();
        var pwd = sha1(user.password);


        UserModel.findByIdAndUpdate(userid,{$set:{password:pwd}},function(err , user){
            UserModel.findById(userid,function(err , user){

                deferred.resolve(user);
            });
        });

        return deferred.promise;

    }

    function removeUserById(userid){
        console.log('i reached remove User By Id model');
        var deferred = q.defer();
        UserModel.remove({_id:userid},function(err , result){
            deferred.resolve(result);
        });
        return deferred.promise;
    }


    /* specific to User Object*/

    function findUserByUsername( username){
        console.log('i reached find User By Username model');

        var deferred = q.defer();
        UserModel.find({username:username},function(err , result){
            deferred.resolve(result);
        });
        return deferred.promise;

    }


    function findUserByCredentials( username , password){
        console.log('i reached search by credentials model');

        var encryptedPassword = sha1(password);
        var deferred = q.defer();
        UserModel.find({username:username, password:encryptedPassword},function(err , user){
            deferred.resolve(user);
        });
        return deferred.promise;
    }

    function getAllUsers(){
        console.log('i reached get all users model');

        var deferred = q.defer();
        UserModel.find(function(err , results){
            deferred.resolve(results);
        });
        return deferred.promise;

    }


};