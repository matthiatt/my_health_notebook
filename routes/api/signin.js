const User = require("../../models/User");
const UserSession = require("../../models/UserSession");

module.exports = (app) => {
// app.get('/api/counters', (req, res, next) => {
//     Counter.find()
//       .exec()
//       .then((counter) => res.json(counter))
//       .catch((err) => next(err));
//   });

//   app.post('/api/counters', function (req, res, next) {
//     const counter = new Counter();

//     counter.save()
//       .then(() => res.json(counter))
//       .catch((err) => next(err));
//   });


app.post("api/account/signup", (req, res, next) => {
    const {body} = req;
    const {firstName, lastName, password} = body;
    let {
        email,
    } = body;

    if(!firstName) {
        return res.end({
            success: false,
            message: "Error: first name can not be blank."
        });
    }
    if(!lastName) {
        return res.end({
            success: false,
            message: "Error: last name can not be blank."
        });
    }
    if(!email) {
        return res.end({
            success: false,
            message: "Error: email name can not be blank."
        });
    }
    if(!password) {
        return res.end({
            success: false,
            message: "Error: password name can not be blank."
        });
}
    console.log("here");

    email = email.toLowerCase();
    //Steps:
    // 1. Verify email doesn't exist
    // 2. Save it.
    User.find({
        email: email
    }, (err, previousUsers) => {
        if(err) {
            return res.end({
                success: false,
                message: "Error: Server Error."
            });
        } else if(previousUsers.length > 0) {
            return res.end({
                success: false,
                message: "Error: Account already exists."
            });
        }
        //Save the new user
        const newUser = new User();

        newUser.email = email;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.password = newUser.generateHash(password);
        newUser.save((err, user) => {
            if(err) {
                return res.end({
                    success: false,
                    message: "Error: Server Error."
                });
            }
                return res.end({
                    success: false,
                    message: "Signed Up."
            });
        });
    });
});
app.post("api/account/signin", (req, res, next) => {
    const {body} = req;
    const {password} = body;
    let {
        email,
    } = body;

    if(!email) {
        return res.end({
            success: false,
            message: "Error: email name can not be blank."
        });
    }
    if(!password) {
        return res.end({
            success: false,
            message: "Error: password name can not be blank."
        });
    }

    email = email.toLowerCase();

    User.find({
        email: email
    }, (err, users) => {
        if(err) {
            control.log("err 2:", err);
            return res.send({
                success: false,
                message: "Error: server error"
            });
        }
        if(users.length !=1) {
            return res.send({
                success: false,
                message: "Error: Invalid"
            });
        }
        const user = users[0];
        if(!user.validPassword(password)) {
            return res.send({
                success: false,
                message: "Error: Invalid"
            });
        }
        const UserSeassion = new UserSession();
        control.log(err);
        UserSession.userId = user._id;
        UserSession.save((err, doc) => {
            if(err) {
                return res.send({
                    success: false,
                    message: "Error: server error"
                });
            }

            return res.send({
                success: true,
                message: "Valid sign in",
                token: doc._id // Using this for the mongoDB compass. - this points back to a user id
            });
        });
    });
});

    app.post("/api/account/verify", (req, res, next) => {
        // Get the token from the MongoDb Atlas.
        const {query} = req;
        const {token} = query;
        // Verify the token is unique
        // To know if the toke is deleted or not.
        
        UserSession.find({
            _id: token,
            isDeleted: false
        }, (err, sessions) => {
            if(err) {
                control.log(err);
                return res.send({
                    success: false,
                    message: "Error: server error"
                });
            }
            if(sessions.length !=1) {
                return res.send({
                    success: false,
                    message: "Error: Invalid"
                });
            } else {
                return res.send({
                    sucess: true,
                    message: "Good Job"
                });
            }
        });
    });
app.get("/api/account/logout", (req, res, next) => {
    const {query} = req;
    const {token} = query;
        // Verify the token is unique
        // To know if the toke is deleted or not.
        
    UserSession.findOneAndUpdate({
        _id: token,
        isDeleted: false
    }, {
        set: {isDeleted: true}
    }, null, (err, sessions) => {
        if(err) {
            control.log(err);
            return res.send({
                success: false,
                message: "Error: server error"
            });
            }

            return res.send({
                success: false,
                message: "Good Job"
            });
        });
    });
}