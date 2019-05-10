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
      course.createdAt = args.createdAt;
      course.createdBy = args.createdBy;
      return unit.save();
    }
  }
};

export default unitResolvers;
