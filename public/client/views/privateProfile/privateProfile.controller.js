/**
 * Created by Anantha on 3/24/16.
 */
(function () {
    angular
        .module("PennBook")
        .controller("ProfileController", ProfileController);
    function ProfileController($scope, $rootScope, $location, $sessionStorage, Idle, ProfileService, UserService) {

        if($sessionStorage.hasOwnProperty("user")){
            $scope.user = $sessionStorage.user;
            $scope.profile = $sessionStorage.profile;
            $scope.bday = $scope.profile.dateOfBirth.slice(0,10);
            $scope.location = "";
            $scope.profilePicture = "";
            $scope.requests = [];
            $scope.friendRequestResponse = friendRequestResponse;

            angular.forEach($scope.profile.requests, function(value, key){

                var username = "";

                UserService.findUserByUserId(value.userid).then(function(response){
                    username = response.username;
                });

                ProfileService.getProfileByUserId(value.userid).then(function(response){

                    requests.push({
                        picture: response.profilePic,
                        username: username,
                        userid: response.userid
                    });

                });

            });

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

            function friendRequestResponse(request, val){

                if(val == 1){
                    for(var i=0; i<$scope.profile.friendRequests.length; i++){
                        if($scope.profile.friendRequests[i] == request.userid){
                            $scope.profile.friendRequests.splice(i, 1);
                            break;
                        }
                    }

                    $scope.profile.friends.push({
                        userid: request.userid
                    });


                } else if(val == 0) {
                    for(var i=0; i<$scope.profile.friendRequests.length; i++){
                        if($scope.profile.friendRequests[i] == request.userid){
                            $scope.profile.friendRequests.splice(i, 1);
                            break;
                        }
                    }

                }

                ProfileService.updateProfile($scope.profile).then(function(response){
                    $sessionStorage.profile = response;
                    for(var i=0; i<requests.length; i++){
                        if(requests[i].userid == request.userid){
                            requests.splice(i, 1);
                            break;
                        }
                    }
                });

                console.log("friend added successfully");
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