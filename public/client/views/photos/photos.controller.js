/**
 * Created by Anantha on 3/25/16.
 */
(function () {
    angular
        .module("PennBook")
        .controller("PhotosController", PhotosController);
    function PhotosController($scope, $rootScope, $location, $sessionStorage, PostService, Idle) {

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
            $scope.logout = logout;
                $scope.myPosts = [];

                PostService.getAllPostsByUserId($scope.profile.userid).then(function (response) {

                    angular.forEach(response, function (value, key) {

                        $scope.myPosts.push({
                            photo: value.photo
                        })

                    });

                });


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

        }
})();