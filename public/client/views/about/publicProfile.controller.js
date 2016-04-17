/**
 * Created by Anantha on 3/24/16.
 */
(function () {
    angular
        .module("PennBook")
        .controller("AboutController", AboutController);
    function AboutController($scope, $rootScope, $location, $sessionStorage,PostService, UserService,
                             ProfileService, CommentService, Idle) {

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
            $scope.onFileSelect = onFileSelect;
            $scope.increaseLikeCount = increaseLikeCount;
            $scope.increaseShareCount = increaseShareCount;
            $scope.addComment = addComment;
            $scope.commentTemp = "";
            $scope.friends = getFriends();


            function getFriends(){

                angular.forEach($scope.profile.friends, function(userid, key){
                    if(userid.length != 0){

                    ProfileService.getProfileByUserId(userid).then(function(prof){

                        UserService.findUserByUserId(userid).then(function(usr){
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
                });
                angular.forEach($scope.myPosts, function(value, key) {

                    CommentService.getAllCommentsByPostId(value.postid).then(function(comments){
                        angular.forEach(comments, function(cmnt, key){
                            value.comments.push(cmnt);
                        })
                    });
                }); console.log($scope.myPosts);
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

                document.getElementById('comment').value = "";

            }

            function increaseLikeCount(postid, post){

                post.likes = parseInt(post.likes) + 1;

                PostService.updatePost(postid,post).then(function(response){

                    for (var i=0; i<$scope.myPosts.length; i++){
                       if($scope.myPosts[i].postid == response._id){
                           $scope.myPosts[i].likes = response.likes;
                           $scope.myPosts[i].shares = response.shares;
                           $scope.myPosts[i].comments = response.comments;
                           break;
                       }
                    }
                });

            }

            function increaseShareCount(postid, post){
                post.shares = parseInt(post.shares) + 1;

                PostService.updatePost(postid,post).then(function(response){

                    for (var i=0; i<$scope.myPosts.length; i++){
                        if($scope.myPosts[i].postid == response._id){
                            $scope.myPosts[i].likes = response.likes;
                            $scope.myPosts[i].shares = response.shares;
                            $scope.myPosts[i].comments = response.comments;
                            break;
                        }
                    }
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
                    newPost["commentContents"] = [];
                    $sessionStorage.myPosts.push(newPost);
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

                console.log('after logout');

                $location.url('#/login');


            }
            } else {
                console.log("going back to login");
                $location.url('/login');
            }

    }
})();