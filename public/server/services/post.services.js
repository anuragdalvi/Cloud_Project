/**
 * Created by Anantha on 4/8/16.
 */
module.exports = function (app,model) {
    app.post('/api/post', CreateNewPost);
    app.get('/api/post/:id', getAllPostsByUserId);
    app.get('/api/post/find/:pid', findPostById);
    app.get('/api/post/getAllPosts', getAllPosts);
    app.put('/api/post/:id',updatePost);

    function findPostById(req, res){

        console.log('i reached find post by id api service');

        var postid = req.params.pid;
        model
            .findPostById(postid)
            .then(function(post){
                res.json(post);
            });

    }

    function CreateNewPost(req, res) {

        console.log('i reached create posts api service');

        var post = req.body;
        model
            .create(post)
            .then(function(newPost){
                res.json(newPost);
            });
    }

    function updatePost(req, res) {

        console.log("i reached update post api service");
        var postid = req.params.id;
        var post = req.body;
        model
            .updatePost(postid,post)
            .then(function(post){
                res.json(post);
            });
    }

    function getAllPostsByUserId(req, res) {
        console.log('i reached get posts by userid api service');

        var userid = req.params.id;

        model
            .getAllPostsByUserId(userid)
            .then(function (posts) {
                    res.json(posts);
                }
            );
    }

    function getAllPosts(req, res){

        console.log('i reached get all posts api service');

        model
            .getAllPosts()
            .then(function (posts) {
                res.json(posts);
            });
    }

};