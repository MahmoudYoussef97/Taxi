const Joi = require("joi");
const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255
    },
    password: {
      type: String,
      required: true,
      minlength: 9,
      maxlength: 255
    },
    email: {
      type: String,
      required: true,
      minlength: 15,
      maxlength: 255
    },
    wallet: {
      type: Number,
      required: true,
      min: 0,
      get: v => Math.round(),
      set: v => Math.round()
    },
    address: { country: String, city: String, street: String },
    dateOfBirth: Date,
    phone: {
      type: String,
      required: true,
      min: 12,
      max: 15
    },
    creditCard: {
      type: {
        type: String,
        enum: ["Visa", "Master Card"],
        required: true
      },
      cardHolder: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 255
      },
      cvv: {
        type: Number,
        required: true,
        min: 3,
        max: 3
      },
      creditCardNumber: {
        type: String,
        required: true,
        min: 16,
        max: 16
      },
      expirationDate: {
        type: Date,
        required: true
      }
    },
    image: String
  })
);

function validateUser(user) {
  const schema = {
    username: Joi.String()
      .min(5)
      .max(255)
      .required(),
    password: Joi.String()
      .min(10)
      .max(255)
      .required(),
    email: Joi.String().email(),
    wallet: Joi.Number().min(0),
    address: Joi.String(),
    dateOfBirth: Joi.Date(),
    phone: Joi.String()
      .min(12)
      .max(15)
      .required(),
    creditCard: Joi.object({
      type: Joi.String().required(),
      cardHolder: Joi.String()
        .min(10)
        .max(255)
        .required(),
      cvv: Joi.Number()
        .min(3)
        .max(3)
        .required(),
      creditCardNumber: Joi.String()
        .min(16)
        .max(16)
        .required(),
      expirationDate: Joi.Date().required()
    }),
    image: Joi.String()
  };
  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
