import { Schema, model } from "mongoose";

import { handleUpdateValidator, handlerSaveError } from "./hooks.js";
import { emailRegexp } from "../constants/regexp.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      match: [emailRegexp, "Please set a valid email address"],
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    avatarURL: {
      type: String,
      default:
        "https://res.cloudinary.com/dqo3b0vnm/image/upload/v1693246270/project-seven/avatar/user_test_avatar_xda0nz.png",
      required: true,
    },
    token: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handlerSaveError);

userSchema.pre("findOneAndUpdate", handleUpdateValidator);
userSchema.post("findOneAndUpdate", handlerSaveError);

const User = model("user", userSchema);
export default User;
