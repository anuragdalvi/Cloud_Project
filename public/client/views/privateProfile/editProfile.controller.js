/**
 * Created by Anantha on 4/5/16.
 */
(function () {
    angular
        .module("PennBook")
        .controller("EditProfileController", EditProfileController);
    function EditProfileController($scope, $rootScope, $location, ProfileService, UserService, $sessionStorage, Idle) {

        if($sessionStorage.hasOwnProperty("user")){
            $scope.user = $sessionStorage.user;
            $scope.profile = $sessionStorage.profile;
            $scope.location = "";
            $scope.profilePicture = "";
            $scope.dob = new Date($scope.profile.dateOfBirth);
            console.log($scope.profile.privacy);
            $scope.profileName = "";
            $scope.base64data = "";
            $scope.newPassword = "";
            $scope.oldPassword = "";
            $scope.userAndProfileSave = userAndProfileSave;
            $scope.userPasswordSave = userPasswordSave;
            if($sessionStorage.hasOwnProperty("user") && $sessionStorage.hasOwnProperty("profile")){

                base64data = $scope.profile.profilePic;

                $scope.profilePicture = base64data;
                $scope.profileName = $scope.user.firstname + " " + $scope.user.lastname;

            } else {
                $scope.profilePicture = "images/default-profile-pic.png";
                $scope.profileName = "User Name";
            }
            $scope.onFileSelect = onFileSelect;
            $scope.logout = logout;



            function onFileSelect(file){
                //var image =  document.getElementById('uploadPic').files;
                image = file;

                //if (image.type !== 'image/png' && image.type !== 'image/jpeg') {
                //    alert('Only PNG and JPEG are accepted.');
                //    return;
                //}

                $scope.uploadInProgress = true;
                $scope.uploadProgress = 0;

                var reader = new window.FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = function() {
                    base64data = reader.result;

                    $scope.profile.profilePic = base64data;

                    ProfileService.updateProfile($scope.profile).then(function(response){
                        $sessionStorage.profile = response;
                        $scope.profilePicture = $sessionStorage.profile.profilePic;

                    });

                }

            }

            function userAndProfileSave(){
                $scope.profile.dateOfBirth = $scope.dob.toDateString();
                ProfileService.updateProfile($scope.profile).then(function(response){
                    $sessionStorage.profile = response;
                    UserService.updateUser($scope.user).then(function(response){
                        $sessionStorage.user = response;
                    });

                });

            }

            function userPasswordSave(){

                UserService.parsePassword($scope.oldPassword).then(function(response) {

                    var pwd = response;

                    if ($scope.user.password.localeCompare(pwd) == 0) {
                        $scope.user.password = $scope.newPassword;
                        UserService.updatePassword($scope.user).then(function (response) {
                            $sessionStorage.user = response;
                            $scope.user = $sessionStorage.user;
                        });
                    } else {
                        alert("Please enter correct current password!!");
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