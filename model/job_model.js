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
    model: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    condition: {
      type: String,
      require: true,
    },
    place: {
      type: String,
      require: true,
    },
    ime: {
      type: String,
      require: true,
    },
    deliveryOption: {
      type: String,
      enum: ["direct", "courier"], // Enumerated values for delivery options
      required: true,
    },
    password: {
      type: String,
      require: true,
    },
    remark: {
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
