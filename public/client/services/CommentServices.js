/**
 * Created by Anantha on 4/8/16.
 */
(function () {

    angular
        .module("PennBook")
        .factory("CommentService", CommentService);


    function CommentService($rootScope, $http, $q) {

        var service = {
            createComment: createComment,
            getAllCommentsByPostId: getAllCommentsByPostId,
            getAllComments: getAllComments
        }

        return service;

        function createComment(comment) {
            console.log("i reached create comment services");
            var deferred = $q.defer();
            $http.post("/api/comment", comment)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function getAllCommentsByPostId(postid) {
            console.log("i reached get all comments by postid services");
            var deferred = $q.defer();
            $http.get("/api/comment/"+postid)
                .success(function (response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function getAllComments(){
            console.log("i reached get all comments services");
            var deferred = $q.defer();
            $http.get("/api/comment/getAllComments")
                .success(function (response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }


    }
})();