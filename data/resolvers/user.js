import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pick from "lodash/pick";
import User from "../models/user";

const userResolver = {
  Query: {
    allUsers() {
      return User.find({});
    },
    getUser(root, args, { user }) {
      console.log(user);
      return User.findOne({ email: user.email });
    }
  },
  Mutation: {
    async register(root, { email, password }) {
      let user = new User();
      user.email = email;
      user.password = await bcrypt.hash(password, 12);

      return user.save();
    },
    async login(root, { email, password }, { SECRET }) {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("No user found ");
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error("Incorrect password ");
      }
      //   sign in the user
      const token = await jwt.sign(
        {
          user: pick(user, ["_id", "email"])
        },
        SECRET,
        { expiresIn: "1h" }
      );
      return token;
    }
  }
};

export default userResolver;
