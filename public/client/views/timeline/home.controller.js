/**
 * Created by Anantha on 3/24/16.
 */
(function () {
    angular
        .module("PennBook")
        .controller("TimelineController", TimelineController);
    function TimelineController($scope, $rootScope, $location) {

        $scope.user = $rootScope.user;
        $scope.location = "";
        console.log($rootScope.user + "\n in timeline controller");

        $scope.logout = logout;

        function logout(){

            var w = $(window).width();
            //console.log(w);
            //$scope.location = "/login";
            console.log("logged value" + $rootScope.user.logged);
            $scope.user.logged = false;
            console.log("logged value" + $rootScope.user.logged);
            delete $rootScope.user;
            console.log($rootScope.user);
            $location.url('#/login');

            console.log('after logout');


        }
// #3b5998 blue
// #ff766c pink


    }
})();