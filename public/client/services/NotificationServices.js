/**
 * Created by Anantha on 4/8/16.
 */
(function () {

    angular
        .module("PennBook")
        .factory("NotificationService", NotificationService);


    function NotificationService($rootScope, $http, $q) {

        var service = {
            createNotification: createNotification,
            getAllNotificationsByUserId: getAllNotificationsByUserId
        }

        return service;

        function createNotification(notification) {
            console.log("i reached create notification services");
            var deferred = $q.defer();
            $http.post("/api/notification", notification)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function getAllNotificationsByUserId(userid) {

            console.log("i reached get notification services");
            var deferred = $q.defer();
            $http.get("/api/notification/"+userid)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;

        }

    }
})();