/**
 * Created by Anantha on 3/24/16.
 */
(function () {
    angular
        .module("PennBook")
        .controller("LoginController", LoginController);
    function LoginController($scope , $rootScope, $location, UserService){

        console.log("In Login Controller");

        $rootScope.user;
        //$scope.user = {username:"",password:""};
        $scope.login = login;
        $scope.toggle = toggle;
        $scope.clickV = "true";

        $scope.user = {email:"",password:"", firstname:"", lastname:"", username:""};
        $scope.validateUsername = validateUsername;
        $scope.duplicateusername = [];
        $scope.usernamevalid = false;

        // toggle between login and register
        function toggle(id) {
            console.log("to toggle");

                console.log("in 1");
                $scope.clickV = !$scope.clickV;
        }

        function validateUsername()
        {
            var deferred = $q.defer();
            var result;
            UserService.findUserByUsername($scope.user.email).then(function(response){

                deferred.resolve(response);
                result = response;
            });
            return deferred.promise;
        }

        function register()
        {
            if($scope.user.email == "" || $scope.user.password =="")
            {
                alert('Please enter all the details');
            }
            else
            {
                function ValidateEmail(inputText)
                {
                    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    if(mailformat.test(inputText)){
                        return (true);
                    }
                    else
                    {
                        alert("You have entered an invalid email address!");
                        return (false);
                    }
                }


                //function ValidatePassword (){
                //
                //    if($scope.user.verify_password == $scope.user.password)
                //    {
                //        return true;
                //    }
                //    else
                //    {
                //        alert('PASSWORDS DONT MATCH');
                //        return false;
                //    }
                //    return false;
                //}

                var emailvalid = ValidateEmail($scope.user.email);
                //var passwordvalid = ValidatePassword();
                //user.username = user.email;

                $scope.validateUsername().then(function(response){
                    $scope.duplicateusername = response;
                    console.log(response);
                    if ($scope.duplicateusername.length == 0)
                    {
                        $scope.usernamevalid = true;
                    }
                    else
                    {
                        alert('USERNAME ALREADY TAKEN');
                        $scope.usernamevalid = false;
                    }

                    if (emailvalid && $scope.usernamevalid)
                    {
                        var newUser =
                        {
                            username : $scope.user.email,
                            password : $scope.user.password,
                            email : $scope.user.email,
                            firstname:$scope.user.firstname,
                            lastname:$scope.user.lastname
                        };
                        console.log(newUser);
                        UserService.createUser(newUser).then(function (response) {

                            newUser = response;
                            $rootScope.user = newUser;
                            $rootScope.user.logged = true;
                            $rootScope.user.globalusername = newUser.username;
                            var rootscopeuser = $rootScope.user;
                            $rootScope.$broadcast('auth', rootscopeuser);
                            $scope.user = {username:"",password:"",firstname:"",lastname:""};
                            //$location.url('/timeline/'+newUser._id);
                            console.log("user created");
                            $location.url("/login");
                            //$window.location.assign('/client/index.html#/login');

                        });
                    }
                    else
                    {
                        //alert('something went wrong');
                        //do nothing
                    }
                });


                //$scope.user.password == $scope.user.verify_password;
            }
        }

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