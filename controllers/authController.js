import User from "../models/user.js";
import bcrypt from "bcryptjs";

import { ApiError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

import jwt from "jsonwebtoken";
import "dotenv/config";

import path from "path";

const { JWT_SECRET } = process.env;

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const url = path.resolve("public", "avatars", "temp-avatar-user.jpg");
  const user = await User.findOne({ email });
  if (user) {
    throw ApiError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL: url,
  });
  const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(newUser._id, { token });
  res.status(201).json({
    token,
    user: {
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
  const { name, email, avatarURL } = req.user;
  res.json({ name, email, avatarURL });
};

const updateUser = async (req, res) => {
  // const { path: oldPath, filename } = req.file;
  // const { _id, avatarURL: oldAvatarURL } = req.user;
  // const { name } = req.body;
  // await User.findByIdAndUpdate(
  //   _id,
  //   { avatarURL },
  //   { new: true }
  // );
  res.json({ message: "avatar Updated" });
};

export default {
  signUp: ctrlWrapper(signUp),
  signIn: ctrlWrapper(signIn),
  signOut: ctrlWrapper(signOut),
  getCurrent: ctrlWrapper(getCurrent),
  updateUser: ctrlWrapper(updateUser),
};