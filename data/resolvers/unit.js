import { Unit } from "../models/unit";

const unitResolvers = {
  Query: {
    allUnits() {
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
