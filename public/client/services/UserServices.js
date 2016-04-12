/**
 * Created by Anantha on 3/25/16.
 */
(function () {

    angular
        .module("PennBook")
        .factory("UserService", UserService);


    function UserService($rootScope,$http,$q) {

        var users = [];


        //var i;
        //$rootScope.user = { userid:"", username: "", password: "" , email : "", firstname : "" , lastname :"" };
        var service =
        {
            findUserByUsername: findUserByUsername ,
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            //findUserByUserId: findUserByUserId,
            createUser: createUser,
            removeUserById: removeUserById,
            updateUser: updateUser,
            getAllUsers : getAllUsers,
            //addFollower:addFollower
            //updateUserDetails:updateUserDetails

        };

        return service;

        function getAllUsers(){

            var deferred = $q.defer();
            $http.get("/api/users/admin")
                .success(function(response){

                    deferred.resolve(response);
                });
            return deferred.promise;


        }
        function findUserByUsername(username)
        {
            var deferred = $q.defer();
            $http.get("/api/user?username="+username)
                .success(function(response){

                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        //function findUserByUserId(userid)
        //{
        //    var deferred = $q.defer();
        //    $http.get("/api/user/"+userid)
        //        .success(function(response){
        //
        //            deferred.resolve(response);
        //        });
        //    return deferred.promise;
        //}

        function findUserByUsernameAndPassword(username , password )
        {
            var deferred = $q.defer();
            $http.get("/api/user?username="+username+"&password="+password)
                .success(function(response){

                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function createUser(user)
        {
            console.log("I reached client user creation services");
            var deferred = $q.defer();
            $http.post("/api/user",user)
                .success(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function removeUserById (userid)
        {

            var deferred = $q.defer();
            $http.delete("/api/user/"+userid)
                .success(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;

        }

        function updateUser(user)
        {

            var deferred = $q.defer();
            $http.put("/api/user/"+user.id ,user)
                .success(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;

        }

        //function addFollower(userid,follower)
        //{
        //    var deferred = $q.defer();
        //    $http.put("/api/user/"+userid+"/follower",follower)
        //        .success(function(response){
        //
        //            deferred.resolve(response);
        //        });
        //    return deferred.promise;
        //
        //
        //}

        //function updateUserDetails(userid,title,aboutme)
        //{
        //    var deferred = $q.defer();
        //    $http.put("/api/user/"+userid ,user)
        //        .success(function(response){
        //            deferred.resolve(response);
        //        });
        //    return deferred.promise;
        //
        //}

    }

})();