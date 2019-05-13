import { AuthenticationError } from "apollo-server-express";
import { Unit } from "../models/unit";

const unitResolvers = {
  Query: {
    allUnits(root, args, { user }) {
      if (!user) {
        throw new AuthenticationError("you must be logged in");
      }
      return Unit.find({});
    }
  },
  Mutation: {
    addUnit(root, args) {
      let unit = new Unit();
      unit.name = args.name;
      unit.createdAt = args.createdAt;
      unit.createdBy = args.createdBy;
      return unit.save();
    }
  }
};

export default unitResolvers;
