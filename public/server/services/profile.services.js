/**
 * Created by Anantha on 4/8/16.
 */

module.exports = function (app,model) {

    app.post('/api/profile',CreateNewProfile);
    app.get('/api/profile/:id', getProfileByUserId);
    app.put('/api/profile/update',updateProfile);

    function CreateNewProfile (req, res) {

        console.log('i reached profile creation api service');
        var profile = req.body;
        model
            .create(profile)
            .then(function(newProfile){
                res.json(newProfile);
            });
    }

    function getProfileByUserId(req, res) {

        console.log('i reached get profile api service');
        var userId = req.body;
        model
            .getProfileByUserId(userId)
            .then(function(profile){
               res.json(profile);
            });

    }

    function updateProfile(req, res) {

        console.log('i reached profile update api service');

        var profile = req.body;

        model
            .updateProfile(profile)
            .then(function(profile){
                res.json(profile);
            });
    }

};