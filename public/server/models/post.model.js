/**
 * Created by Anantha on 4/8/16.
 */
var q = require("q");

module.exports = function(app,mongoose,db,PostSchema){

    var PostModel = mongoose.model("PostModel",PostSchema);
    var api;

    api = {
        create: create,
        getAllPostsByUserId: getAllPostsByUserId,
        getAllPosts: getAllPosts,
        updatePost: updatePost,
        findPostById: findPostById
    };

    return api;

    function create(post){
        console.log("in create post by user id model");
        var deferred = q.defer();
        var newPost = post;
        PostModel.create(newPost, function(err, post){
            deferred.resolve(post);
        });

        return deferred.promise;
    }

    function getAllPostsByUserId(userid) {

        console.log("in get post by user id model");
        var deferred = q.defer();

        PostModel.find({userid:userid})
            .sort({'postTime': 'desc'})
            .exec(function(err, results) {
                deferred.resolve(results);
            });

        return deferred.promise;
    }

    function findPostById(postid){

        console.log('i reached find post By id model');
        var deferred = q.defer();
        UserModel.findById(postid,function(err , post){
            deferred.resolve(post);
        });
        return deferred.promise;

    }

    function getAllPosts(){
        console.log("in get all posts by user id model");

        var deferred = q.defer();

        PostModel.find()
            .sort({'postTime': 'desc'})
            .exec(function(err, results) {
                deferred.resolve(results);
            });
        return deferred.promise;
    }

    function updatePost(postid, post){

        console.log("in update posts model");

        var deferred = q.defer();
        PostModel.findByIdAndUpdate(postid, {$set:{likes:post.likes,
            shares:post.shares,
            comments:post.comments}},function(err , post){
            PostModel.findById(postid,function(err , post){
                deferred.resolve(post);
            });
        });

        return deferred.promise;

    }

};