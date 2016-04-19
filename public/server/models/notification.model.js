/**
 * Created by Anantha on 4/8/16.
 */
var q = require("q");

module.exports = function(app,mongoose,db,NotificationSchema){


    var NotificationModel = mongoose.model("NotificationModel",NotificationSchema);
    var api;

    api = {
        create: create,
        getAllNotificationsByUserId: getAllNotificationsByUserId
    };

    return api;

    function create(notification){
        console.log("in create notification model");
        var deferred = q.defer();

        NotificationModel.create(notification, function(err, notification){
            deferred.resolve(notification);
        });

        return deferred.promise;
    }

    function getAllNotificationsByUserId(userid) {

        console.log("in get notification by user id model");
        var deferred = q.defer();

        NotificationModel.find({userid:userid})
            .sort({'time': 'desc'})
            .exec(function(err, results) {
                deferred.resolve(results);
                console.log(results);
            });

        return deferred.promise;
    }

};