const User = require("../../models/user");
const userSession = require("../../models/userSession");
module.exports = (app) => {
  app.post("/api/account/signup", (req, res, next) => {
    const { body } = req;
    const { firstName, lastName, email, password } = body;
    // let { email } = body;

    if (!firstName) {
      return res.send({
        success: false,
        message: "First name field can not be left blank.",
      });
    }
    if (!lastName) {
      return res.send({
        success: false,
        message: "Last name field can not be left blank.",
      });
    }
    if (!email) {
      return res.send({
        success: false,
        message: "email field must be valid and can not be left blank.",
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: "Password must be strong and can not be left blank.",
      });
    }

    email = email.toLowerCase();

    User.find(
      {
        email: email,
      },
      (err, previousUsers) => {
        if (err) {
          return res.send("warning warning warning");
        } else if (previousUsers.length > 0) {
          return res.send("Error - This account already exists.");
        }

        const newUser = new User();

        newUser.email = email;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.password = newUser.generateHash(passwored);
        newUser.save((err, user) => {
          if (err) {
            return res.send({
              success: false,
              message: "Server error",
            });
          }
          return res.send({
            success: true,
            message: "You are now signed up.",
          });
        });
      }
    );
  });

  app.post("/api/account/signin", (req, res, next) => {
    const { body } = req;
    const { password } = body;
    let { email } = body;

    if (!email) {
      return res.send({
        success: false,
        message: "Email can not be left blank.",
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: "Password can not be left blank.",
      });
    }

    email = email.toLowerCase();

    User.find(
      {
        email: email,
      },
      (err, users) => {
        if (err) {
          return res.send({
            success: false,
            message: "Server error",
          });
        }
        if (users.length != 1) {
          return res.send({
            success: false,
            message: "Invalid response.",
          });
        }
        const user = users[0];
        if (!user.validPassword(password)) {
          return res.send({
            success: false,
            messsage: "Invalid Response.",
          });
        }
        const userSession = new UserSession();
        userSession.userId = user._id;
        userSession.save((err, doc) => {
          if (err) {
            console.log(err);
            return res.send({
              success: false,
              message: "Server error.",
            });
          }
          return res.send({
            success: true,
            message: "Valid sign in.",
            token: doc._id,
          });
        });
      }
    );
  });

  app.post("/api/account/verify", (req, res, next) => {
    // Get the token
    // verify that token is unique and can be deleted
    const { query } = req;
    const { token } = query;

    UserSession.find(
      {
        _id: token,
        isDeleted: false,
      },
      (err, sessions) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: "Error, server error",
          });
        }
        if (sessions.legnth != 1) {
          return res.send({
            success: false,
            message: "Error: Invalid",
          });
        } else {
          return res.send({
            success: true,
            message: "Good Job",
          });
        }
      }
    );
  });

  app.get("api/account/logout", (req, res, next) => {
    const { query } = req;
    const { token } = query;

    UserSession.findOneAndUpdate(
      {
        _id: token,
        isDeleted: false,
      },
      {
        $set: { isDeleted: true },
      },
      null,
      (err, sessions) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: "Error, server error",
          });
        }

        // if (sessions.legnth != 1) {
        //   return res.send({
        //     success: false,
        //     message: "Error: Invalid"
        //   });
        // } else {
        return res.send({
          success: true,
          message: "Good Job",
        });
      }
    );
  });
};
