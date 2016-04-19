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

            angular.forEach($scope.profile.friendRequests, function(value, key){

                var request = {

                    user: "",
                    profile: ""

                }

                UserService.findUserByUserId(value._id).then(function(response){
                    request.user = response;
                    ProfileService.getProfileByUserId(value._id).then(function(response){

                        request.profile = response[0];
                        $scope.requests.push(request);

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
                        if($scope.profile.friendRequests[i]._id == request.user._id){
                            $scope.profile.friendRequests.splice(i, 1);
                        }
                    }

                    $scope.profile.friends.push(request.user._id);


                } else if(val == 0) {

                    for(var i=0; i<$scope.profile.friendRequests.length; i++){
                        if($scope.profile.friendRequests[i]._id == request.user._id){
                            $scope.profile.friendRequests.splice(i, 1);
                        }
                    }
                }

                ProfileService.updateProfile($scope.profile).then(function(response){
                    $sessionStorage.profile = response;
                    ProfileService.updateProfile(request.profile).then(function(response){

                        for(var i=0; i<$scope.requests.length; i++){
                            if($scope.requests[i].user._id == request.user._id){
                                $scope.requests.splice(i, 1);
                                break;
                            }
                        }

                    });
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