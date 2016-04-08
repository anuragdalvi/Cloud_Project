/**
 * Created by Anantha on 3/24/16.
 */
(function () {
    angular
        .module("PennBook")
        .controller("TimelineController", TimelineController);
    function TimelineController($scope, $rootScope, $location, ProfileService) {

        $scope.user = $rootScope.user;


    }
})();