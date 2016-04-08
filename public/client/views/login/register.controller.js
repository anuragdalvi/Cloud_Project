/**
 * Created by Anantha on 3/25/16.
 */
(function () {
    angular
        .module("PennBook")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, $rootScope,UserService,$q,ProfileService)
    {

        $scope.register = register;
        $rootScope.user ;//= {username:"",password:"",email:"",userid:"",logged:false,globalusername:""};
        $scope.user = {email:"",password:"", firstname:"", lastname:"", username:""};
        $scope.validateUsername = validateUsername;
        $scope.duplicateusername = [];
        $scope.usernamevalid = false;

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
    }
})();