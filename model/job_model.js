import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    problem: {
      type: String,
      require: true,
    },
    number: {
      type: Number,
      require: true,
    },
    brand: {
      type: String,
      require: true,
    },
    modelnumber: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

const JobModel = mongoose.model("Job", JobSchema);

export default JobModel;
