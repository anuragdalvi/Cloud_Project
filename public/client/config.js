/**
 * Created by Anantha on 3/24/16.
 */
(function () {

    angular
        .module("PennBook")
        .config(configure);

    function configure($routeProvider) {

        $routeProvider
            .when("/login", {
                templateUrl: "views/login/login.view.html",
                controller: "LoginController"
            })
            .when("/timeline/:userid", {
                templateUrl: "views/timeline/home.view.html",
                controller: "TimelineController"
            })
            .when("/about/:userid", {
                templateUrl: "views/about/publicProfile.view.html",
                controller: "AboutController"
            })
            .when("/friends", {
                templateUrl: "views/friends/friends.view.html",
                controller: "FriendsController"
            })
            .when("/profile/:userid", {
                templateUrl: "views/privateProfile/privateProfile.view.html",
                controller: "ProfileController"
            })
            .when("/messages", {
                templateUrl: "views/messages/messages.view.html",
                controller: "MessagesController"
            })
            .when("/photos", {
                templateUrl: "views/photos/photos.view.html",
                controller: "PhotosController"
            })
            .when("/albums", {
                templateUrl: "views/albums/albums.view.html",
                controller: "AlbumsController"
            })
            .when("/register",{
                templateUrl: "views/login/register.view.html",
                controller: "RegisterController"
            })
            .when("/notifications",{
                templateUrl: "views/notifications/notifications.view.html",
                controller: "NotificationController"
            })
            .when("/edit-profile/:userid",{
                templateUrl: "views/privateProfile/editProfile.view.html",
                controller: "EditProfileController"
            })
            .otherwise({
                redirectTo: "/login"
            });

    }

})();