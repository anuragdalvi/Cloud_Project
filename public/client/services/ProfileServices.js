/**
 * Created by Anantha on 3/25/16.
 */
(function () {

    angular
        .module("PennBook")
        .factory("ProfileService", ProfileService);


    function ProfileService($rootScope, $http, $q) {

        var profiles = [];

        var service =
        {

            createProfile: createProfile,
            getProfileByUserId: getProfileByUserId,
            updateProfile: updateProfile,

        };

        return service;

        function createProfile(profile)
        {
            console.log("reached client profile creation services");
            var deferred = $q.defer();
            $http.post("/api/profile",profile)
                .success(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function getProfileByUserId(userId)
        {
            console.log("reached client get profile services");
            var deferred = $q.defer();
            $http.get("/api/profile/:id",userId)
                .success(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateProfile(profile)
        {
            console.log("reached client profile update services");
            var deferred = $q.defer();
            $http.put("/api/profile/update",profile)
                .success(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

    }
})();

