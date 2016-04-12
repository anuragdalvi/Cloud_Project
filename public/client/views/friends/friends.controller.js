/**
 * Created by Anantha on 3/24/16.
 */
(function () {
    angular
        .module("PennBook")
        .controller("FriendsController", FriendsController);
    function FriendsController($scope, $rootScope, $location) {

        $scope.user = $rootScope.user;
        console.log($rootScope.user);

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


    }
})();