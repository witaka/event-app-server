const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Registration = require('./registration');
const dotenv = require('dotenv');
const { check, validationResult } = require('express-validator');
const cors = require("cors");

dotenv.config();

const app = express();
const router = express.Router();

const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: false }));           
app.use(bodyParser.json()) 
app.use(cors());

router.route('/registrants')
  .get((req, res) => {
    Registration.find((error, registrations) => {
      if (error) {
        res.status(500);
      }
      if (registrations && registrations.length === 0) {
        res.statusCode = 404;
      }
      res.json(registrations);
    });
  }).post(
    check('firstName').notEmpty().isLength({ min: 2 }),
    check('lastName').notEmpty().isLength({ min: 2 }),
    check('email').notEmpty().isEmail(),
    check('phoneNumber').notEmpty().isLength({ min: 10 }),
    check('age').notEmpty().isInt({ min: 18 }),
    check('country').notEmpty().isLength({ min: 2 }),
    (req, res) => {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        res.status(400).json({ errors: validationErrors.array() });
      }
      let registration = new Registration();

      registration.first_name = req.body.firstName;
      registration.last_name = req.body.lastName;
      registration.phone_number = req.body.phoneNumber;
      registration.age = req.body.age;
      registration.country = req.body.country;
      registration.email = req.body.email;

      registration.save((error) => {
        if (error) {
          res.statusCode = 500;
        }
        res.statusCode = 201;
        res.send({'id': registration.id});
      });
});

router.route('/registrants/:id')
  .get((req, res) => {
    const id = req.params.id;
    Registration.findById(id, (error, registration) => {
     if (error) {
        res.statusCode = 500;
     }
     res.json(registration);
  });
});

app.use('/api', router);

module.exports = app;