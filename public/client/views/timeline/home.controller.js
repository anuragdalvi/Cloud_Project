/**
 * Created by Anantha on 3/24/16.
 */
(function () {
    angular
        .module("PennBook")
        .controller("TimelineController", TimelineController);
    function TimelineController($scope, $rootScope, $location, $sessionStorage, PostService, UserService,
                                NotificationService, ProfileService, CommentService, Idle) {

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
        console.log("in timeline controller");

            $scope.logout = logout;
            $scope.file = "";
            $scope.publishPost = publishPost;
            $scope.postContent = "";
            $scope.postImage = "";
            $scope.myPosts = [];
            $scope.onFileSelect = onFileSelect;
            $scope.increaseLikeCount = increaseLikeCount;
            $scope.increaseShareCount = increaseShareCount;
            $scope.addComment = addComment;
            $scope.commentTemp = "";
            $scope.commonFriends = [];
            $scope.searchUser = searchUser;
            $scope.searchText = "";
            $scope.goToGuest = goToGuest;


            function goToGuest(commonfriend){

                $sessionStorage.guestUser = commonfriend.user;
                $sessionStorage.guestProfile = commonfriend.profile;
                $sessionStorage.isFriend = 0;
                $location.url('/guest');

            }

            function searchUser(){
                if($scope.searchText.length > 0) {
                    UserService.findUserByName($scope.searchText).then(function (response) {
                        if (response.length > 0 && response[0]._id != $scope.user._id) {
                            var usr = response[0];
                            $sessionStorage.guestUser = usr;
                            ProfileService.getProfileByUserId(usr._id).then(function (res) {
                                $sessionStorage.guestProfile = res[0];
                                for(var i=0; i<$sessionStorage.guestProfile.friends.length; i++){
                                    if($sessionStorage.guestProfile.friends[i]._id == $scope.user._id){
                                        $sessionStorage.isFriend = 1;
                                        break;
                                    }
                                }
                                $location.url('/guest');
                            });

                        }
                        else {
                            alert("invalid name");
                        }
                    });
                } else {
                    alert("invalid name");
                }

            }

            if($scope.profile.friends.length > 0) {
                angular.forEach($scope.profile.friends, function (value, key) {

                    ProfileService.getProfileByUserId(value._id).then(function (response) {
                        var prof = response[0];
                        angular.forEach(prof.friends, function (friend, key) {
                            ProfileService.getProfileByUserId(friend._id).then(function (friendProf) {
                                var friendProfile = friendProf[0];
                                if (friendProfile.userid != $scope.user._id  && friendProfile.privacy == "public") {
                                    var cond = 0;
                                    for(var i=0; i<friendProfile.friends.length; i++){
                                        if(friendProfile.friends[i]._id == $scope.user._id) {
                                            cond = 1;
                                            break;
                                        }
                                    }
                                    if(cond == 0) {
                                        var commonFriend = {
                                            username: "",
                                            user: "",
                                            profile: friendProfile
                                        }
                                        UserService.findUserByUserId(friendProfile.userid).then(function (usr) {

                                            commonFriend.username = usr.firstname + " " + usr.lastname;
                                            commonFriend.user = usr;
                                            $scope.commonFriends.push(commonFriend);

                                        });
                                    }
                                }

                            });
                        });

                    });

                });
            }

            if($scope.profile.friends.length > 1) {
                angular.forEach($scope.profile.friends, function (friend, val) {

                    PostService.getAllPostsByUserId(friend._id).then(function (response) {

                        var posts = response;

                        angular.forEach(response, function (key, value) {

                            //if(key._id == "571162b2ea13161e2ae63920"){
                            //    key.comments = [];
                            //    PostService.updatePost(key._id,key).then(function(){
                            //        console.log("erase done");
                            //    })
                            //}

                            var user = "";
                            var commentContents = [];
                            var post = response;

                            $scope.myPosts.push({
                                postid: key._id,
                                userid: key.userid,
                                titleContent: key.titleContent,
                                comments: [],
                                likes: key.likes,
                                shares: key.shares,
                                postTime: key.postTime,
                                photo: key.photo
                            });
                        });
                        angular.forEach($scope.myPosts, function (value, key) {

                            UserService.findUserByUserId(value.userid).then(function(usr){
                                value["profileName"] = usr.firstname + " " + usr.lastname;
                            });

                            ProfileService.getProfileByUserId(value.userid).then(function(prof){

                                value["profilePic"] = prof[0].profilePic;
                            });

                            CommentService.getAllCommentsByPostId(value.postid).then(function (comments) {
                                angular.forEach(comments, function (cmnt, key) {
                                    value.comments.push(cmnt);
                                })
                            });
                        });
                    });
                });
            }


            function addComment(postid, post, commentTemp){

                console.log("in add comment");
                console.log(commentTemp + "content");

                var comment = {
                    userid:$scope.user._id,
                    postid:postid,
                    content:commentTemp,
                    photo: $scope.profilePicture,
                    userName: $scope.profileName
                }

                CommentService.createComment(comment).then(function(response){

                    var newComment = response;
                    post.comments.push(newComment);

                    PostService.updatePost(postid,post).then(function(response){
                        var updatedPost = response;
                        console.log(response);
                        var notification = {

                            userid:post.userid,
                            // Participated friend
                            initiatorid: $scope.user._id,
                            //activity number would be standardized on activity on a post to 1-like, 2-comment, 3-shared
                            initiatorUserName: $scope.profileName,
                            activity:"Commented on your ",
                            elementKind:"Post",
                            elementLink:"#/about/" + post.userid,
                            postid:postid

                        }

                        NotificationService.createNotification(notification).then(function(response){

                        });

                        document.getElementById('comment').value = "";
                    });

                });



            }


            function increaseLikeCount(postid, post){

                post.likes = parseInt(post.likes) + 1;

                PostService.updatePost(postid,post).then(function(response){

                    angular.forEach($scope.myPosts, function(value, key){
                        if(value.postid == response._id){
                            value.likes = response.likes;
                            value.shares = response.shares;
                        }
                    });
                    var notification = {

                        userid:post.userid,
                        // Participated friend
                        initiatorid: $scope.user._id,
                        //activity number would be standardized on activity on a post to 1-like, 2-comment, 3-shared
                        initiatorUserName: $scope.profileName,
                        activity:"Liked your ",
                        elementKind:"Post",
                        elementLink:"#/about/" + post.userid,
                        postid:postid

                    }

                    NotificationService.createNotification(notification).then(function(response){

                    });
                });



            }

            function increaseShareCount(postid, post){
                post.shares = parseInt(post.shares) + 1;

                PostService.updatePost(postid,post).then(function(response){

                    angular.forEach($scope.myPosts, function(value, key){
                        if(value.postid == response._id){
                            value.likes = response.likes;
                            value.shares = response.shares;
                        }
                    });
                    var notification = {

                        userid:post.userid,
                        // Participated friend
                        initiatorid: $scope.user._id,
                        //activity number would be standardized on activity on a post to 1-like, 2-comment, 3-shared
                        initiatorUserName: $scope.profileName,
                        activity:"Shared your ",
                        elementKind:"Post",
                        elementLink:"#/about/" + post.user._id,
                        postid:postid

                    }

                    NotificationService.createNotification(notification).then(function(response){

                    });
                });



            }


            function publishPost(){
                var post = {
                    userid:$scope.user._id,
                    titleContent:$scope.postContent,
                    comments:[],
                    likes:0,
                    shares:0,
                    //postTime:{ type : Date, default: Date.now },
                    photo:$scope.postImage
                }
                PostService.createPost(post).then(function(response){
                    console.log(response);
                    var newPost = response;
                    newPost["postid"] = newPost._id;
                    newPost["commentContents"] = [];
                    $scope.myPosts.unshift(newPost);
                    $scope.postContent = "";
                    $scope.postImage = "";

                });

                document.getElementById('postBlock').value = "";

            }


            function onFileSelect(file){
                //var image =  document.getElementById('uploadPic').files;
                var image = file;

                //console.log(image.type);

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

                    $scope.postImage = base64data;

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

                $location.url('/login');


            }
        } else {
            console.log("going back to login");
            $location.url('/login');
        }
// #3b5998 blue
// #ff766c pink


    }
})();