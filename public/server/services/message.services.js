/**
 * Created by Anantha on 4/8/16.
 */
module.exports = function (app,model) {

    app.post('/api/message',CreateNewMessage);
    app.get('/api/message/:id', getMessagesByUserId);
    app.get('/api/message', getAllMessages);
    app.put('/api/message/update/:id',updateMessageForReply);

    function getAllMessages(req , res){


        model
            .getAllMessages()
            .then(function(result){
                res.json(result);
            });
    }

    function CreateNewMessage (req, res) {

        console.log('i reached profile creation api service');
        var message = req.body;
        model
            .create(message)
            .then(function(message){
                res.json(message);
            });
    }

    function getMessagesByUserId(req, res) {

        console.log('i reached get profile api service');

        var userId = req.params.id;
        model
            .getAllMessagesByUserId(userId)
            .then(function(message){
                res.json(message);
            });

    }

    function updateMessageForReply(req, res) {

        console.log('i reached profile update api service');

        var msgid = req.params.id;
        var msg = req.body;

        model
            .updateMessageForReply(msgid, msg)
            .then(function(message){
                res.json(message);
            });
    }

};