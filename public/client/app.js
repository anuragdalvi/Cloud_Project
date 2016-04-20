/**
 * Created by Anantha on 3/24/16.
 */
(function(){

    var app = angular
        .module("PennBook", ["ngRoute",'ngSanitize', 'ngFileUpload', 'ngIdle', 'ngStorage', 'ngSocket'])
        .config(['KeepaliveProvider', 'IdleProvider', function(KeepaliveProvider, IdleProvider) {
            IdleProvider.idle(600); // 10 minutes idle
            IdleProvider.timeout(30); // after 30 seconds idle, time the user out
            KeepaliveProvider.interval(300); // 5 minute keep-alive ping
        }])
        .run(function(Idle, $rootScope, $sessionStorage, $window) {
            Idle.watch();
            console.log( "Session logged in");
            $rootScope.$on('IdleTimeout', function () {
                if($rootScope.hasOwnProperty("user")){
                    //$socket.close();
                    console.log("deleted root scope");
                    delete $sessionStorage.user;
                    delete $rootScope.user;
                    delete $rootScope.profile;
                    delete $sessionStorage.profile;

                    //$location.url('/login');
                   // $window.location.reload();
                    $window.location.replace('#/');
                    $window.location.reload();
                }
            });


        });

})();