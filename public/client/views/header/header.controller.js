/**
 * Created by Anantha on 3/24/16.
 */
/**
 * Created by Anantha on 3/24/16.
 */
(function () {
    angular
        .module("PennBook")
        .controller("HeaderController", LoginController);
    function LoginController($scope , $rootScope, $location, UserService){

        console.log("In Login Controller");

        $rootScope.user;
        $scope.user = {username:"",password:""};
        $scope.login = login;

        function login (username, password) {

            if (username == null || password == null) {
                alert("Please Enter Proper Details");
            }
            else {
                UserService.findUserByUsernameAndPassword(username, password).then(function (response) {
                    var user = response;
                    console.log(response);
                    if (user.length == 0) {
                        alert("username password not Matching");
                    }
                    else {
                        $rootScope.user = user[0];
                        $rootScope.user.logged = true;
                        $rootScope.user.globalusername = $scope.user.username;
                        var rootscopeuser = $rootScope.user;
                        $rootScope.$broadcast('auth', rootscopeuser);
                        $scope.user.username = "";
                        $scope.user.password = "";
                        $location.url('/timeline/' + $rootScope.user._id);
                    }

                });

            }
        }

    }
})();