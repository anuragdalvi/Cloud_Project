/**
 * Created by Anantha on 4/8/16.
 */
var q = require("q");

module.exports = function(app,mongoose,db,CommentSchema){

    var CommentModel = mongoose.model("CommentModel",CommentSchema);
    var api;

    api = {
        create: create,
        getAllCommentByPostId: getAllCommentByPostId,
        getAllComments: getAllComments
    };

    return api;

    function create(comment){
        console.log("in create comment by user id model");
        var deferred = q.defer();
        var newComment = comment;
        CommentModel.create(newComment, function(err, comment){
            deferred.resolve(comment);
        });

        return deferred.promise;
    }

    function getAllCommentByPostId(postid) {

        console.log("in get post by user id model");
        var deferred = q.defer();

        CommentModel.find({postid:postid})
            .sort({'time': 'desc'})
            .exec(function(err, results) {
                deferred.resolve(results);
                console.log(results);
            });

        return deferred.promise;
    }

    function getAllComments(){
        console.log("in get all posts by user id model");

        var deferred = q.defer();

        CommentModel.find()
            .sort({'time': 'desc'})
            .exec(function(err, results) {
                deferred.resolve(results);
            });
        return deferred.promise;
    }

};