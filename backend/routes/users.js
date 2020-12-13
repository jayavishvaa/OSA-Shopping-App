const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const passport = require('passport');
const User = require('../models/user');
const verifyCode = require('../models/verifyCode');
const authenticate = require('../middleware/auth');

const cryptoRandomString = require("crypto-random-string");
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");
const config = require("config");
const { async } = require('crypto-random-string');

let transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
      user: "reggie43@ethereal.email", // generated ethereal user
      pass: "Y2TN541uqn4GYBQn4B"  // generated ethereal password
  }
});

router.use(bodyParser.json());

router.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username, email: req.body.email, phone: req.body.phone}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      if (req.body.firstname)
        user.firstname = req.body.firstname;
      if (req.body.lastname)
        user.lastname = req.body.lastname;
      if (req.body.roles && req.body.roles != "admin" && req.body.roles != "consumer") //admin can only be set by editing the database directly
        user.roles.push(req.body.roles);
      user.save(async (err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
        }

        const secretCode = cryptoRandomString({
          length: 6,
        });
        const newCode = new verifyCode({
          code: secretCode,
          email: user.email,
        });
        await newCode.save();

        const data = {
          from: `OneStopApp`,
          to: user.email,
          subject: "Your Activation Link for OneStopApp",
          text: `Please use the following link within the next 10 minutes to activate your account on OneStopApp: ${config.get('baseUrl')}/users/verification/verify-account/${user._id}/${secretCode}`,
          html: `<p>Please use the following link within the next 10 minutes to activate your account on OneStopApp: <strong><a href="${config.get('baseUrl')}/users/verification/verify-account/${user._id}/${secretCode}" target="_blank">Verify Email</a></strong></p>`,
        };
        await transporter.sendMail(data);

        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful!'});
        });
      });
    }
  });
});

router.post('/login', (req, res, next) => {

  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);

    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: false, status: 'Login Unsuccessful!', err: info});
    }
    req.logIn(user, (err) => {
      if (err) {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: false, status: 'Login Unsuccessful!', err: 'Could not log in user!'});          
      }

      var token = authenticate.getToken({_id: req.user._id});
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: true, status: 'Login Successful!', token: token});
    }); 
  }) (req, res, next);
});

router.get("/verification/resend", authenticate.verifyUser, 
  async (req, res) => {

      try {
          const user = await User.findById(req.user._id);

          if (!user) {
              res.json({ success: false });
          } else if(user.status === "verified"){
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, status: 'Email already verifiedl!'});
          } else {
              await verifyCode.deleteMany({ email: user.email });

              const secretCode = cryptoRandomString({
                length: 6,
              });
              const newCode = new verifyCode({
                code: secretCode,
                email: user.email,
              });
              await newCode.save();
      
              const data = {
                from: `OneStopApp`,
                to: user.email,
                subject: "Your Activation Link for OneStopApp",
                text: `Please use the following link within the next 10 minutes to activate your account on OneStopApp: ${config.get('baseUrl')}/users/verification/verify-account/${user._id}/${secretCode}`,
                html: `<p>Please use the following link within the next 10 minutes to activate your account on OneStopApp: <strong><a href="${config.get('baseUrl')}/users/verification/verify-account/${user._id}/${secretCode}" target="_blank">Verify Email</a></strong></p>`,
              };
              await transporter.sendMail(data);

              res.json({ success: true });
          }
      } catch (err) {
          console.log("Error on /api/auth/get-activation-email: ", err);
          res.json({ success: false });
      }
  }
);

router.get(
  "/verification/verify-account/:userId/:secretCode",
  async (req, res) => {
      try {
          const user = await User.findById(req.params.userId);
          const response = await verifyCode.findOne({
              email: user.email,
              code: req.params.secretCode,
          });

          if (!response) {
              res.sendStatus(401);
          } else {
              await User.updateOne(
                  { email: user.email },
                  { status: "verified" }
              );
              await verifyCode.deleteMany({ email: user.email });

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json({success: true, status: 'Email Verified!'});
          }
      } catch (err) {
          console.log(
              "Error on /api/auth/verification/verify-account: ",
              err
          );
          res.sendStatus(500);
      }
  }
);

router.put('/editDetails', authenticate.verifyUser, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (req.body.firstname)
      user.firstname = req.body.firstname;
    if (req.body.lastname)
      user.lastname = req.body.lastname;
    if (req.body.email)
      user.email = req.body.email;
    if (req.body.phone)
      user.phone = req.body.phone;
    if (req.body.roles && req.body.roles != "admin" && user.roles.indexOf(req.body.roles) == -1) //admin can only be set by editing the database directly
      user.roles.push(req.body.roles);
    if (req.body.password)
      await user.setPassword(req.body.password);
    await user.save()
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, status: 'Details Succesfully Updated!', user: user});
  }
  catch (err) {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: false, err: err}); 
  }
});

router.post('/password/forgot', async (req, res) =>{
  try {
    const user = await User.findOne({email: req.body.email});

    if (!user) {
        res.json({ success: false });
    } else if(user.status !== "verified"){
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: false, status: 'Email not verifiedl!'});
    } else {
        await verifyCode.deleteMany({ email: user.email });

        const secretCode = cryptoRandomString({
          length: 6,
        });
        const newCode = new verifyCode({
          code: secretCode,
          email: req.body.email,
        });
        await newCode.save();

        const data = {
          from: `OneStopApp`,
          to: user.email,
          subject: "Your Password reset code for OneStopApp",
          text: `Please use the following code to reset your password: ${secretCode}`,
        };
        await transporter.sendMail(data);

        res.json({ success: true });
    }
  } catch (err) {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: false, err: err}); 
  }
});

router.post("/password/change", async (req, res) => {
  try {
    const response = await verifyCode.findOne({
      email: req.body.email,
      code: req.body.secretCode,
    });

    if (!response) {
      res.sendStatus(401);
    } else {
      const user = await User.findOne({email: req.body.email});
      await user.setPassword(req.body.password);
      await user.save();

      await verifyCode.deleteMany({ email: user.email });

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: true, status: 'Password Changed!'});
    }
  } catch (err) {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: false, err: err}); 
  }
});

router.get('/checkJWTtoken', (req, res) => {
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
    if (err)
      return next(err);
    
    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      return res.json({status: 'JWT invalid!', success: false, err: info});
    }
    else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.json({status: 'JWT valid!', success: true, user: user});

    }
  }) (req, res);
});

module.exports = router;
