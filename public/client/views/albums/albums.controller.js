/**
 * Created by Anantha on 3/25/16.
 */
(function () {
    angular
        .module("PennBook")
        .controller("AlbumsController", AlbumsController);
    function AlbumsController($scope, $rootScope, $location) {

        $scope.user = $rootScope.user;
        console.log($rootScope.user);




    }
})();