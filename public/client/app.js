/**
 * Created by Anantha on 3/24/16.
 */
(function(){

    angular
        .module("PennBook", ["ngRoute",'ngSanitize', 'ngFileUpload', 'ngIdle', 'ngStorage'])
        .config(['KeepaliveProvider', 'IdleProvider', function(KeepaliveProvider, IdleProvider) {
            IdleProvider.idle(600); // 10 minutes idle
            IdleProvider.timeout(30); // after 30 seconds idle, time the user out
            KeepaliveProvider.interval(600); // 10 minute keep-alive ping
        }])
        .run(['Idle', function(Idle) {
            Idle.watch();
        }])
        .run(function($rootScope, $window) {
            $rootScope.$on('IdleTimeout', function () {
                if($rootScope.hasOwnProperty("user")){
                    delete $rootScope.user;
                    delete $rootScope.profile;
                    console.log("deleted root scope");
                    //$location.url('/login');
                    $window.location.reload();
                }

            });
        });

})();