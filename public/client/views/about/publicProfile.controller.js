/**
 * Created by Anantha on 3/24/16.
 */
(function () {
    angular
        .module("PennBook")
        .controller("AboutController", AboutController);
    function AboutController($scope, $rootScope, $location, $sessionStorage,PostService, UserService,
                             ProfileService, CommentService, NotificationService, Idle) {

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
            $scope.publishPost = publishPost;
            $scope.postContent = "";
            $scope.postImage = "";
            $scope.myPosts = [];
            $scope.myphotos = [];
            $scope.onFileSelect = onFileSelect;
            $scope.increaseLikeCount = increaseLikeCount;
            $scope.increaseShareCount = increaseShareCount;
            $scope.addComment = addComment;
            $scope.commentTemp = "";
            $scope.friends = [];
            $scope.file = "";



            if($scope.profile.friends.length > 0) {

                    angular.forEach($scope.profile.friends, function (userid, key) {
                        if (userid.length != 0) {

                            ProfileService.getProfileByUserId(userid._id).then(function (prof) {

                                UserService.findUserByUserId(userid._id).then(function (usr) {
                                    var friend = {
                                        user: usr,
                                        profile: prof
                                    }
                                    $scope.friends.push(friend);
                                });

                            });
                        }

                    });

            }

            PostService.getAllPostsByUserId($scope.profile.userid).then(function(response){

                var posts = response;

                angular.forEach(response, function(key, value) {

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
                    if($scope.myphotos.length < 6 && key.photo.length > 1){
                        $scope.myphotos.push(key.photo);
                    }
                });
                angular.forEach($scope.myPosts, function(value, key) {

                    CommentService.getAllCommentsByPostId(value.postid).then(function(comments){
                        angular.forEach(comments, function(cmnt, key){
                            value.comments.push(cmnt);
                        })
                    });
                });
            });

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
                    });

                });

                var notification = {

                    userid:post.userid,
                    // Participated friend
                    initiatorid: $scope.user._id,
                    //activity number would be standardized on activity on a post to 1-like, 2-comment, 3-shared
                    initiatorUserName: $scope.profileName,
                    activity:"Commented on your ",
                    elementKind:"Post",
                    elementLink:"#/about/" + post.user._id,
                    postid:postid

                }

                NotificationService.createNotification(notification).then(function(response){

                });

                document.getElementById('comment').value = "";

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
                        elementLink:"#/about/" + post.userid,
                        postid:postid

                    }

                    NotificationService.createNotification(notification).then(function(response){

                    });

                });



            }

            function onFileSelect(file){
                //var image =  document.getElementById('uploadPic').files;
                image = file;

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

            function publishPost(){
                /*
                 var imgPost = "data:image/jpeg;base64,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…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"
                 var post = {
                 userid:$scope.user._id,
                 titleContent:$scope.postContent,
                 comments:[],
                 likes:0,
                 shares:0,
                 //postTime:{ type : Date, default: Date.now },
                 photo:imgPost
                 }
                *
                *
                *
                * */

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

            function logout(){

                var w = $(window).width();

                delete $sessionStorage.user;
                delete $sessionStorage.profile;

                delete $rootScope.user;
                delete $rootScope.profile;
                delete $scope.user;
                delete $scope.profile;
                $sessionStorage.$reset();

                console.log('after logout');

                $location.url('#/login');


            }
            } else {
                console.log("going back to login");
                $location.url('/login');
            }

    }
})();