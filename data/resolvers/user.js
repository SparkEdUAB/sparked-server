import bcrypt from "bcrypt";
import User from "../models/user";

const userResolver = {
  Query: {
    allUsers() {
      return User.find({});
    }
  },
  Mutation: {
    async register(root, { email, password }) {
      let user = new User();
      user.email = email;
      user.password = await bcrypt.hash(password, 12);

      return user.save();
    }
  }
};

export default userResolver;
