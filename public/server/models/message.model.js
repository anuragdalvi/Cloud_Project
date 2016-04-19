/**
 * Created by Anantha on 4/8/16.
 */
var q = require("q");

module.exports = function(app,mongoose,db,MessageSchema){


    var MessageModel = mongoose.model("MessageModel",MessageSchema);
    var api;

    api = {
        create: create,
        getAllMessagesByUserId: getAllMessagesByUserId,
        updateMessageForReply: updateMessageForReply,
        getAllMessages: getAllMessages
    };

    return api;

    function getAllMessages(){
        console.log('i reached get all messages model');

        var deferred = q.defer();
        MessageModel.find()
            .sort({'time': 'desc'})
            .exec(function(err , results){
                deferred.resolve(results);
        });
        return deferred.promise;

    }

    function create(message){
        console.log("in create message model");
        var deferred = q.defer();
        var newMessage = message;
        MessageModel.create(newMessage, function(err, message){
            deferred.resolve(message);
        });

        return deferred.promise;
    }

    function getAllMessagesByUserId(userid) {

        console.log("in get messages by user id model");
        var deferred = q.defer();

        MessageModel.find({userid:userid})
            .sort({'time': 'desc'})
            .exec(function(err, results) {
                deferred.resolve(results);
            });

        return deferred.promise;
    }

    function updateMessageForReply(msgId, message){
        console.log("in update message for reply model");

        var deferred = q.defer();

        MessageModel.findByIdAndUpdate(msgId, {$set:{userid:message.userid,
                username:message.username,
                senderid:message.senderid,
                content:message.content,
                time:message.time}}, function(err, results) {



                MessageModel.findById(msgId, function(err , res) {

                    for(var i=0; i<message.replies.length; i++){

                        res.replies.push(message.replies[i]);
                    }



                    res.save(function(err, msg){
                        MessageModel.findById(msgId, function(err , result) {
                            deferred.resolve(result);
                        });
                    });

                });



            });
        return deferred.promise;
    }



};