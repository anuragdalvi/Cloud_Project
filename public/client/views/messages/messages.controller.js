/**
 * Created by Anantha on 3/25/16.
 */
(function () {
    angular
        .module("PennBook")
        .controller("MessagesController", MessagesController);
    function MessagesController($scope, $rootScope, $location, $sessionStorage, MessageService,
                                ProfileService, NotificationService, Idle) {

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
            $scope.myMessages = [];
            $scope.myTempMessages = [];
            $scope.loadMessage = loadMessage;
            $scope.updateMessage = updateMessage;
            $scope.messageContent = "";

            MessageService.getAllMessages().then(function(response){

                //$scope.user._id
                $scope.myMessages = [];

                angular.forEach(response, function (value, key) {
                    if(value.userid == $scope.user._id || value.senderid == $scope.user._id){
                        var message = {
                            photo: "",
                            msg: value
                        };

                        ProfileService.getProfileByUserId(message.msg.senderid).then(function (profile) {
                            message.photo = profile[0].profilePic;
                            angular.forEach(message.msg.replies, function (reply, key) {
                                ProfileService.getProfileByUserId(reply.userid).then(function (prof) {
                                    reply["photo"] = prof[0].profilePic;
                                })
                            });
                            $scope.myMessages.push(message);
                        })
                    }
                    else {

                        angular.forEach(value.replies, function(reply, key){
                            if(reply.userid == $scope.user._id){

                                var message = {
                                    photo: "",
                                    msg: value
                                };

                                ProfileService.getProfileByUserId(message.msg.senderid).then(function (profile) {
                                    message.photo = profile[0].profilePic;
                                    angular.forEach(message.msg.replies, function (reply, key) {
                                        ProfileService.getProfileByUserId(reply.userid).then(function (prof) {
                                            reply["photo"] = prof[0].profilePic;
                                        })
                                    });
                                    $scope.myMessages.push(message);
                                });
                            }
                        });
                    }
                });

            });


            function updateMessage(){

                var msg = $scope.myTempMessages[0];

                var reply = {
                    userid:$scope.user._id,
                    username:$scope.profileName,
                    content:document.getElementById('replyContent').value,
                    time:new Date()
                };
                msg.time = new Date();
                msg["replies"] = [];
                msg.replies.push(reply);

                MessageService.updateMessageForReply(msg._id, msg).then(function(response){

                    var notUid = msg.userid;
                    var notinitId = msg.senderid;

                    if(msg.userid ==  $scope.user._id){
                        notUid = msg.senderid;
                        notinitId = msg.userid;
                    }
                    var notification = {


                        userid:notUid,
                        // Participated friend
                        initiatorid: notinitId,
                        //activity number would be standardized on activity on a post to 1-like, 2-comment, 3-shared
                        initiatorUserName: $scope.profileName,
                        activity:"Sent you a ",
                        elementKind:"Message",
                        elementLink:"#/messages",
                        postid:""

                    }

                    NotificationService.createNotification(notification).then(function(response){
                        reply["photo"] = $scope.profile.profilePic;
                        $scope.myTempMessages.push(reply);
                        document.getElementById('replyContent').value = "";
                    });
                });

            }

            function loadMessage(message){

                $scope.myTempMessages = [];
                var mesg = message.msg;
                var msg = {
                    _id:mesg._id,
                    photo:message.photo,
                    time:mesg.time,
                    username:mesg.username,
                    content:mesg.content,
                    userid:mesg.userid,
                    senderid:mesg.senderid
                }

                $scope.myTempMessages.push(msg);

                angular.forEach(mesg.replies, function(reply, key){

                    var msg = {
                        photo:reply.photo,
                        time:reply.time,
                        username:reply.username,
                        content:reply.content,
                        userid:reply.userid
                    }

                    $scope.myTempMessages.push(msg);


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