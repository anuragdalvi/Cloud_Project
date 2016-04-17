/**
 * Created by Anantha on 4/8/16.
 */

module.exports = function (app,model) {

    app.post('/api/comment', CreateNewComment);
    app.get('/api/comment/:id', getAllCommentByPostId);
    app.get('/api/comment/getallcomments', getAllComments);

    function CreateNewComment(req, res) {

        console.log('i reached create comment api service');

        var comment = req.body;
        model
            .create(comment)
            .then(function(comment){
                res.json(comment);
            });
    }

    function getAllCommentByPostId(req, res) {
        console.log('i reached get posts by userid api service');

        var postid = req.params.id;

        model
            .getAllCommentByPostId(postid)
            .then(function (posts) {
                    res.json(posts);
                }
            );
    }

    function getAllComments(req, res){

        console.log('i reached get all posts api service');

        model
            .getAllComments()
            .then(function (comments) {
                res.json(comments);
            });
    }

};