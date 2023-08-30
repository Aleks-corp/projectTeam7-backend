import User from "../models/user.js";
import bcrypt from "bcryptjs";
import fs from "fs/promises";

import { ApiError, cloudinary } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

import jwt from "jsonwebtoken";
import "dotenv/config";

const { JWT_SECRET } = process.env;

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const avatarURL =
    "https://res.cloudinary.com/deeooeyeg/image/upload/v1693065810/Media/temp-avatar-user_hbvjcp.png";
  const user = await User.findOne({ email });
  if (user) {
    throw ApiError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });
  const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(newUser._id, { token });
  res.status(201).json({
    token,
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      avatarURL: newUser.avatarURL,
    },
  });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw ApiError(401, "Email or password is wrong");
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw ApiError(401, "Email or password is wrong");
  }
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatarURL: user.avatarURL,
    },
  });
};

const signOut = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json();
};

const getCurrent = async (req, res) => {
  const { _id, name, email, avatarURL } = req.user;
  res.json({ id: _id, name, email, avatarURL });
};

const updateUser = async (req, res) => {
  if (!req.file && !req.body.name) throw ApiError(400, "Missing fields");

  const { name } = req.body;
  const { _id } = req.user;
  if (req.file) {
    const { path } = req.file;

    const result = await cloudinary.uploader.upload(path, {
      folder: "project-seven/avatar",
      width: 100,
      height: 100,
      crop: "fill",
    });
    const avatarURL = result.url;

    await User.findOneAndUpdate(
      _id,
      { avatarURL, name },
      {
        new: true,
      }
    );

    res.json({ avatarURL, name });
    await fs.unlink(path);
  } else {
    await User.findOneAndUpdate(
      _id,
      { avatarURL: req.user.avatarURL, name },
      {
        new: true,
      }
    );

    res.json({ avatarURL: req.user.avatarURL, name });
  }
};

export default {
  signUp: ctrlWrapper(signUp),
  signIn: ctrlWrapper(signIn),
  signOut: ctrlWrapper(signOut),
  getCurrent: ctrlWrapper(getCurrent),
  updateUser: ctrlWrapper(updateUser),
};
