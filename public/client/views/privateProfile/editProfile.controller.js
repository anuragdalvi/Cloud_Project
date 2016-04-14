/**
 * Created by Anantha on 4/5/16.
 */
(function () {
    angular
        .module("PennBook")
        .controller("EditProfileController", EditProfileController);
    function EditProfileController($scope, $rootScope, $location, ProfileService, $sessionStorage, Idle) {

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

        function onFileSelect(file){
            //var image =  document.getElementById('uploadPic').files;
            image = file;

            if (image.type !== 'image/png' && image.type !== 'image/jpeg') {
                alert('Only PNG and JPEG are accepted.');
                return;
            }

            $scope.uploadInProgress = true;
            $scope.uploadProgress = 0;

            var reader = new window.FileReader();
            reader.readAsDataURL(image);
            reader.onloadend = function() {
                base64data = reader.result;

                $scope.profile.profilePic = base64data;

                ProfileService.updateProfile($scope.profile).then(function(response){
                    $rootScope.profile = response;
                    $scope.profilePicture = $rootScope.profile.profilePic;

                });

            }

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