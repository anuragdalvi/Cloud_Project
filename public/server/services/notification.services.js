/**
 * Created by Anantha on 4/8/16.
 */
module.exports = function (app,model) {

    app.post('/api/notification',CreateNewNotification);
    app.get('/api/notification/:id', getNotificationsByUserId);

    function CreateNewNotification (req, res) {

        console.log('i reached notification creation api service');
        var message = req.body;
        model
            .create(message)
            .then(function(message){
                res.json(message);
            });
    }

    function getNotificationsByUserId(req, res) {

        console.log('i reached get notifications api service');

        var userId = req.params.id;
        model
            .getAllNotificationsByUserId(userId)
            .then(function(notification){
                res.json(notification);
            });
    }

};