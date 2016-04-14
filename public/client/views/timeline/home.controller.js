/**
 * Created by Anantha on 3/24/16.
 */
(function () {
    angular
        .module("PennBook")
        .controller("TimelineController", TimelineController);
    function TimelineController($scope, $rootScope, $location, $sessionStorage, Idle) {

        if($sessionStorage.hasOwnProperty("user")){
        $scope.user = $sessionStorage.user;
        $scope.profile = $sessionStorage.profile;
        $scope.location = "";
        $scope.profilePicture = "";
        $scope.profileName = "";
        $scope.base64data = "";
        if($sessionStorage.hasOwnProperty("user") && $sessionStorage.hasOwnProperty("profile")){

            base64data = $scope.profile.profilePic;

            $scope.profilePicture = base64data;
            $scope.profileName = $scope.user.firstname + " " + $scope.user.lastname;

        } else {
            $scope.profilePicture = "images/default-profile-pic.png";
            $scope.profileName = "User Name";
        }
        console.log("in timeline controller");

        $scope.logout = logout;




        function logout(){

            var w = $(window).width();

            delete $sessionStorage.user;
            delete $sessionStorage.profile;

            delete $rootScope.user;
            delete $rootScope.profile;
            delete $scope.user;
            delete $scope.profile;

            console.log('after logout');

            $location.url('#/login');


        }
        } else {
            console.log("going back to login");
            $location.url('/login');
        }
// #3b5998 blue
// #ff766c pink


    }
})();