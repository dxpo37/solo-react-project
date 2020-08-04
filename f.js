const express = require("express");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { asyncHandler, handleValidationErrors } = require("../utils");
const { getUserToken, requireAuth } = require("../auth");
const upload = require('../services/photo-upload');
const { Op } = require('sequelize');

const singleImageUpload = upload.single('image');

const router = express.Router();
const db = require("../db/models");

const { User } = db;


//create user token on login
router.post(
  "/token",

  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: email }, { userName: email }]
      },
    });

    if (!user || !user.validatePassword(password)) {
      const err = new Error("Login failed");
      err.status = 401;
      err.title = "Login failed";
      err.errors = ["The provided credentials were invalid."];
      return next(err);
    }
    const token = getUserToken(user);
    res.json({ token, user: { id: user.id } });
  })
);



















