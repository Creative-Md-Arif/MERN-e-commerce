// Import Mongoose
import mongoose from "mongoose";

// Create the user schema
const usersSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
); // Add timestamps to the schema

// Create the user model
const User = mongoose.model("User", usersSchema);

// Export the user model
export default User;
