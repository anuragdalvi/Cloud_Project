/**
 * Created by Anantha on 3/24/16.
 */
(function () {
    angular
        .module("PennBook")
        .controller("FriendsController", FriendsController);
    function FriendsController($scope, $rootScope, $location, $sessionStorage, ProfileService, UserService, Idle) {

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
            $scope.friends = [];
            $scope.goToGuest = goToGuest;

            function goToGuest(friend){

                $sessionStorage.isFriend = 1;
                $sessionStorage.guestProfile = friend.profile;
                $sessionStorage.guestUser = friend.user;
                $location.url('/guest');

            }

            if($scope.profile.friends.length > 0){

                angular.forEach($scope.profile.friends, function(userid, key){
                    if(userid.length != 0){

                        ProfileService.getProfileByUserId(userid._id).then(function(prof){

                            UserService.findUserByUserId(userid._id).then(function(usr){
                                var friend = {
                                    user: usr,
                                    profile: prof[0]
                                }
                                $scope.friends.push(friend);
                            });

                        });
                    }

                });


            }



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