/**
 * Created by Anantha on 4/8/16.
 */
(function () {

    angular
        .module("PennBook")
        .factory("MessageService", MessageService);


    function MessageService($rootScope, $http, $q) {

        var service = {
            createMessage: createMessage,
            getAllMessagesByUserId: getAllMessagesByUserId,
            getAllMessages: getAllMessages,
            updateMessageForReply: updateMessageForReply
        }

        return service;

        function createMessage(message) {
            console.log("i reached create message services");
            var deferred = $q.defer();
            $http.post("/api/message", message)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function getAllMessages() {

            console.log("i reached get all message services");
            var deferred = $q.defer();
            $http.get("/api/message")
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;

        }

        function getAllMessagesByUserId(userid) {

            console.log("i reached get message services");
            var deferred = $q.defer();
            $http.get("/api/message/"+userid)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;

        }

        function updateMessageForReply(msgid, msg){

            console.log("i reached update message services");
            var deferred = $q.defer();
            $http.put("/api/message/update/"+msgid, msg)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;

        }

    }
})();