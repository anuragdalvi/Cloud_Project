/**
 * Created by Anantha on 4/8/16.
 */
(function () {

    angular
        .module("PennBook")
        .factory("PostService", PostService);


    function PostService($rootScope, $http, $q) {


        var service = {
            createPost: createPost,
            getAllPostsByUserId: getAllPostsByUserId,
            getAllPosts: getAllPosts,
            updatePost: updatePost,
            findPostById: findPostById
        }

        return service;

        function findPostById(postid){

            console.log("i reached get post by id services");
            var deferred = $q.defer();
            $http.get("/api/post/find/"+postid)
                .success(function (response) {
                    deferred.resolve(response);
                });

            return deferred.promise;

        }

        function updatePost(postid,post) {

            console.log("i reached update post services");
            var deferred = $q.defer();
            $http.put("/api/post/"+postid, post)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;

        }

        function createPost(post) {
            console.log("i reached create post services");
            var deferred = $q.defer();
            $http.post("/api/post", post)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function getAllPostsByUserId(userid) {
            console.log("i reached get post by userId services");
            var deferred = $q.defer();
            $http.get("/api/post/"+userid)
                .success(function (response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function getAllPosts(){
            console.log("i reached get all post services");
            var deferred = $q.defer();
            $http.get("/api/post/getAllPosts")
                .success(function (response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }
    }

})();