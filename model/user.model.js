import mongoose from "mongoose";
const dbuser = mongoose.Schema({
  username: {
    type: String,
  },

  password: {
    type: String,
  },

  confirmpassword: {
    type: String,
  },
});

const User = mongoose.model("User", dbuser);

export default User;
